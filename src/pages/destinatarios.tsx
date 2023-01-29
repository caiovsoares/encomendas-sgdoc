import React, { useState } from 'react';
import { Flex, useDisclosure, useToast } from '@chakra-ui/react';
import { findReceiverName, findReceiverShortName } from '../utils';
import {
  useTable,
  useSortBy,
  usePagination,
  useGlobalFilter,
} from 'react-table';
import ReactTable from '../components/ReactTable';
import { PageButton } from '../components/PageButton';
import { BiInfoCircle } from 'react-icons/bi';
import { useRouter } from 'next/router';
import ReceiversModal from '../components/ReceiversModal';
import { Cadet, Staff, User, WorkPlace } from '../interfaces';
import { getAPIClient } from '../services/apiClient';

type DestinatariosProps = {
  receivers: (Staff | Cadet | WorkPlace)[];
};

const Destinatarios = ({ receivers }: DestinatariosProps) => {
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
    onOpen();
    setModalType('registerMany');
  }

  const columns = React.useMemo(
    () => [
      {
        Header: 'Nome de Guerra',
        accessor: (receiver) => findReceiverShortName(receiver),
      },
      {
        Header: 'Nome Completo',
        accessor: (receiver) => findReceiverName(receiver),
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

  const tableOptions = useTable(
    {
      columns,
      data: receivers,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  return (
    <Flex width='100%' flexDir='column'>
      <ReceiversModal
        isOpen={isOpen}
        onClose={onClose}
        receiver={receiver}
        type={modalType}
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
  const apiClient = getAPIClient(context);
  const userRes = await apiClient.get('/user/auth');
  const user: User = userRes.data;

  if (userRes.status > 299 || !user?.permission?.editReceiver)
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };

  const receivers: (Staff | Cadet | WorkPlace)[] = await (
    await apiClient.get('receiver')
  ).data;

  return {
    props: { receivers },
  };
}

export default Destinatarios;
