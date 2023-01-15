import React, { useRef } from 'react';
import {
  Box,
  Button,
  Flex,
  Heading,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
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
import { isBoolean } from 'util';
import { BiPrinter } from 'react-icons/bi';

type listaId = {
  mailList: MailList;
  receivers: (Staff | WorkPlace | Cadet)[];
};

const ListaId = ({ mailList, receivers }: listaId) => {
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
        h='15vh'
        alignItems='center'
        justifyContent='center'
      >
        <Heading>
          Lista dos Cadetes do dia {invertStringDate(mailList.created_at)}
        </Heading>
        <Box mt={3}>
          {mailList.mailListReceivements[0] ? (
            mailList.mailListReceivements.map(({ receiver }) => (
              <Text key={receiver.id}>• {findReceiverName(receiver)}</Text>
            ))
          ) : (
            <>
              <PageButton onClick={onOpen}>Registrar Recebimento</PageButton>
              <ReactToPrint
                trigger={() => (
                  <Button
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
                  <CadetList
                    mails={mailList.mails}
                    date={mailList.created_at}
                  />
                </Box>
              </Box>
            </>
          )}
        </Box>
      </Flex>
      <Flex flexDir='row' alignItems='center' h='85vh' width='100%'>
        <ReactTable tableOptions={tableOptions} />
      </Flex>
    </Flex>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
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
};

export default ListaId;
