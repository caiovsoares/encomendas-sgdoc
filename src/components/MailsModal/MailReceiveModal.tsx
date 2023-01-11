import { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Button,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  useToast,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from '@chakra-ui/react';
import { useForm, Controller } from 'react-hook-form';
import CustomSelect from '../CustomSelect';
import { search } from '../../utils';
import { Cadet, Mail, Staff, WorkPlace } from '../../interfaces';
import { api } from '../../services/api';

type MailReceiveProps = {
  onClose: () => void;
  receiveMails: Mail[];
  receivers: (Staff | Cadet | WorkPlace)[];
};

export function MailReceiveModal({
  onClose,
  receiveMails,
  receivers: rec,
}: MailReceiveProps) {
  const router = useRouter();
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    setError,
    getValues,
    setValue,
    reset,
    setFocus,
  } = useForm({ mode: 'onChange' });
  const toast = useToast();
  const [receivers, setReceivers] = useState(rec);

  //Aqui se encontra uma das maiores gambiarras do código
  //Talvez não seja tão gambiarra assim
  //Mas minha falta de prática com promisses me impede de entender o que o google sugeriu

  const onSubmit = async (data) => {
    const ids: string[] = receiveMails.map((mail) => mail.id);
    const { receiverId } = data;
    const result = await await api.patch('/mail', { ids, receiverId });
    console.log(result);
    if (result) {
      toast({
        title: 'Sucesso',
        description: 'Recebimento(s) registrado(s) com sucesso!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      router.replace(router.asPath); //ESSA LINHA PUXA NOVAMENTE OS DADOS DO SERVIDOR ATUALIZANDO A TABELA
      onClose(); //ESSA LINHA FECHA A JANELA APÓS A EDIÇÃO
    } else {
      toast({
        title: 'Erro',
        description: 'Houve um problema!',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const pesquisaOnChange = (e) => {
    setValue('pesquisa_id', e.target.value); //essa linha permite que o valor continue alterando

    const options = rec.filter((receiver) => {
      return search(getValues('pesquisa_id'), receiver, false);
    });

    setReceivers(options);
  };

  return (
    <ModalContent>
      <ModalHeader>Registrar Recebimento</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Table variant='simple'>
            <Thead>
              <Tr>
                <Th>Rastreio</Th>
                <Th>Destinatário</Th>
              </Tr>
            </Thead>
            <Tbody>
              {receiveMails.map((mail) => (
                <Tr>
                  <Td>{mail.tracking}</Td>
                  <Td>
                    {'warName' in mail.destiny
                      ? mail.destiny.warName
                      : mail.destiny.name}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>

          <FormControl mt='3'>
            <FormLabel fontWeight='semibold' color='gray.600'>
              Recebedor:
            </FormLabel>
            <Controller
              name='pesquisa_id'
              control={control}
              defaultValue=''
              rules={{ required: false }}
              render={({ field }) => (
                <Input
                  {...field}
                  autoComplete='off'
                  isInvalid={errors.pesquisa_id}
                  placeholder='Pesquise aqui'
                  onChange={pesquisaOnChange}
                />
              )}
            />
          </FormControl>

          <FormControl mt='3' isRequired>
            <Controller
              name='receiverId'
              control={control}
              defaultValue={getValues('pesquisa_id')}
              rules={{ required: true }}
              render={({ field }) => (
                <CustomSelect
                  field={field}
                  entities={receivers}
                  fieldName={'fullName'}
                  placeholder='Selecione o recebedor'
                  value=''
                />
              )}
            />
          </FormControl>

          {/* <FormControl mt='3' isRequired>
            <FormLabel fontWeight='semibold' color='gray.600'>
              Identidade:
            </FormLabel>
            <Controller
              name='identity'
              control={control}
              defaultValue=''
              rules={{ required: false }}
              render={({ field }) => (
                <Input {...field} placeholder='Exemplo: 12YS1234' />
              )}
            />
          </FormControl> */}

          <Button
            isLoading={isSubmitting}
            colorScheme='blue'
            mb='3'
            mt='3'
            mr={3}
            type='submit'
          >
            Registrar
          </Button>
          <Button onClick={onClose} mb='3' mt='3'>
            Cancelar
          </Button>
        </form>
      </ModalBody>
    </ModalContent>
  );
}
