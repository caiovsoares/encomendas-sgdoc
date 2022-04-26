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
  FormHelperText,
  Switch,
  Heading,
  Flex,
  Text,
} from '@chakra-ui/react';
import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
import { useState } from 'react';
import * as XLSX from 'xlsx';
import { InputFile } from './InputFile';
import { ShowTutorial } from './ShowTutorial';

export function ReceiverRegisterManyModal({ onClose, user }) {
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
      // result = (
      //   await axios.post(
      //     `${process.env.NEXT_PUBLIC_API_URL}/receivers/${receiver.id}`,
      //     data
      //   )
      // ).data;
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
      <ModalHeader>Inserir Diversos</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Flex flexDir='column'>
          <Heading size='4xl' color='alert' alignSelf='center'>
            ATENÇÃO
          </Heading>
          <Text fontSize='xl' color='alert'>
            Muito cuidado ao inserir novos dados aqui
          </Text>
          <Text fontSize='sm' color='alert'>
            O uso incorreto dessa ferramenta pode comprometer o sistema
          </Text>
          <ShowTutorial />
          <InputFile />
        </Flex>
      </ModalBody>
    </ModalContent>
  );
}
