import React from 'react';
import { Box, Button, Flex } from '@chakra-ui/react';
import { exampleMails } from '../utils';
import ReactTable from '../components/ReactTable';
import {
  useTable,
  useGlobalFilter,
  usePagination,
  useRowSelect,
} from 'react-table';
import { GetStaticProps } from 'next';
import { BiCheckCircle, BiXCircle } from 'react-icons/bi';
import axios from 'axios';

const Index = (props) => {
  const columns = React.useMemo(
    () => [
      { Header: 'Rastreio', accessor: 'tracking' },
      { Header: 'Remetente', accessor: 'sender' },
      { Header: 'Destinatário', accessor: 'destiny.warName' },
      { Header: 'Chegada', accessor: 'created_at' },
      {
        Header: 'Recebido',
        accessor: 'receiver.warName',
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
    usePagination,
    useRowSelect
  );

  return <ReactTable tableOptions={tableOptions} />;
};

export const getStaticProps: GetStaticProps = async (context) => {
  let mails;

  if (process.env.ENVIRONMENT != 'DEV') {
    mails = await (await axios.get(`${process.env.API_URL}/mails/`)).data;
  } else {
    mails = exampleMails(100);
  }

  return {
    props: { mails },
    revalidate: 1800,
  };
};

export default Index;
