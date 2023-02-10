import {
  Button,
  Flex,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Textarea,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { BiMessageDetail } from 'react-icons/bi';
import { api } from '../../services/api';
import { PageButton } from '../PageButton';

type ReportsModalButtonProps = {
  id: string;
};

export const ReportsModalButton = ({ id }: ReportsModalButtonProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const toast = useToast();
  const {
    handleSubmit,
    register,
    resetField,
    formState: { isSubmitting },
  } = useForm({ mode: 'onChange' });

  const onSubmit = async (data) => {
    data.id = id;
    await api
      .patch('report', data)
      .then((res) => {
        if (res.status < 300) {
          toast({
            title: 'Sucesso!',
            description: 'A resolução foi salva!',
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
          resetField('resolution');
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

  return (
    <PageButton onClick={onOpen}>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay backdropFilter='blur(30px)' />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody mt={10}>
            <Flex flexDir='column' alignItems='center'>
              <form onSubmit={handleSubmit(onSubmit)}>
                <FormLabel>Resposta</FormLabel>
                <Textarea {...register('resolution')} />
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
      <BiMessageDetail size='30px' />
    </PageButton>
  );
};
