import React, { useState } from 'react';
import { Flex, useDisclosure, useToast } from '@chakra-ui/react';
import { fakeReceivers } from '../utils';
import { useTable, usePagination, useGlobalFilter } from 'react-table';
import ReactTable from '../components/ReactTable';
import { PageButton } from '../components/PageButton';
import { BiInfoCircle } from 'react-icons/bi';
import axios from 'axios';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import ReceiversModal from '../components/ReceiversModal';

const Destinatarios = ({ user, receivers }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [receiver, setReceiver] = useState({});
  const [modalType, setModalType] = useState('');
  const router = useRouter();
  const toast = useToast();

  async function HandleDetailItem(receiver: {}) {
    onOpen();
    setReceiver(receiver);
    setModalType('detail');
  }

  function HandleRegisterItem() {
    onOpen();
    setModalType('register');
  }

  function HandleRegisterManyItems() {
    toast({
      title: 'Informação',
      description: 'Esta funcionalidade ainda será desenvolvida',
      status: 'info',
      duration: 3000,
      isClosable: true,
    });
    // onOpen();
    // setModalType('registerMany');
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
                  console.log(value);
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
      data: receivers,
    },
    useGlobalFilter,
    usePagination
  );

  return (
    <Flex width='100%' flexDir='column'>
      <ReceiversModal
        isOpen={isOpen}
        onClose={onClose}
        receiver={receiver}
        type={modalType}
        user={user}
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
        <PageButton onClick={HandleRegisterManyItems}>
          Inserir Diversos
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
