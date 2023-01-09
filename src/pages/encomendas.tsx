import React, { useState } from 'react';
import { Box, Flex, useDisclosure } from '@chakra-ui/react';
import {
  correctDate,
  correctMail,
  findCadetName,
  findReceiverData,
  findReceiverName,
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
import { useRouter } from 'next/router';
import IndeterminateCheckbox from '../components/IndeterminateCheckbox';
import { SearchButton } from '../components/SearchButton';
import { getAPIClient } from '../services/apiClient';
import { GetServerSideProps } from 'next';
import { Cadet, Mail, Staff, WorkPlace } from '../@types';

const Encomendas = ({ mails, user, cadets, workPlaces, staffs }) => {
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
        cadets={cadets}
        staffs={staffs}
        workPlaces={workPlaces}
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
  const apiClient = getAPIClient(context);
  let user = null;
  try {
    user = await (await apiClient.get('/user/auth')).data;
  } catch (error) {}

  if (!user?.permission.editMail)
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };

  const from = context.query.from;
  const to = context.query.to;

  const mailsData =
    from && to
      ? await (
          await apiClient.get('mail/range', { data: { from, to } })
        ).data
      : await (
          await apiClient.get('mail')
        ).data;

  const cadetsData = await (await apiClient.get('cadet')).data;
  const workPlacesData = await (await apiClient.get('work-place')).data;
  const staffsData = await (await apiClient.get('staff')).data;

  const mails: Mail[] = [];
  const cadets: Cadet[] = [];
  const workPlaces: WorkPlace[] = [];
  const staffs: Staff[] = [];

  for (const mail of mailsData) {
    mails.push({
      id: mail.id,
      tracking: mail.tracking,
      sender: mail.sender,
      destiny: findReceiverData(mail.destiny),
      created_at: correctDate(mail.created_at),
      receiver: mail.receiver ? findReceiverData(mail.receiver) : null,
      received_at: correctDate(mail.received_at),
      details: mail.details,
    });
  }

  for (const cadet of cadetsData) {
    cadets.push({
      id: cadet.id,
      warName: findCadetName(cadet),
      fullName: cadet.person.fullName,
      cpf: cadet.person.cpf,
      identity: cadet.person.identity,
      classYear: cadet.classYear,
    });
  }

  for (const workPlace of workPlacesData) {
    workPlaces.push({
      abbreviation: workPlace.abbreviation,
      id: workPlace.id,
      name: workPlace.name,
    });
  }

  for (const staff of staffsData) {
    staffs.push({
      id: staff.id,
      warName: `${staff.rank} ${staff.warName}`,
      fullName: staff.person.fullName,
      cpf: staff.person.cpf,
      identity: staff.person.identity,
      rank: staff.rank,
    });
  }

  return {
    props: { mails, user, cadets, workPlaces, staffs },
  };
};

export default Encomendas;
