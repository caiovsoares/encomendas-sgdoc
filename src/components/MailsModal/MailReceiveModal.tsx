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
  FormLabel,
} from '@chakra-ui/react';
import { useForm, Controller } from 'react-hook-form';
import { findReceiverName, findReceiverShortName } from '../../utils';
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
  receivers,
}: MailReceiveProps) {
  const router = useRouter();
  const {
    handleSubmit,
    formState: { isSubmitting },
    control,
  } = useForm({ mode: 'onChange' });
  const toast = useToast();

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
      router.replace(router.asPath);
      onClose();
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
                  <Td>{findReceiverShortName(mail.destiny)}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>

          <FormControl mt='3' isRequired>
            <FormLabel fontWeight='semibold' color='gray.600'>
              Recebedor:
            </FormLabel>
            <Controller
              name='destinySelect'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  {...field}
                  options={receivers.map((receiver) => ({
                    value: receiver.id,
                    label: findReceiverName(receiver),
                  }))}
                  placeholder='Selecione...'
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
