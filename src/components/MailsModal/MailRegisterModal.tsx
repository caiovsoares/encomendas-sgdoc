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

export function MailRegisterModal({
  onClose,
  receivers: rec,
}: MailRegisterProps) {
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

  const onSubmit = async (data, e) => {
    data.destinyId = data.destinySelect.value;
    api.post('mail', data).then((res) => {
      if (res.status < 300) {
        toast({
          title: 'Sucesso',
          description: 'Encomenda cadastrada com sucesso!',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        //o useMemo na ReactTable impede de atualizar os dados
        router.replace(router.asPath); //ESSA LINHA PUXA NOVAMENTE OS DADOS DO SERVIDOR ATUALIZANDO A TABELA
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
    });

    //resetar formulário
    reset({
      tracking: '',
      sender: '',
      pesquisa_id: '',
      details: '',
    });
    e.target.reset(); //não é o indicado pela documentação, mas funciona
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
