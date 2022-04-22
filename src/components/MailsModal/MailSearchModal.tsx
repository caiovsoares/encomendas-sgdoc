import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';

export function MailSearchModal({ mail }) {
  return (
    <ModalContent>
      <ModalHeader>Detalhes</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <strong>Encomenda</strong>
        <p>Rastreio: {mail.tracking}</p>
        <p>Tipo: {mail.type}</p>
        <p>Tamanho: {mail.size}</p>
        <p>Remetente: {mail.sender}</p>
        <p>Data de chegada: {mail.created_at}</p>
        <br />
        <hr />
        <br />
        <strong>Destinatário</strong>
        <p>Nome Completo: {mail.destiny?.fullName}</p>
        <p>Nome de Guerra: {mail.destiny?.warName}</p>
        <p>CPF: {mail.destiny?.cpf}</p>
        <p>Identidade: {mail.destiny?.identity}</p>
        {mail.receiver && (
          <>
            <br />
            <hr />
            <br />
            <strong>Recebedor</strong>
            <p>Nome Completo: {mail.receiver?.fullName}</p>
            <p>Nome de Guerra: {mail.receiver?.warName}</p>
            <p>CPF: {mail.receiver?.cpf}</p>
            <p>Identidade: {mail.receiver?.identity}</p>
            <p>Data de recebimento: {mail.received_at}</p>
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
