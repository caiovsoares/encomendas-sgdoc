import React, { useState } from 'react';
import { Box, Flex, useDisclosure } from '@chakra-ui/react';
import { correctDate, findReceiverData } from '../utils';
import {
  useTable,
  usePagination,
  useSortBy,
  useRowSelect,
  useGlobalFilter,
} from 'react-table';
import ReactTable from '../components/ReactTable';
import { PageButton } from '../components/PageButton';
import { BiCheckCircle, BiInfoCircle, BiXCircle } from 'react-icons/bi';
import MailsModal from '../components/MailsModal';
import { useRouter } from 'next/router';
import IndeterminateCheckbox from '../components/IndeterminateCheckbox';
import { SearchButton } from '../components/SearchButton';
import { getAPIClient } from '../services/apiClient';
import { GetServerSideProps } from 'next';
import { Mail, Cadet, WorkPlace, Staff, User } from '../interfaces';

type encomendasProps = {
  mails: Mail[];
  receivers: (Staff | Cadet | WorkPlace)[];
};

const Encomendas = ({ mails, receivers }: encomendasProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [mail, setMail] = useState<Mail>();
  const [modalType, setModalType] = useState('');
  const router = useRouter();

  function HandleDetailItem(mail: Mail) {
    onOpen();
    setMail(mail);
    setModalType('detail');
  }

  function HandleRegisterItem() {
    onOpen();
    setModalType('register');
  }

  function HandleReceiveItens(mail: Mail) {
    onOpen();
    setMail(mail);
    setModalType('receive');
  }

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
      {
        Header: ' ',
        accessor: (row) => row,
        Cell: ({ cell: { value } }) => {
          return (
            <Flex alignItems='center' h='20px'>
              <BiInfoCircle
                size='30px'
                onClick={() => {
                  HandleDetailItem(value);
                }}
              />
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
      data: mails,
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        // Let's make a column for selection
        {
          id: 'selection',
          // The header can use the table's getToggleAllRowsSelectedProps method
          // to render a checkbox
          Header: ({ getToggleAllPageRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllPageRowsSelectedProps()} />
            </div>
          ),
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          Cell: ({ row }) =>
            !row.original.receiver && (
              <div>
                <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
              </div>
            ),
        },
        ...columns,
      ]);
    }
  );

  const getReceiveMails = () => {
    const ReceiveMails: Mail[] = tableOptions.selectedFlatRows
      .filter((e) => !e.original.receiver)
      .map((e) => e.original);
    return ReceiveMails;
  };

  return (
    <Flex width='100%' flexDir='column'>
      <MailsModal
        isOpen={isOpen}
        onClose={onClose}
        mail={mail}
        type={modalType}
        receivers={receivers}
        receiveMails={getReceiveMails()}
        setModalType={setModalType}
      />
      <Flex
        flexDir='row'
        minH='30px'
        h='7vh'
        alignItems='center'
        justifyContent='center'
      >
        <PageButton onClick={HandleRegisterItem}>Novo Cadastro</PageButton>
        <SearchButton href={`${router.basePath}${router.pathname}`}>
          Buscar
        </SearchButton>
        <PageButton onClick={HandleReceiveItens}>
          Registrar Recebimento
        </PageButton>
      </Flex>
      <Flex flexDir='row' alignItems='center' h='93vh' width='100%'>
        <ReactTable tableOptions={tableOptions} />
      </Flex>
    </Flex>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const from = context.query.from;
  const to = context.query.to;
  const apiClient = getAPIClient(context);
  const user: User = await (await apiClient.get('/user/auth')).data;

  if (!user?.permission?.editMail)
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };

  const mails: Mail[] = await (
    await apiClient.post('mail', { data: { from, to } })
  ).data;
  const receivers: (Staff | Cadet | WorkPlace)[] = await (
    await apiClient.get('receiver')
  ).data;

  return {
    props: { mails, receivers },
  };
};

export default Encomendas;
