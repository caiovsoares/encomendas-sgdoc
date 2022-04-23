import React, { useState } from 'react';
import { Box, Flex, useDisclosure } from '@chakra-ui/react';
import { exampleMails, fakeReceivers } from '../utils';
import {
  useTable,
  usePagination,
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

const Destinatarios = ({ user, receivers }) => {
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

  function HandleRegisterManyItems() {
    onOpen();
    setModalType('registerMany');
  }

  const columns = React.useMemo(
    () => [
      {
        Header: 'Nome de Guerra',
        accessor: 'warName',
      },
      {
        Header: 'Nome Completo',
        accessor: 'fullName',
      },
      {
        Header: 'Identidade',
        accessor: 'identity',
      },
      {
        Header: 'CPF',
        accessor: 'cpf',
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

  const data = React.useMemo(() => receivers, []);

  const tableOptions = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    usePagination
  );

  return (
    <Flex width='100%' flexDir='column'>
      {/* <MailsModal
        isOpen={isOpen}
        onClose={onClose}
        mail={mail}
        type={modalType}
        user={user}
        receivers={receivers}
        receiveMails={getReceiveMails()}
        setModalType={setModalType}
      /> */}
      <Flex
        flexDir='row'
        minH='30px'
        h='7vh'
        alignItems='center'
        justifyContent='center'
      >
        <PageButton onClick={HandleRegisterItem}>Novo Cadastro</PageButton>
        <PageButton onClick={HandleRegisterItem}>Inserir Diversos</PageButton>
      </Flex>
      <Flex flexDir='row' alignItems='center' h='93vh' width='100%'>
        <ReactTable tableOptions={tableOptions} />
      </Flex>
    </Flex>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session || !session.user.permission.editReceiver)
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };

  const user = session.user;
  let receivers;

  if (process.env.ENVIRONMENT != 'DEV') {
    receivers = await (
      await axios.get(`${process.env.API_URL}/receivers/findAll/${user.id}`)
    ).data;
    `${process.env.API_URL}/receivers/findAll/${user.id}`;
  } else {
    receivers = fakeReceivers;
  }

  return {
    props: { user, receivers },
  };
}

export default Destinatarios;
