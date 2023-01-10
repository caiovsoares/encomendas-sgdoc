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
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
} from '@chakra-ui/react';
import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
import CustomSelect from '../CustomSelect';
import { search } from '../../utils';

export function MailReceiveModal({ onClose, receiveMails, rec }) {
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
    data.received_at = new Date();

    const result = [];

    if (process.env.NEXT_PUBLIC_ENVIRONMENT != 'DEV') {
      let asyncForEach = new Promise((resolve, reject) => {
        receiveMails.forEach(async (mail, i, array) => {
          data.mail_id = mail.id;
          result.push(
            await (
              await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/mails`, data)
            ).data
          );
          if (i === array.length - 1) resolve(true);
        });
        if (!receiveMails[0]) resolve(true);
      });

      asyncForEach.then(() => {
        if (result[0] && result[0].id) {
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
      });
    } else
      toast({
        title: 'Erro',
        description: 'Você está em ambiente de Desenvolvimento',
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
                  <Td>
                    <Popover>
                      <PopoverTrigger>
                        <p>{mail.tracking}</p>
                      </PopoverTrigger>
                      <PopoverContent>
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <PopoverHeader>Detalhes</PopoverHeader>
                        <PopoverBody>
                          Rastreio: {mail.tracking} <br />
                          Tipo: {mail.type} <br />
                          Tamanho: {mail.size} <br />
                          Chegada: {mail.created_at} <br />
                        </PopoverBody>
                      </PopoverContent>
                    </Popover>
                  </Td>
                  <Td>
                    <Popover>
                      <PopoverTrigger>
                        <p>{mail.destiny.fullName}</p>
                      </PopoverTrigger>
                      <PopoverContent>
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <PopoverHeader>Detalhes</PopoverHeader>
                        <PopoverBody>
                          Nome Completo: {mail.destiny.fullName}
                          <br />
                          Nome de Guerra: {mail.destiny.warName}
                          <br />
                          CPF: {mail.destiny.cpf}
                          <br />
                          Identidade: {mail.destiny.identity}
                          <br />
                        </PopoverBody>
                      </PopoverContent>
                    </Popover>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>

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
              name='receiver_id'
              control={control}
              //defaultValue="Caio Vinicius Amancio Soares"
              rules={{ required: true }}
              render={({ field }) => (
                <CustomSelect
                  value={'' /*mail.destiny.fullName*/}
                  field={field}
                  entities={receivers}
                  fieldName={'fullName'}
                  placeholder='Selecione o destinatário'
                />
              )}
            />
          </FormControl>

          <FormControl mt='3' isRequired>
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
