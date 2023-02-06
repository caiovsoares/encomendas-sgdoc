import React, { useRef } from 'react';
import {
  Box,
  Button,
  Flex,
  Heading,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import {
  useTable,
  usePagination,
  useSortBy,
  useGlobalFilter,
} from 'react-table';
import ReactTable from '../../components/ReactTable';
import { PageButton } from '../../components/PageButton';
import { getAPIClient } from '../../services/apiClient';
import { GetServerSideProps } from 'next';
import { Cadet, Mail, Staff, WorkPlace } from '../../interfaces';
import { findReceiverName, invertStringDate } from '../../utils';
import { MailList } from '../../interfaces';
import ReactToPrint from 'react-to-print';
import { CadetList } from '../../components/CadetList';
import MailListModal from '../../components/MailListModal';
import { BiPrinter, BiTrash } from 'react-icons/bi';
import { api } from '../../services/api';
import { useRouter } from 'next/router';

type listaId = {
  mailList: MailList;
  receivers: (Staff | WorkPlace | Cadet)[];
};

const ListaId = ({ mailList, receivers }: listaId) => {
  const router = useRouter();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const componentRef = useRef();
  const mails = mailList.mails;

  const columns = React.useMemo(
    () => [
      { Header: 'Rastreio', accessor: 'tracking' },
      { Header: 'Remetente', accessor: 'sender' },
      {
        Header: 'Destinatário',
        accessor: (mail: Mail) => findReceiverName(mail.destiny),
        id: 'destiny',
      },
      {
        Header: 'Chegada',
        accessor: (mail: Mail) => invertStringDate(mail.created_at),
        id: 'created_at',
      },
    ],
    []
  );

  const tableOptions = useTable(
    {
      columns,
      data: mails,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const deleteMailList = async () => {
    api
      .delete('mail-list', { data: { id: mailList.id } })
      .then((res) => {
        if (res.status < 300) {
          toast({
            title: 'Sucesso',
            description: 'Lista excluída com sucesso!',
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
          router.push('/lista');
        } else
          toast({
            title: 'Erro',
            description: 'Houve um problema, a lista não foi excluída!',
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
      })
      .catch((err) => {
        toast({
          title: 'Erro',
          description: 'Houve um problema, a lista não foi excluída!',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      });
  };

  const deleteReceivement = async () => {
    api
      .patch('mail-list/unreceive', { id: mailList.id })
      .then((res) => {
        if (res.status < 300) {
          toast({
            title: 'Sucesso',
            description: 'Recebimento da lista excluído com sucesso!',
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
          router.replace(router.asPath);
        } else
          toast({
            title: 'Erro',
            description:
              'Houve um problema, o recebimento da lista não foi excluído!',
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
      })
      .catch((err) => {
        toast({
          title: 'Erro',
          description:
            'Houve um problema, o recebimento da lista não foi excluído!',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      });
  };

  return (
    <Flex width='100%' flexDir='column' alignItems='center'>
      <MailListModal
        id={mailList.id}
        receivers={receivers}
        isOpen={isOpen}
        onClose={onClose}
      />
      <Flex
        flexDir='column'
        minH='30px'
        h='18vh'
        alignItems='center'
        justifyContent='center'
      >
        <Heading size='sm'>
          Lista dos Cadetes do dia {invertStringDate(mailList.created_at)}
        </Heading>
        <Flex flexDir='row' mt={3} alignItems='center'>
          {mailList.mailListReceivements[0] ? (
            <>
              <Flex flexDir='column'>
                {mailList.mailListReceivements.map(({ receiver }) => (
                  <Text key={receiver.id}>• {findReceiverName(receiver)}</Text>
                ))}
              </Flex>
              <Popover>
                <PopoverTrigger>
                  <Button
                    ml={3}
                    size='sm'
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
                    Isso irá apagar o recebimento desta lista!
                    <Button
                      bg='alertButton'
                      color='menuButtonText'
                      _hover={{ bg: 'alertButtonHover' }}
                      onClick={deleteReceivement}
                    >
                      Confirmar
                    </Button>
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            </>
          ) : (
            <>
              <PageButton onClick={onOpen}>Registrar Recebimento</PageButton>
              <Popover>
                <PopoverTrigger>
                  <Button
                    size='sm'
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
                      onClick={deleteMailList}
                    >
                      Confirmar
                    </Button>
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            </>
          )}
          <ReactToPrint
            trigger={() => (
              <Button
                w='min'
                boxShadow='lg'
                size='sm'
                rounded='md'
                bgColor='menuButton'
                _hover={{ bg: 'menuButtonHover' }}
                color='menuButtonText'
                marginInline='10px'
              >
                <BiPrinter size='20px' />
              </Button>
            )}
            content={() => componentRef.current}
          />
          <Box hidden={true}>
            <Box ref={componentRef}>
              <CadetList mails={mailList.mails} date={mailList.created_at} />
            </Box>
          </Box>
        </Flex>
      </Flex>
      <Flex flexDir='row' alignItems='center' h='82vh' width='100%'>
        <ReactTable tableOptions={tableOptions} />
      </Flex>
    </Flex>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { id } = context.query;
    const apiClient = getAPIClient(context);
    const userRes = await apiClient.get('/user/auth');
    const user = userRes.data;

    if (userRes.status > 299 || !user?.permission?.editMail)
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };

    const mailListPromise = apiClient.get(`mail-list/${id}`);
    const receiversPromise = apiClient.get('receiver');

    const [mailListRes, receiversRes] = await Promise.all([
      mailListPromise,
      receiversPromise,
    ]);
    const mailList: MailList[] = mailListRes.data;
    const receivers: (Staff | Cadet | WorkPlace)[] = receiversRes.data;

    return {
      props: { mailList, receivers },
    };
  } catch (error) {
    console.log(error);
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
};

export default ListaId;
