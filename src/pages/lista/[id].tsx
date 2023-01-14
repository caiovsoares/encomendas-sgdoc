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
import { Mail } from '../../interfaces';
import { findReceiverName, invertStringDate } from '../../utils';
import { MailList } from '../../interfaces';
import ReactToPrint from 'react-to-print';
import { CadetList } from '../../components/CadetList';

type listaId = {
  mailList: MailList;
};

const ListaId = ({ mailList }: listaId) => {
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
              <Text>• {findReceiverName(receiver)}</Text>
            ))
          ) : (
            <>
              <PageButton onClick={null}>Registrar Recebimento</PageButton>
              <ReactToPrint
                trigger={() => <Button>Imprimir</Button>}
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

  const mailList: MailList = await (
    await apiClient.get(`mail-list/${id}`)
  ).data;
  return {
    props: { mailList },
  };
};

export default ListaId;
