import { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Button,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  useToast,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from '@chakra-ui/react';
import { useForm, Controller } from 'react-hook-form';
import { findReceiverName } from '../../utils';
import { Cadet, Mail, Staff, WorkPlace } from '../../interfaces';
import { api } from '../../services/api';
import Select from 'react-select';

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
    const receiverId = data.destinySelect.value;
    const result = await api.patch('/mail', { ids, receiverId });
    if (result.status < 300) {
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
                  <Td>{findReceiverName(mail.destiny)}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>

          <FormControl mt='3' isRequired>
            <Controller
              name='destinySelect'
              control={control}
              defaultValue={getValues('pesquisa_id')}
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  {...field}
                  options={receivers.map((receiver) => ({
                    value: receiver.id,
                    label: findReceiverName(receiver),
                  }))}
                />
              )}
            />
          </FormControl>

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
