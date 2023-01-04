import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

export function LoginModal({ onClose, isOpen }) {
  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm({ mode: 'onChange' });

  const onSubmit = async (data) => {
    await new Promise((r) => setTimeout(r, 10000));
    console.log(data);
  };

  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered size='xl'>
      <ModalOverlay backdropFilter='blur(30px)' />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
          <Flex flexDir='column' alignItems='center'>
            <Heading>SGDOC</Heading>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormLabel fontWeight='semibold' color='gray.600'>
                Usuário
              </FormLabel>
              <Input {...register('login')} />
              <FormLabel fontWeight='semibold' color='gray.600'>
                Senha
              </FormLabel>
              <Input type='password' {...register('password')} />
              <Button
                isLoading={isSubmitting}
                colorScheme='blue'
                mb='3'
                mt='3'
                mr={3}
                type='submit'
              >
                Entrar
              </Button>
            </form>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
