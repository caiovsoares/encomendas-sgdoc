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

export function MailDetailModal({ mail, user, setModalType, onClose }) {
  const router = useRouter();
  const toast = useToast();

  const onDelete = async () => {
    let result;
    if (process.env.NEXT_PUBLIC_ENVIRONMENT != 'DEV') {
      result = await (
        await axios.delete(
          `${process.env.NEXT_PUBLIC_API_URL}/mails/${mail.id}`,
          { data: { userId: user.id } }
        )
      ).data;
    } else {
      result = {};
    }

    if (result.id) {
      toast({
        title: 'Sucesso',
        description: 'Encomenda excluída com sucesso!',
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
        description: 'Houve um problema, a encomenda não foi excluída!',
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
        <Heading size='sm'>Encomenda</Heading>
        <Box ml='30px'>
          <Text>Rastreio: {mail.tracking}</Text>
          <Text>Tipo: {mail.type}</Text>
          <Text>Tamanho: {mail.size}</Text>
          <Text>Remetente: {mail.sender}</Text>
          <Text>Data de chegada: {mail.created_at}</Text>
        </Box>
        <br />
        <hr />
        <br />
        <Heading size='sm'>Destinatário</Heading>
        <Box ml='30px'>
          <Text>Nome Completo: {mail.destiny?.fullName}</Text>
          <Text>Nome de Guerra: {mail.destiny?.warName}</Text>
          <Text>CPF: {mail.destiny?.cpf}</Text>
          <Text>Identidade: {mail.destiny?.identity}</Text>
        </Box>
        {mail.receiver && (
          <>
            <br />
            <hr />
            <br />
            <Heading size='sm'>Recebedor</Heading>
            <Box ml='30px'>
              <Text>Nome Completo: {mail.receiver?.fullName}</Text>
              <Text>Nome de Guerra: {mail.receiver?.warName}</Text>
              <Text>CPF: {mail.receiver?.cpf}</Text>
              <Text>Identidade: {mail.receiver?.identity}</Text>
              <Text>Data de recebimento: {mail.received_at}</Text>
            </Box>
          </>
        )}
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
