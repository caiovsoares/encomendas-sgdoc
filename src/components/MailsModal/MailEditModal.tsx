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
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Box,
} from '@chakra-ui/react';
import { useForm, Controller } from 'react-hook-form';
import { api } from '../../services/api';
import { Cadet, Mail, Staff, WorkPlace } from '../../interfaces';
import Select from 'react-select';
import { convertToDefaultDate, findReceiverName } from '../../utils';
import { BiXCircle } from 'react-icons/bi';

type MailEditProps = {
  onClose: () => void;
  mail: Mail;
  receivers: (Staff | Cadet | WorkPlace)[];
};

export function MailEditModal({ onClose, mail, receivers }: MailEditProps) {
  const router = useRouter();
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    setError,
    setValue,
    getValues,
  } = useForm({ mode: 'onChange' });
  const toast = useToast();

  const onSubmit = async (data) => {
    data.id = mail.id;
    data.destinyId = data.destinySelect.value;
    data.receiverId = data.receiverSelect?.value || null;

    if (!!data.received_at != !!data.receiverId)
      return toast({
        title: 'Erro',
        description: 'Verifique "Recebedor" e "Recebido em"!',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });

    const result = await (await api.put('mail', data)).data;

    if (result.id) {
      toast({
        title: 'Sucesso',
        description: 'Encomenda alterada com sucesso!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      router.replace(router.asPath);
      onClose();
    } else
      toast({
        title: 'Erro',
        description: 'Houve um problema, verifique os dados e tente novamente!',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
  };

  const customOnBlur = (fieldName, fieldMessage, fField) => {
    if (!fField.value) {
      setError(fieldName, {
        type: 'manual',
        message: fieldMessage,
      });
      toast({
        title: 'Atenção',
        description: fieldMessage,
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <ModalContent>
      <ModalHeader>Editando {mail.tracking}</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isRequired>
            <FormLabel fontWeight='semibold' color='gray.600'>
              Rastreamento:
            </FormLabel>
            <Controller
              name='tracking'
              control={control}
              defaultValue={mail.tracking}
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  {...field}
                  isInvalid={errors.tracking}
                  placeholder='Exemplo: BR123123123BR '
                  onBlur={() =>
                    customOnBlur(
                      'tracking',
                      'Rastreamento é obrigatório',
                      field
                    )
                  }
                />
              )}
            />
          </FormControl>

          <FormControl>
            <Controller
              name='created_at'
              control={control}
              rules={{ required: true }}
              defaultValue={convertToDefaultDate(mail.created_at)}
              render={({ field }) => (
                <InputGroup>
                  <InputLeftAddon children='Entregue em:' />
                  <Input type='date' {...field} />
                </InputGroup>
              )}
            />
          </FormControl>

          <FormControl mt='3'>
            <FormLabel fontWeight='semibold' color='gray.600'>
              Remetente:
            </FormLabel>
            <Controller
              name='sender'
              control={control}
              defaultValue={mail.sender}
              rules={{ required: false }}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder='Exemplo: Fulano da Silva Junior'
                />
              )}
            />
          </FormControl>

          <FormControl mt='3' isRequired>
            <FormLabel fontWeight='semibold' color='gray.600'>
              Destinatário:
            </FormLabel>
            <Controller
              name='destinySelect'
              control={control}
              rules={{ required: true }}
              defaultValue={
                mail.destiny && {
                  label: findReceiverName(mail.destiny),
                  value: mail.destiny.id,
                }
              }
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

          <FormControl mt='3'>
            <FormLabel fontWeight='semibold' color='gray.600'>
              Recebedor:
            </FormLabel>
            <Controller
              name='receiverSelect'
              control={control}
              defaultValue={
                mail.receiver[0] && {
                  label: findReceiverName(mail.receiver[0]),
                  value: mail.receiver[0].id,
                }
              }
              render={({ field }) => (
                <Select
                  isDisabled={!!mail.mailListDate}
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

          <FormControl>
            <Controller
              name='received_at'
              control={control}
              defaultValue={convertToDefaultDate(mail.received_at)}
              render={({ field }) => (
                <InputGroup>
                  <InputLeftAddon children='Recebido em:' />
                  <Input
                    type='date'
                    disabled={!!mail.mailListDate}
                    {...field}
                  />
                  <InputRightAddon
                    p={0}
                    w='40px'
                    children={
                      <Button
                        w='40px'
                        isDisabled={!!mail.mailListDate}
                        onClick={() => {
                          setValue('receiverSelect', null);
                          setValue('received_at', '');
                          console.log(getValues());
                        }}
                      >
                        <Box w='40px'>
                          <BiXCircle color='red' />
                        </Box>
                      </Button>
                    }
                  />
                </InputGroup>
              )}
            />
          </FormControl>

          <FormControl mt='3'>
            <FormLabel fontWeight='semibold' color='gray.600'>
              Observações:
            </FormLabel>
            <Controller
              name='details'
              control={control}
              defaultValue={mail.details}
              render={({ field }) => (
                <Input
                  {...field}
                  isInvalid={errors.details}
                  placeholder='Algo a acrescentar?'
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
            Salvar
          </Button>
          <Button onClick={onClose} mb='3' mt='3'>
            Cancelar
          </Button>
        </form>
      </ModalBody>
    </ModalContent>
  );
}
