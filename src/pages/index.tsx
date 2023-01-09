import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { correctDate, findReceiverName } from '../utils';
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
import { PublicMail } from '../@types';

const Index = (props) => {
  const columns = React.useMemo(
    () => [
      { Header: 'Rastreio', accessor: 'tracking' },
      { Header: 'Remetente', accessor: 'sender' },
      { Header: 'Destinatário', accessor: 'destiny' },
      { Header: 'Chegada', accessor: 'created_at' },
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
      { Header: 'Em', accessor: 'received_at' },
    ],
    []
  );

  const data = React.useMemo(() => props.mails, []);

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
  const data = await (await apiClient.get('')).data;
  const mails: PublicMail[] = [];
  for (const element of data) {
    mails.push({
      tracking: element.tracking,
      sender: element.sender,
      created_at: correctDate(element.created_at),
      destiny: findReceiverName(element.destiny),
      received_at: correctDate(element.received_at),
      receiver: element.receiver ? findReceiverName(element.receiver) : null,
    });
  }

  return {
    props: { mails },
    revalidate: 1800,
  };
};

export default Index;
