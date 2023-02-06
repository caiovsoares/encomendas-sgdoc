import {
  Box,
  Button,
  Heading,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { BiEdit, BiTrash } from 'react-icons/bi';
import { Cadet, Staff, WorkPlace } from '../../interfaces';
import { api } from '../../services/api';
import { findReceiverShortName } from '../../utils';

type ReceiverDetailModal = {
  receiver: Staff | Cadet | WorkPlace;
  setModalType: React.Dispatch<React.SetStateAction<string>>;
  onClose: () => void;
};

export function ReceiverDetailModal({
  receiver,
  setModalType,
  onClose,
}: ReceiverDetailModal) {
  const router = useRouter();
  const toast = useToast();

  const onDelete = async () => {
    api
      .delete('receiver', { data: { id: receiver.id } })
      .then((res) => {
        if (res.status < 300) {
          toast({
            title: 'Sucesso',
            description: 'Destinatário excluído com sucesso!',
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
          onClose();
          router.replace(router.asPath);
        } else {
          toast({
            title: 'Erro',
            description: 'Houve um problema, o destinatário não foi excluído!',
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        }
      })
      .catch((err) => {
        toast({
          title: 'Erro',
          description: 'Houve um problema, o destinatário não foi excluído!',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      });
  };

  return (
    <ModalContent>
      <ModalHeader>Detalhes</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Heading size='sm'>
          {'classYear' in receiver
            ? 'Cadete'
            : 'name' in receiver
            ? 'Seção'
            : 'Militar'}
        </Heading>
        <Box ml='30px'>
          {'warName' in receiver && ( //caso seja um staff ou cadet
            <>
              <Text>Nome Completo: {receiver?.fullName}</Text>
              <Text>Nome de Guerra: {findReceiverShortName(receiver)}</Text>
              <Text>CPF: {receiver?.cpf}</Text>
              <Text>Identidade: {receiver?.identity}</Text>
              {'classYear' in receiver && (
                <Text>Ano de Entrada: {receiver.classYear}</Text>
              )}
            </>
          )}
          {'name' in receiver && ( //caso seja um setor
            <>
              <Text>Nome do Setor: {receiver?.name}</Text>
              <Text>Sigla: {receiver?.abbreviation}</Text>
            </>
          )}
        </Box>
      </ModalBody>
      <ModalFooter>
        <Button
          mr='5px'
          paddingInline={2}
          bg='menuButton'
          color='menuButtonText'
          _hover={{ bg: 'menuButtonHover' }}
          onClick={() => {
            setModalType('edit');
          }}
        >
          <BiEdit size={20} />
          Editar
        </Button>
        <Popover>
          <PopoverTrigger>
            <Button
              paddingInline={2}
              bg='alertButton'
              color='menuButtonText'
              _hover={{ bg: 'alertButtonHover' }}
            >
              <BiTrash size={20} />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader>Tem certeza?</PopoverHeader>
            <PopoverBody>
              Essa ação não poderá ser desfeita
              <Button
                bg='alertButton'
                color='menuButtonText'
                _hover={{ bg: 'alertButtonHover' }}
                onClick={onDelete}
              >
                Confirmar
              </Button>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </ModalFooter>
    </ModalContent>
  );
}
