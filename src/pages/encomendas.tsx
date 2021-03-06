import React, { useState } from 'react';
import { Box, Flex, useDisclosure } from '@chakra-ui/react';
import {
  correctDate,
  correctMail,
  exampleMails,
  exampleReceivers,
} from '../utils';
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
import axios from 'axios';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import IndeterminateCheckbox from '../components/IndeterminateCheckbox';
import { SearchButton } from '../components/SearchButton';

const Encomendas = ({ mails, user, receivers }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [mail, setMail] = useState({});
  const [modalType, setModalType] = useState('');
  const router = useRouter();

  async function HandleDetailItem(mail: {}) {
    onOpen();
    setMail(mail);
    setModalType('detail');
  }

  function HandleRegisterItem() {
    onOpen();
    setModalType('register');
  }

  function HandleReceiveItens(mail: {}) {
    onOpen();
    setMail(mail);
    setModalType('receive');
  }

  function HandleSearchItens(mail: {}) {
    onOpen();
    setMail(mail);
    setModalType('search');
  }

  const columns = React.useMemo(
    () => [
      {
        Header: 'Rastreio',
        accessor: 'tracking',
      },
      {
        Header: 'Remetente',
        accessor: 'sender',
      },
      {
        Header: 'Destinatário',
        accessor: 'destiny.warName',
      },
      {
        Header: 'Chegada',
        accessor: 'created_at',
        Cell: ({ cell: { value } }) => correctDate(value),
      },
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

  //const data = React.useMemo(() => mails, []);

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

  const getReceiveMails = () =>
    tableOptions.selectedFlatRows
      .filter((e) => !e.original.receiver)
      .map((e) => e.original);

  return (
    <Flex width='100%' flexDir='column'>
      <MailsModal
        isOpen={isOpen}
        onClose={onClose}
        mail={mail}
        type={modalType}
        user={user}
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

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session || !session.user.permission.editMail)
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };

  const user = session.user;
  let receivers;
  let mails;
  const fromDate = context.query.from;
  const toDate = context.query.to;

  console.log('Buscando encomendas de: ');
  console.log(fromDate);
  console.log('Até: ');
  console.log(toDate);

  if (process.env.ENVIRONMENT != 'DEV') {
    mails = await (
      await axios.get(
        `${process.env.API_URL}/mails/findAll?userId=${session.user.id}&from=${fromDate}&to=${toDate}`
      )
    ).data;
    receivers = await (
      await axios.get(`${process.env.API_URL}/receivers/findAll/${user.id}`)
    ).data;
  } else {
    mails = exampleMails(300);
    receivers = exampleReceivers(50);
  }

  mails.forEach(correctMail);

  return {
    props: { mails, user, receivers },
  };
}

export default Encomendas;
