import {
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  ScaleFade,
  Switch,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import * as XLSX from 'xlsx';
import { api } from '../../services/api';

type InputFileProps = {
  onClose: () => void;
};

export const InputFile = ({ onClose }: InputFileProps) => {
  const [canSubmit, setCanSubmit] = useState(false);
  const [receiversData, setReceiversData] = useState([]);
  const { isOpen, onToggle } = useDisclosure();
  const toast = useToast();
  const router = useRouter();

  const processData = (dataString) => {
    const dataStringLines = dataString.split(/\r\n|\n/);
    const headers = dataStringLines[0].split(
      /,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/
    );

    const list = [];
    for (let i = 1; i < dataStringLines.length; i++) {
      const row = dataStringLines[i].split(
        /,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/
      );
      if (headers && row.length == headers.length) {
        const obj = {};
        for (let j = 0; j < headers.length; j++) {
          let d = row[j];
          if (d.length > 0) {
            if (d[0] == '"') d = d.substring(1, d.length - 1);
            if (d[d.length - 1] == '"') d = d.substring(d.length - 2, 1);
          }
          if (headers[j]) {
            obj[headers[j]] = d;
          }
        }

        // remove the blank rows
        if (Object.values(obj).filter((x) => x).length > 0) {
          list.push(obj);
        }
      }
    }

    setReceiversData(list);
  };

  // handle file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        /* Parse data */
        const bstr = evt.target.result;
        const wb = XLSX.read(bstr, { type: 'binary' });
        /* Get first worksheet */
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        /* Convert array of arrays */
        const data = XLSX.utils.sheet_to_csv(ws);
        processData(data);
      };
      reader.readAsBinaryString(file);
      setCanSubmit(true);
    } else setCanSubmit(false);
  };

  const onSubmit = async () => {
    const receivers = receiversData.map((receiver) => ({
      fullName: receiver['nome completo'],
      warName: receiver['nome de guerra'],
      cpf: receiver['cpf'],
      identity: receiver['identidade'],
      classYear: receiver['ano'] ? parseInt(receiver['ano']) : undefined,
      rank: receiver['posto'],
      name: receiver['nome'],
      abbreviation: receiver['sigla'],
    }));

    const result = (
      await api.post(
        `${
          receivers[0].classYear
            ? 'cadet'
            : receivers[0].rank
            ? 'staff'
            : 'work-place'
        }/many`,
        receivers
      )
    ).data;

    if (result[0].id) {
      toast({
        title: 'Sucesso',
        description: 'Destinatários inseridos com sucesso!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      router.replace(router.asPath);
      onClose();
    } else
      toast({
        title: 'Informação',
        description: 'Houve um problema, os destinatários não foram inseridos!',
        status: 'info',
        duration: 3000,
        isClosable: true,
      });
  };

  return (
    <Flex flexDir='column'>
      <Flex alignItems='center' marginY='10px'>
        <Text mr='15px'>Eu sei o que estou fazendo</Text>
        <Switch onChange={onToggle} />
      </Flex>
      <ScaleFade initialScale={0.9} in={isOpen}>
        <FormControl>
          <FormLabel>Planilha com os dados: </FormLabel>
          <Input
            type='file'
            accept='.csv, .xlsx, .xls'
            onChange={handleFileUpload}
            isDisabled={!isOpen}
          />
          <FormHelperText>Insira um arquivo .xlsx, .xls ou .csv</FormHelperText>
          <Button my='10px' disabled={!canSubmit} onClick={onSubmit}>
            Enviar
          </Button>
        </FormControl>
      </ScaleFade>
    </Flex>
  );
};
