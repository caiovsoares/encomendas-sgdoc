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
import { useState } from 'react';

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
  const [isSubmittingMailList, setisSubmittingMailList] = useState(false);
  const toast = useToast();

  const onSubmit = async (data) => {
    const ids: string[] = receiveMails.map((mail) => mail.id);
    const receiverId = data.destinySelect.value;
    api
      .patch('/mail', { ids, receiverId })
      .then((res) => {
        if (res.status < 300) {
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
      })
      .catch((err) => {
        toast({
          title: 'Erro',
          description: 'Houve um problema!',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      });
  };

  const onCreateMailList = async () => {
    setisSubmittingMailList(true);
    const ids = receiveMails.map((receiveMail) => receiveMail.id);
    api
      .post('mail-list', { ids })
      .then((res) => {
        if (res.status < 300) {
          toast({
            title: 'Sucesso',
            description: 'Lista criada com sucesso!',
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
      })
      .catch((err) => {
        toast({
          title: 'Erro',
          description: 'Houve um problema!',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      });

    setisSubmittingMailList(false);
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
            isLoading={isSubmitting || isSubmittingMailList}
            colorScheme='blue'
            mb='3'
            mt='3'
            mr={3}
            type='submit'
          >
            Registrar
          </Button>
          <Button
            isLoading={isSubmitting || isSubmittingMailList}
            colorScheme='blue'
            onClick={onCreateMailList}
            mb='3'
            mt='3'
          >
            Criar Lista dos Cadetes
          </Button>
          <Button onClick={onClose} mb='3' mt='3'>
            Cancelar
          </Button>
        </form>
      </ModalBody>
    </ModalContent>
  );
}
