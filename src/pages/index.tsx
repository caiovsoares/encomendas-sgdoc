import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { invertStringDate } from '../utils';
import ReactTable from '../components/ReactTable';
import {
  useTable,
  useGlobalFilter,
  usePagination,
  useRowSelect,
  useSortBy,
} from 'react-table';
import { GetStaticProps } from 'next';
import { BiCheckCircle, BiXCircle } from 'react-icons/bi';
import { getAPIClient } from '../services/apiClient';
import { PublicMail } from '../interfaces';

type indexProps = {
  mails: PublicMail[];
};

const Index = ({ mails }: indexProps) => {
  const columns = React.useMemo(
    () => [
      { Header: 'Rastreio', accessor: 'tracking' },
      { Header: 'Remetente', accessor: 'sender' },
      { Header: 'Destinatário', accessor: 'destiny' },
      {
        Header: 'Chegada',
        accessor: (mail: PublicMail) => invertStringDate(mail.created_at),
        id: 'created_at',
      },
      {
        Header: 'Recebido',
        accessor: 'receiver',
        Cell: ({ cell: { value } }) => {
          return (
            <>
              {value ? (
                <Flex flexDir='row'>
                  <Box mr='5px' flexDir='row'>
                    <BiCheckCircle color='green' size='20px' />
                  </Box>
                  {String(value)}
                </Flex>
              ) : (
                <Box mr='5px'>
                  <BiXCircle color='red' size='20px' />
                </Box>
              )}
            </>
          );
        },
      },
      {
        Header: 'Em',
        accessor: (mail: PublicMail) => invertStringDate(mail.received_at),
        id: 'received_at',
      },
    ],
    []
  );

  const data = React.useMemo(() => mails, []);

  const tableOptions = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect
  );

  return <ReactTable tableOptions={tableOptions} />;
};

export const getStaticProps: GetStaticProps = async (context) => {
  const apiClient = getAPIClient(context);

  const mails: PublicMail[] = await (await apiClient.get('')).data;

  return {
    props: { mails },
    revalidate: 1800,
  };
};

export default Index;
