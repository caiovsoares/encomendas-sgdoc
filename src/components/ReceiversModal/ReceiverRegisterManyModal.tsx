import { useRouter } from 'next/router';
import {
  Button,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useToast,
  Heading,
  Flex,
  Text,
} from '@chakra-ui/react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
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
          <InputFile user={user} />
        </Flex>
      </ModalBody>
    </ModalContent>
  );
}
