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
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../contexts/AuthContext';

export function LoginModal({ onClose, isOpen }) {
  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm({ mode: 'onChange' });

  const { signIn } = useContext(AuthContext);

  const onSubmit = async (data: { login: string; password: string }) => {
    const loginSuccess = await signIn(data);
    if (loginSuccess) onClose();
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
              <FormLabel>Usuário</FormLabel>
              <Input {...register('login')} />
              <FormLabel>Senha</FormLabel>
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
