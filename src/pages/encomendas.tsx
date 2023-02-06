import React, { useState } from 'react';
import { Box, Flex, useDisclosure } from '@chakra-ui/react';
import {
  useTable,
  usePagination,
  useSortBy,
  useRowSelect,
  useGlobalFilter,
} from 'react-table';
import ReactTable from '../components/ReactTable';
import { PageButton } from '../components/PageButton';
import {
  BiCheckCircle,
  BiError,
  BiInfoCircle,
  BiXCircle,
} from 'react-icons/bi';
import MailsModal from '../components/MailsModal';
import { useRouter } from 'next/router';
import IndeterminateCheckbox from '../components/IndeterminateCheckbox';
import { SearchButton } from '../components/SearchButton';
import { getAPIClient } from '../services/apiClient';
import { GetServerSideProps } from 'next';
import { Mail, Cadet, WorkPlace, Staff } from '../interfaces';
import {
  findReceiverName,
  findReceiverShortName,
  invertStringDate,
} from '../utils';

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

  function HandleReceiveItens() {
    if (getReceiveMails().length > 0) onOpen();
    setModalType('receive');
  }

  const columns = React.useMemo(
    () => [
      { Header: 'Rastreio', accessor: 'tracking' },
      { Header: 'Remetente', accessor: 'sender' },
      {
        Header: 'Destinatário',
        accessor: (mail: Mail) => findReceiverName(mail.destiny),
        id: 'destiny',
      },
      {
        Header: 'Chegada',
        accessor: (mail: Mail) => invertStringDate(mail.created_at),
        id: 'created_at',
      },
      {
        Header: 'Recebido',
        accessor: (mail: Mail) =>
          mail.mailListDate
            ? `Lista de ${invertStringDate(mail.mailListDate)}`
            : findReceiverShortName(mail.receiver[0]),
        id: 'receiver',
        Cell: ({
          cell: {
            row: { original },
          },
        }) => {
          return (
            <>
              {original?.receiver[0] ? (
                <Flex flexDir='row'>
                  <Box mr='5px' flexDir='row'>
                    <BiCheckCircle color='green' size='20px' />
                  </Box>
                  {findReceiverShortName(original.receiver[0])}
                </Flex>
              ) : original?.mailListDate ? (
                <Flex flexDir='row'>
                  <Box mr='5px' flexDir='row'>
                    <BiError color='orange' size='20px' />
                  </Box>
                  {`Lista de ${invertStringDate(original.mailListDate)}`}
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
        {
          id: 'selection',
          Header: ({ getToggleAllPageRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllPageRowsSelectedProps()} />
            </div>
          ),
          Cell: ({ row }) =>
            !row.original.receiver[0] &&
            !row.original.mailListDate && (
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
      .map((e) => e.original)
      .filter((e) => !e.receiver[0])
      .filter((e: Mail) => !e.mailListDate);
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

    const mailsPromise = apiClient.get('mail', { data: { from, to } });
    const receiversPromise = apiClient.get('receiver');

    const [mailsRes, receiversRes] = await Promise.all([
      mailsPromise,
      receiversPromise,
    ]);
    const mails: Mail[] = mailsRes.data;
    const receivers: (Staff | Cadet | WorkPlace)[] = receiversRes.data;
    return {
      props: { mails, receivers },
    };
  } catch (error) {
    console.log(error);
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
};

export default Encomendas;
