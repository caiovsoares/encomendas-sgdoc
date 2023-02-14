import React, { useState } from 'react';
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
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { getAPIClient } from '../services/apiClient';
import { GetServerSideProps } from 'next';
import { ShippingCompany, User } from '../interfaces';
import { BiPlus, BiTrash } from 'react-icons/bi';
import { useForm } from 'react-hook-form';
import { api } from '../services/api';
import { useRouter } from 'next/router';

type transportadorasProps = {
  shippingCompanies: ShippingCompany[];
};

const Transportadoras = ({ shippingCompanies }: transportadorasProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const toast = useToast();
  const [modalType, setModalType] = useState<'register' | 'edit'>('register');
  const [company, setCompany] = useState<ShippingCompany>();
  const {
    handleSubmit,
    register,
    reset,
    formState: { isSubmitting },
  } = useForm({ mode: 'onChange' });

  const onSubmit = async (data) => {
    data.id = company.id;
    await api
      .request({
        method: modalType == 'register' ? 'POST' : 'PUT',
        url: 'shipping-company',
        data,
      })
      .then((res) => {
        if (res.status < 300) {
          toast({
            title: 'Sucesso!',
            description:
              modalType == 'register'
                ? 'Transportadora Cadastrada!'
                : 'Transportadora Editada!',
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
          reset({
            company: '',
            name: '',
            cpf: '',
            vehicle: '',
            plate: '',
          });
          router.replace(router.asPath);
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

  const onDelete = async () => {
    api
      .delete('shipping-company', { data: { id: company.id } })
      .then((res) => {
        if (res.status < 300) {
          toast({
            title: 'Sucesso!',
            description: 'Transportadora excluída!',
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
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
    router.replace(router.asPath);
    onClose();
  };

  return (
    <Box w='100%' h='100%' pt={7} pb={3}>
      <Box h='100%' overflowY='auto'>
        <Flex px={5} w='100%' flexWrap='wrap'>
          {shippingCompanies
            .sort((a, b) => a.company.localeCompare(b.company))
            .map((shippingCompany) => (
              <Flex
                borderRadius={10}
                p={4}
                _hover={{ bg: 'backgroundHover' }}
                key={shippingCompany.id}
              >
                <Grid
                  onClick={() => {
                    reset({
                      company: shippingCompany.company,
                      name: shippingCompany.name,
                      cpf: shippingCompany.cpf,
                      vehicle: shippingCompany.vehicle,
                      plate: shippingCompany.plate,
                    });
                    setCompany(shippingCompany);
                    setModalType('edit');
                    onOpen();
                  }}
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
        onClick={() => {
          reset({
            company: '',
            name: '',
            cpf: '',
            vehicle: '',
            plate: '',
          });
          setModalType('register');
          onOpen();
        }}
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
            {modalType == 'register' && (
              <ModalHeader>Cadastrando Transportadora</ModalHeader>
            )}
            {modalType == 'edit' && (
              <ModalHeader>Editando {company.name}</ModalHeader>
            )}
            <ModalCloseButton />
            <ModalBody mt={2}>
              <Flex flexDir='column' alignItems='center'>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <FormLabel>Transportadora</FormLabel>
                  <Input
                    {...register('company')}
                    defaultValue={modalType == 'edit' ? company.company : ''}
                  />
                  <FormLabel>Nome</FormLabel>
                  <Input
                    {...register('name')}
                    defaultValue={modalType == 'edit' ? company.name : ''}
                  />
                  <FormLabel>CPF</FormLabel>
                  <Input
                    {...register('cpf')}
                    defaultValue={modalType == 'edit' ? company.cpf : ''}
                  />
                  <FormLabel>Veículo</FormLabel>
                  <Input
                    {...register('vehicle')}
                    defaultValue={modalType == 'edit' ? company.vehicle : ''}
                  />
                  <FormLabel>Placa</FormLabel>
                  <Input
                    {...register('plate')}
                    defaultValue={modalType == 'edit' ? company.plate : ''}
                  />
                  <Flex my={3}>
                    <Button
                      isLoading={isSubmitting}
                      bgColor='menuButton'
                      _hover={{ bg: 'menuButtonHover' }}
                      color='menuButtonText'
                      mr={3}
                      type='submit'
                    >
                      Enviar
                    </Button>
                    <Button
                      onClick={onDelete}
                      paddingInline={2}
                      bg='alertButton'
                      color='menuButtonText'
                      _hover={{ bg: 'alertButtonHover' }}
                    >
                      <BiTrash size={20} />
                    </Button>
                  </Flex>
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
