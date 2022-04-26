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
import axios from 'axios';
import { useRouter } from 'next/router';
import { BiEdit, BiTrash } from 'react-icons/bi';

export function ReceiverDetailModal({ receiver, user, setModalType, onClose }) {
  const router = useRouter();
  const toast = useToast();

  const onDelete = async () => {
    let result;
    if (process.env.NEXT_PUBLIC_ENVIRONMENT != 'DEV') {
      result = await (
        await axios.delete(
          `${process.env.NEXT_PUBLIC_API_URL}/receivers/${receiver.id}`,
          { data: { userId: user.id } }
        )
      ).data;
    } else {
      result = {};
    }

    if (result.id) {
      toast({
        title: 'Sucesso',
        description: 'Destinatário excluído com sucesso!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      onClose();
      //o useMemo na ReactTable impede de atualizar os dados
      router.replace(router.asPath); //ESSA LINHA PUXA NOVAMENTE OS DADOS DO SERVIDOR ATUALIZANDO A TABELA
    } else {
      toast({
        title: 'Erro',
        description: 'Houve um problema, o destinatário não foi excluído!',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <ModalContent>
      <ModalHeader>Detalhes</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Heading size='sm'>Destinatário</Heading>
        <Box ml='30px'>
          <Text>Nome Completo: {receiver.fullName}</Text>
          <Text>Nome de Guerra: {receiver.warName}</Text>
          <Text>Identidade: {receiver.identity}</Text>
          <Text>CPF: {receiver.cpf}</Text>
          <Text>Ano de Entrada: {receiver.classYear}</Text>
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
