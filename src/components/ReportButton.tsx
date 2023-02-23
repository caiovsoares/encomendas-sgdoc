import {
  Box,
  Button,
  Flex,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Textarea,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { BiBug } from 'react-icons/bi';
import { api } from '../services/api';

export const ReportButton = () => {
  const [buttonState, changeButtonState] = useState(false);
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
    <Button
      onClick={onOpen}
      p={2}
      rounded={200}
      bgColor='menuButton'
      _hover={{ bg: 'menuButtonHover' }}
      color='menuButtonText'
      height={10}
      width={buttonState ? 210 : 10}
      justifyContent='flex-end'
      transition='width 0.2s'
      onMouseEnter={() => changeButtonState(true)}
      onMouseLeave={() => changeButtonState(false)}
    >
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay backdropFilter='blur(30px)' />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody mt={10}>
            <Flex flexDir='column' alignItems='center'>
              <form onSubmit={handleSubmit(onSubmit)}>
                <FormLabel>Nome</FormLabel>
                <Input {...register('author')} isRequired />
                <FormLabel>Mensagem</FormLabel>
                <Textarea {...register('content')} isRequired />
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
      Relatar um Problema
      <Box ml={3}>
        <BiBug size={24} />
      </Box>
    </Button>
  );
};
