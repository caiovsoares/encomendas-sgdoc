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
  NumberInput,
  NumberInputField,
} from '@chakra-ui/react';
import axios from 'axios';
import CustomSelect from '../CustomSelect';
import { useForm, Controller } from 'react-hook-form';
import { search } from '../../utils';

export function ReceiverRegisterModal({ onClose, user }) {
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

  const onSubmit = async (data, e) => {
    data.userId = user.id;
    let result;

    if (process.env.NEXT_PUBLIC_ENVIRONMENT != 'DEV') {
      result = await (
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/receivers`, data)
      ).data;
    } else {
      result = {};
    }

    if (result.id) {
      toast({
        title: 'Sucesso',
        description: 'Destinatário cadastrado com sucesso!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      reset({
        fullName: '',
        warName: '',
        classYear: '',
        cpf: '',
        identity: '',
      });
      e.target.reset(); //não é o indicado pela documentação, mas funciona
      setFocus('fullName');
      router.replace(router.asPath); //ESSA LINHA PUXA NOVAMENTE OS DADOS DO SERVIDOR ATUALIZANDO A TABELA
    } else {
      toast({
        title: 'Erro',
        description: 'Houve um problema, verifique os dados e tente novamente!',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
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
      <ModalHeader>Cadastrar novo Destinatário</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isRequired>
            <FormLabel fontWeight='semibold' color='gray.600'>
              Nome Completo do Destinatário:
            </FormLabel>
            <Controller
              name='fullName'
              control={control}
              defaultValue=''
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  {...field}
                  isInvalid={errors.fullName}
                  placeholder='Exemplo: Fulano Da Silva '
                  onBlur={() =>
                    customOnBlur(
                      'fullName',
                      'Nome Completo é Obrigatório',
                      field
                    )
                  }
                />
              )}
            />
          </FormControl>

          <FormControl isRequired mt='3'>
            <FormLabel fontWeight='semibold' color='gray.600'>
              Nome de Guerra:
            </FormLabel>
            <Controller
              name='warName'
              control={control}
              defaultValue=''
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  {...field}
                  isInvalid={errors.warName}
                  placeholder='Exemplo: F. Silva'
                  onBlur={() =>
                    customOnBlur(
                      'warName',
                      'Nome de Guerra é Obrigatório',
                      field
                    )
                  }
                />
              )}
            />
          </FormControl>

          <FormLabel fontWeight='semibold' color='gray.600'>
            Ano de Entrada:
          </FormLabel>

          <Controller
            name='classYear'
            control={control}
            defaultValue=''
            rules={{ required: false }}
            render={({ field }) => (
              <NumberInput
                {...field}
                step={1}
                min={new Date().getUTCFullYear() - 5}
                max={new Date().getUTCFullYear() + 1}
              >
                <NumberInputField placeholder='Exemplo: 2021 (Somente para Cadetes)' />
              </NumberInput>
            )}
          />
          <FormLabel fontWeight='semibold' color='gray.600'>
            CPF:
          </FormLabel>

          <Controller
            name='cpf'
            control={control}
            defaultValue=''
            rules={{ required: false, maxLength: 11, minLength: 11 }}
            render={({ field }) => (
              <NumberInput isInvalid={errors.cpf} {...field} step={1}>
                <NumberInputField
                  onBlur={() => {
                    if (errors.cpf)
                      toast({
                        title: 'Atenção',
                        description: 'CPF deve ter 11 digitos',
                        status: 'warning',
                        duration: 3000,
                        isClosable: true,
                      });
                  }}
                  placeholder='Exemplo: 12312312312'
                />
              </NumberInput>
            )}
          />

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

          <Button onClick={onClose} float='right' mb='3' mt='3'>
            Cancel
          </Button>
          <Button
            isLoading={isSubmitting}
            colorScheme='blue'
            float='right'
            mb='3'
            mt='3'
            mr={3}
            type='submit'
          >
            Save
          </Button>
        </form>
      </ModalBody>
    </ModalContent>
  );
}
