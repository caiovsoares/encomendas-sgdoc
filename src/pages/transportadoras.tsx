import React from 'react';
import {
  Box,
  Button,
  Flex,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  Textarea,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { getAPIClient } from '../services/apiClient';
import { GetServerSideProps } from 'next';
import { ShippingCompany, User } from '../interfaces';
import { BiBug, BiPlus } from 'react-icons/bi';
import { useForm } from 'react-hook-form';
import { api } from '../services/api';

type transportadorasProps = {
  shippingCompanies: ShippingCompany[];
};

const Transportadoras = ({ shippingCompanies }: transportadorasProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const {
    handleSubmit,
    register,
    resetField,
    formState: { isSubmitting },
  } = useForm({ mode: 'onChange' });

  const onSubmit = async (data) => {
    await api
      .post('report', data)
      .then((res) => {
        if (res.status < 300) {
          toast({
            title: 'Reporte enviado com sucesso!',
            description: 'Muito obrigado pela sua contribuição!',
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
          resetField('author');
          resetField('content');
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
    <Box w='100%' h='100%' pt={7} pb={3}>
      <Box h='100%' overflowY='auto'>
        <Flex px={5} w='100%' flexWrap='wrap'>
          {shippingCompanies.map((shippingCompany) => (
            <Flex
              borderRadius={10}
              p={4}
              _hover={{ bg: 'backgroundHover' }}
              key={shippingCompany.id}
            >
              <Grid
                autoColumns='auto'
                templateColumns='max-content max-content'
                templateRows={`repeat(5, max-content)`}
                alignItems='center'
                gap={2}
              >
                <GridItem>
                  <Heading size='sm' textAlign='right'>
                    Transportadora:
                  </Heading>
                </GridItem>
                <GridItem>
                  <Text>{shippingCompany.company}</Text>
                </GridItem>
                <GridItem>
                  <Heading size='sm' textAlign='right'>
                    Nome:
                  </Heading>
                </GridItem>
                <GridItem>
                  <Text>{shippingCompany.name}</Text>
                </GridItem>
                <GridItem>
                  <Heading size='sm' textAlign='right'>
                    CPF:
                  </Heading>
                </GridItem>
                <GridItem>
                  <Text>{shippingCompany.cpf}</Text>
                </GridItem>
                <GridItem>
                  <Heading size='sm' textAlign='right'>
                    Veículo:
                  </Heading>
                </GridItem>
                <GridItem>
                  <Text>{shippingCompany.vehicle}</Text>
                </GridItem>
                <GridItem>
                  <Heading size='sm' textAlign='right'>
                    Placa:
                  </Heading>
                </GridItem>
                <GridItem>
                  <Text>{shippingCompany.plate}</Text>
                </GridItem>
              </Grid>
            </Flex>
          ))}
        </Flex>
      </Box>
      <Button
        pos='absolute'
        bottom='10px'
        right='10px'
        onClick={onOpen}
        p={2}
        rounded={200}
        bgColor='menuButton'
        _hover={{ bg: 'menuButtonHover' }}
        color='menuButtonText'
        height={10}
        width={10}
      >
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay backdropFilter='blur(30px)' />
          <ModalContent>
            <ModalCloseButton />
            <ModalBody mt={10}>
              <Flex flexDir='column' alignItems='center'>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <FormLabel>Nome (opcional)</FormLabel>
                  <Input {...register('author')} />
                  <FormLabel>Mensagem</FormLabel>
                  <Textarea {...register('content')} />
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
            </ModalBody>
          </ModalContent>
        </Modal>
        <Box>
          <BiPlus size={24} />
        </Box>
      </Button>
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const apiClient = getAPIClient(context);
    const userRes = await apiClient.get('/user/auth');
    const user: User = userRes.data;

    if (userRes.status > 299 || !user?.permission?.editShippingCompany)
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };

    const shippingCompanies = await (
      await apiClient.get('shipping-company')
    ).data;

    return {
      props: { shippingCompanies },
    };
  } catch (error) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
};

export default Transportadoras;
