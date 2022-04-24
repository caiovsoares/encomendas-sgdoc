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
import { useForm, Controller } from 'react-hook-form';

export function ReceiverEditModal({ onClose, user, receiver }) {
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

  const onSubmit = async (data) => {
    let result;
    data.userId = user.id;

    if (process.env.NEXT_PUBLIC_ENVIRONMENT != 'DEV') {
      result = (
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/receivers/${receiver.id}`,
          data
        )
      ).data;
    } else {
      result = {};
    }

    if (result.id) {
      toast({
        title: 'Sucesso',
        description: 'Destinatário alterado com sucesso!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      router.replace(router.asPath); //ESSA LINHA PUXA NOVAMENTE OS DADOS DO SERVIDOR ATUALIZANDO A TABELA
      onClose(); //ESSA LINHA FECHA A JANELA APÓS A EDIÇÃO
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
      <ModalHeader>Editando {receiver.warName}</ModalHeader>
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
              defaultValue={receiver.fullName}
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
              defaultValue={receiver.warName}
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
            defaultValue={receiver.classYear}
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
            defaultValue={receiver.cpf}
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
            defaultValue={receiver.identity}
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
