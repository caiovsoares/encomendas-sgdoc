import {
  Box,
  Flex,
  Heading,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  Text,
} from '@chakra-ui/react';
import { BiCheckCircle, BiXCircle } from 'react-icons/bi';
import { User } from '../../interfaces';

type UserDetailProps = {
  user: User;
};

export function UserDetailModal({ user }: UserDetailProps) {
  return (
    <ModalContent>
      <ModalHeader>Detalhes</ModalHeader>
      <ModalCloseButton />
      <ModalBody maxH='70vh' overflowX='clip' overflowY='auto' pb={5}>
        <Heading size='sm'>Usuário</Heading>
        <Box ml='30px'>
          <Text>Nome Completo: {user.fullName}</Text>
          <Text>Nome de Guerra: {user.warName}</Text>
          <Text>Login: {user.login}</Text>
          <Text>CPF: {user.cpf}</Text>
          <Text>Identidade: {user.identity}</Text>
          <Text>Posto/Graduação: {user.rank}</Text>
          <Text>E-mail: {user.email}</Text>
        </Box>
        <Heading mt={3} size='sm'>
          Permissão
        </Heading>
        <Box ml='30px'>
          <Text>Nome: {user.permission.name}</Text>
          <Text>
            <Flex flexDir='row' alignItems='center'>
              Editar Encomenda:
              {user.permission.editMail ? (
                <BiCheckCircle color='green' size='20px' />
              ) : (
                <BiXCircle color='red' size='20px' />
              )}
            </Flex>
          </Text>
          <Text>
            <Flex flexDir='row' alignItems='center'>
              Editar Expedição:
              {user.permission.editExpedition ? (
                <BiCheckCircle color='green' size='20px' />
              ) : (
                <BiXCircle color='red' size='20px' />
              )}
            </Flex>
          </Text>
          <Text>
            <Flex flexDir='row' alignItems='center'>
              Editar Destinatário:
              {user.permission.editReceiver ? (
                <BiCheckCircle color='green' size='20px' />
              ) : (
                <BiXCircle color='red' size='20px' />
              )}
            </Flex>
          </Text>
          <Text>
            <Flex flexDir='row' alignItems='center'>
              Editar Usuário:
              {user.permission.editUser ? (
                <BiCheckCircle color='green' size='20px' />
              ) : (
                <BiXCircle color='red' size='20px' />
              )}
            </Flex>
          </Text>
        </Box>
      </ModalBody>
    </ModalContent>
  );
}
