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
} from '@chakra-ui/react';
import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
import CustomSelect from '../CustomSelect';
import { search } from '../../utils';

export function MailEditModal({ onClose, user, mail, rec }) {
  const router = useRouter();
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    setError,
    getValues,
    setValue,
  } = useForm({ mode: 'onChange' });
  const toast = useToast();
  const [receivers, setReceivers] = useState(rec);

  const onSubmit = async (data) => {
    let result;
    data.userId = user.id;

    if (process.env.NEXT_PUBLIC_ENVIRONMENT != 'DEV') {
      result = (
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/mails/${mail.id}`,
          data
        )
      ).data;
    } else {
      result = {};
    }

    if (result.id) {
      toast({
        title: 'Sucesso',
        description: 'Encomenda alterada com sucesso!',
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

  const pesquisaOnChange = (e) => {
    setValue('pesquisa_id', e.target.value); //essa linha permite que o valor continue alterando

    const options = rec.filter((receiver) => {
      return search(getValues('pesquisa_id'), receiver, false);
    });

    setReceivers(options);
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

          <FormControl mt='3'>
            <FormLabel fontWeight='semibold' color='gray.600'>
              Tipo:
            </FormLabel>
            <Controller
              name='type'
              control={control}
              defaultValue={mail.type}
              rules={{ required: false }}
              render={({ field }) => (
                <CustomSelect
                  field={field}
                  entities={['Pacote', 'Caixa', 'Envelope', 'Carta']}
                  placeholder=''
                  fieldName=''
                  value=''
                />
              )}
            />
          </FormControl>

          <FormControl mt='3'>
            <FormLabel fontWeight='semibold' color='gray.600'>
              Tamanho:
            </FormLabel>
            <Controller
              name='size'
              control={control}
              defaultValue={mail.size}
              rules={{ required: false }}
              render={({ field }) => (
                <CustomSelect
                  field={field}
                  entities={['Pequeno', 'Medio', 'Grande']}
                  placeholder=''
                  fieldName=''
                  value=''
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

          <FormControl mt='3'>
            <FormLabel fontWeight='semibold' color='gray.600'>
              Destinatário:
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
              name='destiny_id'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <CustomSelect
                  value={mail.destiny.fullName}
                  field={field}
                  entities={receivers}
                  fieldName={'fullName'}
                  placeholder='Selecione o destinatário'
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
            Save
          </Button>
          <Button onClick={onClose} mb='3' mt='3'>
            Cancel
          </Button>
        </form>
      </ModalBody>
    </ModalContent>
  );
}
