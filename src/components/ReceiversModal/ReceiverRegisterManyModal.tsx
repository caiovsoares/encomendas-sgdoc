import {
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Heading,
  Flex,
  Text,
} from '@chakra-ui/react';
import { InputFile } from './InputFile';
import { ShowTutorial } from './ShowTutorial';

export function ReceiverRegisterManyModal({ onClose }) {
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
          <InputFile onClose={onClose} />
        </Flex>
      </ModalBody>
    </ModalContent>
  );
}
