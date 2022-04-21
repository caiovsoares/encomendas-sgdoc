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
import { PageButton } from '../components/PageButton';
import { BiCheckCircle, BiXCircle } from 'react-icons/bi';

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

  return (
    <Flex width='100%' flexDir='column'>
      <Flex
        flexDir='row'
        minH='30px'
        h='7vh'
        alignItems='center'
        justifyContent='center'
      >
        <PageButton onClick={() => {}}>Buscar</PageButton>
      </Flex>
      <Flex flexDir='row' alignItems='center' h='93vh' width='100%'>
        <ReactTable tableOptions={tableOptions} />
      </Flex>
    </Flex>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const mails = exampleMails(100);

  return {
    props: { mails },
    revalidate: 1800,
  };
};

export default Index;
