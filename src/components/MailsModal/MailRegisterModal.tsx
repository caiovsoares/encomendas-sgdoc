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
  Textarea,
} from '@chakra-ui/react';
import { useForm, Controller } from 'react-hook-form';
import { findReceiverName } from '../../utils';
import { api } from '../../services/api';
import { Cadet, Staff, WorkPlace } from '../../interfaces';
import Select from 'react-select';

interface MailRegisterProps {
  receivers: (Staff | Cadet | WorkPlace)[];
  onClose: () => void;
}

export function MailRegisterModal({ onClose, receivers }: MailRegisterProps) {
  const router = useRouter();
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    setError,
    reset,
    setFocus,
  } = useForm({ mode: 'onChange' });
  const toast = useToast();

  const onSubmit = async (data, e) => {
    data.destinyId = data.destinySelect.value;
    api
      .post('mail', data)
      .then((res) => {
        if (res.status < 300) {
          toast({
            title: 'Sucesso',
            description: 'Encomenda cadastrada com sucesso!',
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
          router.replace(router.asPath);
        } else {
          toast({
            title: 'Erro',
            description:
              'Houve um problema, verifique os dados e tente novamente!',
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        }
      })
      .catch((err) =>
        toast({
          title: 'Erro',
          description:
            'Houve um problema, verifique os dados e tente novamente!',
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
      );

    reset({
      tracking: '',
      sender: '',
      pesquisa_id: '',
      details: '',
      destinySelect: '',
    });
    e.target.reset();
    setFocus('tracking');
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
      <ModalHeader>Cadastrar nova Encomenda</ModalHeader>
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
              defaultValue=''
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

          <FormControl mt='3'>
            <FormLabel fontWeight='semibold' color='gray.600'>
              Remetente:
            </FormLabel>
            <Controller
              name='sender'
              control={control}
              defaultValue=''
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
              Observações:
            </FormLabel>
            <Controller
              name='details'
              control={control}
              render={({ field }) => (
                <Textarea
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
