import React from 'react';
import {
  Button,
  Flex,
  FormLabel,
  Heading,
  Input,
  useToast,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { api } from '../services/api';
import { GetServerSideProps } from 'next';
import { getAPIClient } from '../services/apiClient';

const TrocarSenha = () => {
  const toast = useToast();
  const {
    handleSubmit,
    register,
    resetField,
    formState: { isSubmitting },
  } = useForm({ mode: 'onChange' });

  const onSubmit = async (data) => {
    if (data.newPass != data.newPass2)
      return toast({
        title: 'Erro',
        description: 'As senhas não conferem!',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    await api
      .patch('user', data)
      .then((res) => {
        if (res.status < 300) {
          toast({
            title: 'Sucesso!',
            description: 'Senha alterada com sucesso!',
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
          resetField('author');
          resetField('content');
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
      .catch((err) =>
        toast({
          title: 'Erro',
          description: 'Houve um problema!',
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
      );
  };

  return (
    <Flex w='100%' alignItems='center' justifyContent='center' flexDir='column'>
      <Heading size='lg' mb='20px'>
        Trocar Senha
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormLabel>Senha antiga</FormLabel>
        <Input {...register('oldPass')} type='password' />
        <FormLabel>Nova senha</FormLabel>
        <Input {...register('newPass')} type='password' />
        <FormLabel>Repita a nova senha</FormLabel>
        <Input {...register('newPass2')} type='password' />
        <Button
          isLoading={isSubmitting}
          bgColor='menuButton'
          _hover={{ bg: 'menuButtonHover' }}
          color='menuButtonText'
          mb='3'
          mt='3'
          mr={3}
          type='submit'
        >
          Enviar
        </Button>
      </form>
    </Flex>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const apiClient = getAPIClient(context);
    const userRes = await apiClient.get('/user/auth');

    if (userRes.status > 299)
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    return { props: {} };
  } catch (error) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
};

export default TrocarSenha;
