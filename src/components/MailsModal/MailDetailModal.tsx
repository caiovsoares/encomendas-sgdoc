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
import { useState } from 'react';
import { BiEdit, BiListMinus, BiListPlus, BiTrash } from 'react-icons/bi';
import { Mail } from '../../interfaces';
import { api } from '../../services/api';
import { findReceiverShortName, invertStringDate } from '../../utils';

type MailDetailProps = {
  mail: Mail;
  setModalType: React.Dispatch<React.SetStateAction<string>>;
  onClose: () => void;
};

export function MailDetailModal({
  mail,
  setModalType,
  onClose,
}: MailDetailProps) {
  const router = useRouter();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const onDelete = async () => {
    setIsLoading(true);

    api
      .delete('mail', { data: { id: mail.id } })
      .then((res) => {
        if (res.status < 300) {
          toast({
            title: 'Sucesso',
            description: 'Encomenda excluída com sucesso!',
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
          setIsLoading(false);
          onClose();
          router.replace(router.asPath);
        } else {
          toast({
            title: 'Erro',
            description: 'Houve um problema, a encomenda não foi excluída!',
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
          setIsLoading(false);
        }
      })
      .catch((err) => {
        toast({
          title: 'Erro',
          description: 'Houve um problema, a encomenda não foi excluída!',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        setIsLoading(false);
      });
  };

  const removeMailFromList = async () => {
    setIsLoading(true);
    api
      .patch('mail/removeMailList', { id: mail.id })
      .then((res) => {
        if (res.status < 300) {
          toast({
            title: 'Sucesso',
            description: 'Encomenda removida da lista com sucesso com sucesso!',
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
          setIsLoading(false);
          onClose();
          router.replace(router.asPath);
        } else {
          toast({
            title: 'Erro',
            description:
              'Houve um problema, a encomenda não foi removida da lista!',
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
          setIsLoading(false);
        }
      })
      .catch((err) => {
        toast({
          title: 'Erro',
          description:
            'Houve um problema, a encomenda não foi removida da lista!',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        setIsLoading(false);
      });
  };

  return (
    <ModalContent>
      <ModalHeader>Detalhes</ModalHeader>
      <ModalCloseButton />
      <ModalBody maxH='70vh' overflowX='clip' overflowY='auto'>
        <Heading size='sm'>Encomenda</Heading>
        <Box ml='30px'>
          <Text>Rastreio: {mail.tracking}</Text>
          <Text>Remetente: {mail.sender}</Text>
          <Text>Data de Chegada: {invertStringDate(mail.created_at)}</Text>
        </Box>
        <br />
        <hr />
        <br />
        <Heading size='sm'>Destinatário</Heading>
        <Box ml='30px'>
          {'warName' in mail.destiny && ( //caso seja um staff ou cadet
            <>
              <Text>Nome Completo: {mail.destiny?.fullName}</Text>
              <Text>Nome de Guerra: {findReceiverShortName(mail.destiny)}</Text>
              <Text>CPF: {mail.destiny?.cpf}</Text>
              <Text>Identidade: {mail.destiny?.identity}</Text>
            </>
          )}
          {'name' in mail.destiny && ( //caso seja um setor
            <>
              <Text>Nome do Setor: {mail.destiny?.name}</Text>
              <Text>Sigla: {mail.destiny?.abbreviation}</Text>
            </>
          )}
          <Text>Email: {mail.destiny?.email}</Text>
        </Box>
        {mail.receiver[0] &&
          mail.receiver.map((receiver, i) => (
            <>
              <br />
              <hr />
              <br />
              <Heading size='sm'>{`Recebedor${
                mail.mailListDate ? ' ' + (i + 1) : ''
              }`}</Heading>
              <Box ml='30px'>
                {receiver &&
                  'warName' in receiver && ( //caso seja um staff ou cadet
                    <>
                      <Text>Nome Completo: {receiver?.fullName}</Text>
                      <Text>
                        Nome de Guerra: {findReceiverShortName(receiver)}
                      </Text>
                      <Text>CPF: {receiver?.cpf}</Text>
                      <Text>Identidade: {receiver?.identity}</Text>
                    </>
                  )}
                {receiver &&
                  'name' in receiver && ( //caso seja um setor
                    <>
                      <Text>Nome do Setor: {receiver?.name}</Text>
                      <Text>Sigla: {receiver?.abbreviation}</Text>
                    </>
                  )}
                <Text>Email: {receiver.email}</Text>
              </Box>
            </>
          ))}
        {mail.mailListDate && (
          <>
            <br />
            <hr />
            <br />
            <Heading size='sm'>Lista dos Cadetes</Heading>
            <Box ml='30px'>
              <Text>
                Data de Criação: {invertStringDate(mail.mailListDate)}
              </Text>
            </Box>
          </>
        )}
        {mail.received_at && (
          <Text ml='30px'>
            Data de Recebimento: {invertStringDate(mail.received_at)}
          </Text>
        )}
        {mail.details && (
          <>
            <br />
            <hr />
            <br />
            <Heading size='sm'>Observações</Heading>
            <Box ml='30px'>
              <Text>{mail.details}</Text>
            </Box>
          </>
        )}
      </ModalBody>
      <ModalFooter>
        {mail.mailListDate ? (
          <Button
            isLoading={isLoading}
            disabled={!!mail.received_at}
            bg='menuButton'
            color='menuButtonText'
            _hover={{ bg: 'menuButtonHover' }}
            mr={3}
            paddingInline={2}
            onClick={removeMailFromList}
          >
            <BiListMinus size={25} />
            Remover da Lista
          </Button>
        ) : (
          <></>
          // <Button
          //   isLoading={isLoading}
          //   disabled={!!mail.received_at}
          //   bg='menuButton'
          //   color='menuButtonText'
          //   _hover={{ bg: 'menuButtonHover' }}
          //   mr={3}
          //   paddingInline={2}
          // >
          //   <BiListPlus size={25} />
          //   Inserir em uma Lista
          // </Button>
        )}

        <Button
          isLoading={isLoading}
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
              isLoading={isLoading}
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
                isLoading={isLoading}
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
