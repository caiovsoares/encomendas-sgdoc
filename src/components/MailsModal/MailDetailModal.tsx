import {
  Box,
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import { Style } from 'util';

const pStyle = {
  marginLeft: '40px',
};

export function MailDetailModal({ mail }) {
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
        <Button mr='10px'>Editar</Button>
        <Button>Excluir</Button>
      </ModalFooter>
    </ModalContent>
  );
}
