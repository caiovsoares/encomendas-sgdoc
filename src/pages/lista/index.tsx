import React from 'react';
import { Box, Flex, useDisclosure } from '@chakra-ui/react';
import {
  useTable,
  usePagination,
  useSortBy,
  useGlobalFilter,
} from 'react-table';
import ReactTable from '../../components/ReactTable';
import { BiNavigation } from 'react-icons/bi';
import { useRouter } from 'next/router';
import { SearchButton } from '../../components/SearchButton';
import { getAPIClient } from '../../services/apiClient';
import { GetServerSideProps } from 'next';
import { MailList } from '../../interfaces';
import { findReceiverName, invertStringDate } from '../../utils';
import Link from 'next/link';

type listaProps = {
  mailLists: MailList[];
};

const Lista = ({ mailLists }: listaProps) => {
  const router = useRouter();

  const columns = React.useMemo(
    () => [
      {
        Header: 'Dia',
        accessor: (mailList: MailList) => invertStringDate(mailList.created_at),
      },
      {
        Header: 'Recebido',
        accessor: (mailList: MailList) =>
          findReceiverName(mailList.mailListReceivements[0]?.receiver),
        id: 'destiny',
      },
      {
        Header: 'Em',
        accessor: (mailList: MailList) =>
          invertStringDate(mailList.mailListReceivements[0]?.received_at),
        id: 'created_at',
      },
      {
        Header: 'Ver Lista',
        accessor: (mailList: MailList) => mailList.id,
        Cell: ({ cell: { value: id } }) => {
          return (
            <Flex alignItems='center' h='20px'>
              <Link href={`/lista/${id}`}>
                <Box _hover={{ color: 'menuButtonHover' }}>
                  <BiNavigation size='30px' />
                </Box>
              </Link>
            </Flex>
          );
        },
      },
    ],
    []
  );

  const tableOptions = useTable(
    {
      columns,
      data: mailLists,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
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
        <SearchButton href={`${router.basePath}${router.pathname}`}>
          Buscar
        </SearchButton>
      </Flex>
      <Flex flexDir='row' alignItems='center' h='93vh' width='100%'>
        <ReactTable tableOptions={tableOptions} />
      </Flex>
    </Flex>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { from, to } = context.query;
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

    const mailLists = await (
      await apiClient.get('mail-list', { data: { from, to } })
    ).data;

    return {
      props: { mailLists },
    };
  } catch (error) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
};

export default Lista;
