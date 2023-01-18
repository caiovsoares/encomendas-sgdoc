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
              {original?.receiver ? (
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
            !row.original.receiver &&
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
      .filter((e) => !e.receiver)
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
  // const { from, to } = context.query;
  // const apiClient = getAPIClient(context);
  // const userRes = await apiClient.get('/user/auth');
  // const user = userRes.data;

  // if (userRes.status > 299 || !user?.permission?.editMail)
  //   return {
  //     redirect: {
  //       destination: '/',
  //       permanent: false,
  //     },
  //   };

  // const mailsPromise = apiClient.get('mail', { data: { from, to } });
  // const receiversPromise = apiClient.get('receiver');

  // const [mailsRes, receiversRes] = await Promise.all([
  //   mailsPromise,
  //   receiversPromise,
  // ]);
  // const mails: Mail[] = mailsRes.data;
  // const receivers: (Staff | Cadet | WorkPlace)[] = receiversRes.data;
  const mails = [
    {
      id: '610db15d-0aae-4410-9db3-971f63bde5da',
      tracking: 'BR190294857BR',
      sender: 'Amazon',
      created_at: '2023/01/17',
      destiny: {
        id: 'a027b6ba-76b2-4e76-b490-0bef6b7e8ad5',
        fullName: 'RENAN PENNER SOUTELINO',
        warName: 'RENAN',
        cpf: '78452524790',
        identity: '83298670',
        classYear: 2020,
      },
      receiver: [null],
      details: null,
    },
    {
      id: 'dea052d9-1c24-4c2f-bd35-1a359d0cddaf',
      tracking: 'JC1198543019CH',
      sender: 'China',
      created_at: '2023/01/17',
      destiny: {
        id: '230f6154-0455-4f33-8ff1-711a5cdc0e5d',
        fullName: 'LUCCA DA CRUZ PARISI',
        warName: 'PARISI',
        cpf: '7007254911',
        identity: '69448006',
        classYear: 2020,
      },
      receiver: [null],
      details: null,
    },
    {
      id: '545944bd-c92a-4a73-a487-4c0ca2488f86',
      tracking: 'BR192049581BR',
      sender: 'Juliana',
      created_at: '2023/01/17',
      destiny: {
        id: '3d56c99e-d3c4-4135-8adb-15b42db94c63',
        fullName: 'MATHEUS COELHO SALOMAO',
        warName: 'SALOMAO',
        cpf: '58673146715',
        identity: '63535542',
        classYear: 2020,
      },
      receiver: [
        {
          id: '70c0dfce-0ad3-4a33-af1b-3f7df9cb6fd7',
          fullName: 'HENRIQUE BEFFART SEHN',
          warName: 'SEHN',
          cpf: '71308317856',
          identity: '4445173',
          classYear: 2020,
        },
        {
          id: 'cd9696ba-2adb-40c5-8bd4-3a44322581e7',
          fullName: 'MATHEUS ERNESTO MARTINS DE PAULA',
          warName: 'MARTINS',
          cpf: '16737468131',
          identity: '67087979',
          classYear: 2020,
        },
      ],
      details: 'Produto Frágil',
      mailListDate: '2023/01/17',
    },
    {
      id: '4f6b55b1-a326-4bb7-949b-8123dfee7c53',
      tracking: 'QB109284857BR',
      sender: 'Mercado Livre',
      created_at: '2023/01/17',
      destiny: {
        id: 'ec65a06f-0ec5-4902-bca7-ae540021974a',
        fullName: 'GUIBSON HUGO DA SILVA LOURENCO',
        warName: 'LOURENCO',
        cpf: '38063445523',
        identity: '68843401',
        classYear: 2020,
      },
      receiver: [
        {
          id: '70c0dfce-0ad3-4a33-af1b-3f7df9cb6fd7',
          fullName: 'HENRIQUE BEFFART SEHN',
          warName: 'SEHN',
          cpf: '71308317856',
          identity: '4445173',
          classYear: 2020,
        },
        {
          id: 'cd9696ba-2adb-40c5-8bd4-3a44322581e7',
          fullName: 'MATHEUS ERNESTO MARTINS DE PAULA',
          warName: 'MARTINS',
          cpf: '16737468131',
          identity: '67087979',
          classYear: 2020,
        },
      ],
      details: null,
      mailListDate: '2023/01/17',
    },
    {
      id: '78ad7f4a-32fb-4b1b-84c6-6ff2bbadeaff',
      tracking: 'JH1192765019BR',
      sender: 'TJSP',
      created_at: '2023/01/17',
      destiny: {
        id: '5e7e81da-88b1-4e0b-94b5-9c0dad3d586c',
        fullName: 'THIAGO FELIPE BOMBARDIERI FERREIRA',
        warName: 'BOMBARDIERI',
        cpf: '55616085008',
        identity: '82578804',
        classYear: 2020,
      },
      receiver: [],
      details: null,
      mailListDate: '2023/01/17',
    },
    {
      id: '41d358b4-d2b4-4191-89e0-264a275472fd',
      tracking: 'QB493847209BR',
      sender: 'Mercado Livre',
      created_at: '2023/01/17',
      destiny: {
        id: 'cd9696ba-2adb-40c5-8bd4-3a44322581e7',
        fullName: 'MATHEUS ERNESTO MARTINS DE PAULA',
        warName: 'MARTINS',
        cpf: '16737468131',
        identity: '67087979',
        classYear: 2020,
      },
      receiver: [null],
      details: 'Uma caixa muito bonita',
    },
    {
      id: 'fb6cd26e-de91-44a0-88bc-a571474ef63f',
      tracking: 'TX6945278345CH',
      sender: 'China',
      created_at: '2023/01/17',
      destiny: {
        id: '2b5950f7-b683-4cb2-aca8-543e58001c35',
        fullName: 'GABRIEL MAX DE ASSIS PEREIRA',
        warName: 'MAX',
        cpf: '97747687716',
        identity: '96734008',
        classYear: 2020,
      },
      receiver: [],
      details: null,
      mailListDate: '2023/01/17',
    },
    {
      id: 'd7f02b7f-2db9-4d1a-9bde-d92cb933ebb6',
      tracking: 'QB845654981BR',
      sender: 'Maria Eduarda',
      created_at: '2023/01/17',
      destiny: {
        id: 'ecd2894a-ef1c-47ea-98b2-2d73abc940ab',
        fullName: 'ADENILSO MARCOS ROSALEM JUNIOR',
        warName: 'ROSALEM',
        cpf: '7617098936',
        identity: '64521505',
        classYear: 2020,
      },
      receiver: [null],
      details: 'A caixa veio com pequenas avarias',
    },
    {
      id: '1b3123ab-532a-4796-a2f1-5c1bd928b140',
      tracking: 'BR456456456BR',
      sender: 'Dr. Jones',
      created_at: '2023/01/17',
      destiny: {
        id: '144e7aa3-0c17-46fe-afaa-c1c7f4668dde',
        fullName: 'KLEYBER AUGUSTO PEDROTTI',
        warName: 'KLEYBER',
        cpf: '67844356410',
        identity: '47261446',
        classYear: 2020,
      },
      receiver: [],
      details: null,
      mailListDate: '2023/01/17',
    },
    {
      id: '521ee519-9cc8-4e2a-ae88-8ba70115d4a2',
      tracking: 'BR123123123BR',
      sender: 'Growth Supplements',
      created_at: '2023/01/17',
      destiny: {
        id: '70c0dfce-0ad3-4a33-af1b-3f7df9cb6fd7',
        fullName: 'HENRIQUE BEFFART SEHN',
        warName: 'SEHN',
        cpf: '71308317856',
        identity: '4445173',
        classYear: 2020,
      },
      receiver: [null],
      details: null,
    },
  ];
  const receivers = [
    {
      id: 'd50c7597-b810-439f-ba9a-131ddca89597',
      name: 'Seção de Gestão Documental',
      abbreviation: 'SGDOC',
    },
    {
      id: '289c76c1-9036-4d1e-89c6-e72faf417420',
      name: 'Seção de Assistência a Veteranos e Pensionistas',
      abbreviation: 'SAVP-41',
    },
    {
      id: '597fb87e-88dc-481c-be50-95ff71cde04f',
      name: 'Grupamento de Saúde de Pirassununga',
      abbreviation: 'GSAU-YS',
    },
    {
      id: 'a42fbddf-bb96-4249-8d4b-3251f14b4a79',
      name: 'Fazenda da Aeronáutica de Pirassununga',
      abbreviation: 'FAYS',
    },
    {
      id: 'fb45ff98-6a04-46b1-a09a-4296bbbc8536',
      name: 'Prefeitura da Aeronáutica de Pirassununga',
      abbreviation: 'PAYS',
    },
    {
      id: '6fe0c41e-028e-4844-8d6a-db1f08351959',
      name: 'Esquadrão de Demonstração Aérea',
      abbreviation: 'EDA',
    },
    {
      id: '16ccc555-e4b0-439a-908d-dcfc319e4fd7',
      name: 'Destacamento de Controle do Espaço Aéreo de Pirassununga',
      abbreviation: 'DTCEA-YS',
    },
    {
      id: '70c0dfce-0ad3-4a33-af1b-3f7df9cb6fd7',
      fullName: 'HENRIQUE BEFFART SEHN',
      warName: 'SEHN',
      identity: '4445173',
      cpf: '71308317856',
      classYear: 2020,
    },
    {
      id: 'cd9696ba-2adb-40c5-8bd4-3a44322581e7',
      fullName: 'MATHEUS ERNESTO MARTINS DE PAULA',
      warName: 'MARTINS',
      identity: '67087979',
      cpf: '16737468131',
      classYear: 2020,
    },
    {
      id: 'ecd2894a-ef1c-47ea-98b2-2d73abc940ab',
      fullName: 'ADENILSO MARCOS ROSALEM JUNIOR',
      warName: 'ROSALEM',
      identity: '64521505',
      cpf: '7617098936',
      classYear: 2020,
    },
    {
      id: '144e7aa3-0c17-46fe-afaa-c1c7f4668dde',
      fullName: 'KLEYBER AUGUSTO PEDROTTI',
      warName: 'KLEYBER',
      identity: '47261446',
      cpf: '67844356410',
      classYear: 2020,
    },
    {
      id: '5e7e81da-88b1-4e0b-94b5-9c0dad3d586c',
      fullName: 'THIAGO FELIPE BOMBARDIERI FERREIRA',
      warName: 'BOMBARDIERI',
      identity: '82578804',
      cpf: '55616085008',
      classYear: 2020,
    },
    {
      id: 'ec65a06f-0ec5-4902-bca7-ae540021974a',
      fullName: 'GUIBSON HUGO DA SILVA LOURENCO',
      warName: 'LOURENCO',
      identity: '68843401',
      cpf: '38063445523',
      classYear: 2020,
    },
    {
      id: '3d56c99e-d3c4-4135-8adb-15b42db94c63',
      fullName: 'MATHEUS COELHO SALOMAO',
      warName: 'SALOMAO',
      identity: '63535542',
      cpf: '58673146715',
      classYear: 2020,
    },
    {
      id: '230f6154-0455-4f33-8ff1-711a5cdc0e5d',
      fullName: 'LUCCA DA CRUZ PARISI',
      warName: 'PARISI',
      identity: '69448006',
      cpf: '7007254911',
      classYear: 2020,
    },
    {
      id: '2b5950f7-b683-4cb2-aca8-543e58001c35',
      fullName: 'GABRIEL MAX DE ASSIS PEREIRA',
      warName: 'MAX',
      identity: '96734008',
      cpf: '97747687716',
      classYear: 2020,
    },
    {
      id: 'a027b6ba-76b2-4e76-b490-0bef6b7e8ad5',
      fullName: 'RENAN PENNER SOUTELINO',
      warName: 'RENAN',
      identity: '83298670',
      cpf: '78452524790',
      classYear: 2020,
    },
    {
      id: 'b1240bde-c642-42e1-af65-6a4900e2e329',
      fullName: 'GUSTAVO MONTEIRO DOS SANTOS ROJAS',
      warName: 'ROJAS',
      identity: '28229141',
      cpf: '40714901212',
      classYear: 2020,
    },
    {
      id: 'f6edac98-3be3-441a-b062-9c869ac0b283',
      fullName: 'GIANLUCA CASTILHO DE CASTRO',
      warName: 'GIANLUCA',
      identity: '27371679',
      cpf: '86947274158',
      classYear: 2020,
    },
    {
      id: 'f98b01df-5409-49ac-aa3e-3ff8136d3df5',
      fullName: 'PEDRO HENRIQUE NATALLI',
      warName: 'NATALLI',
      identity: '61413840',
      cpf: '62157750483',
      classYear: 2020,
    },
    {
      id: '3c3563e5-28ba-45f8-8c2d-c13e4243454a',
      fullName: 'ISABELLA ALMEIDA BERNARDES',
      warName: 'ISABELLA',
      identity: '46190181',
      cpf: '66819759140',
      classYear: 2020,
    },
    {
      id: '0c2e2433-9a29-48e8-8c5a-5ea70a79b3f6',
      fullName: 'LUIS EDUARDO DA SILVA SANTOS',
      warName: 'SANTOS',
      identity: '1329643',
      cpf: '97008969141',
      classYear: 2020,
    },
    {
      id: '39ed0067-b09b-40f3-9935-8e5ee028e6f7',
      fullName: 'MATHEUS ALEXANDRE QUERINO PEREIRA',
      warName: 'MATHEUS',
      identity: '38699701',
      cpf: '12926064160',
      classYear: 2021,
    },
    {
      id: '767c59df-396c-4991-ad12-034becdf1ca5',
      fullName: 'MATHEUS ALVES ROLLIN',
      warName: 'ROLLIN',
      identity: '72740876',
      cpf: '21728449576',
      classYear: 2021,
    },
    {
      id: 'd8d784bf-7076-480a-90d5-46c7301e8092',
      fullName: 'HUGO HENRIQUE PEREIRA BARBOSA',
      warName: 'BARBOSA',
      identity: '33789585',
      cpf: '24907096588',
      classYear: 2021,
    },
    {
      id: 'adce10d8-27a6-46a3-844e-05670cae62ab',
      fullName: 'AMANDA DE SOUZA BENTO',
      warName: 'AMANDA',
      identity: '589062',
      cpf: '30216302169',
      classYear: 2021,
    },
    {
      id: '5dd2be42-955d-439d-85b2-3e3570cb828c',
      fullName: 'ERIC HENRIQUE BEZERRA FURLANETO',
      warName: 'FURLANETO',
      identity: '20089658',
      cpf: '61307201542',
      classYear: 2021,
    },
    {
      id: '2b58f2fc-afbe-4093-8843-e5894d6b3a7c',
      fullName: 'JOAO PEDRO DA ROCHA LADEIRA',
      warName: 'LADEIRA',
      identity: '1477376',
      cpf: '49373302701',
      classYear: 2021,
    },
    {
      id: 'cb330b94-a7e3-4e63-9e8a-0aeedaa778c0',
      fullName: 'MURILLO ARFELI FERREIRA',
      warName: 'ARFELI',
      identity: '97948100',
      cpf: '83663483500',
      classYear: 2021,
    },
    {
      id: '7bda28b3-d0ca-42c8-a9a5-8a202c66a8a5',
      fullName: 'MARIA CLARA ARAUJO MILAGRES',
      warName: 'MILAGRES',
      identity: '2396501',
      cpf: '92579361870',
      classYear: 2021,
    },
    {
      id: 'e4d34e82-9799-4293-b341-23ad7a64f8ef',
      fullName: 'GUILHERME FILIPE SIMOES RIBEIRO',
      warName: 'RIBEIRO',
      identity: '20200438',
      cpf: '69815127253',
      classYear: 2021,
    },
    {
      id: 'f3a72662-580d-4e7a-bbcd-ffa550ef4f04',
      fullName: 'PEDRO HENRIQUE LEITE DOS SANTOS',
      warName: 'SANTOS',
      identity: '34823236',
      cpf: '65994205046',
      classYear: 2021,
    },
    {
      id: 'ae8a3d89-43ad-44af-b838-37a229bb85d1',
      fullName: 'LETICIA BICHOFF COELHO',
      warName: 'LETICIA',
      identity: '69730543',
      cpf: '4864478002',
      classYear: 2021,
    },
    {
      id: 'be80eac3-614a-443e-b51a-7611974a2a52',
      fullName: 'EDUARDO DE OLIVEIRA BORDINHON FILHO',
      warName: 'BORDINHON',
      identity: '83784415',
      cpf: '30222391509',
      classYear: 2021,
    },
    {
      id: '3a05d8e3-15b0-47b9-acdf-813b98658851',
      fullName: 'GIOVANI CARVALHO DE LIMA',
      warName: 'GIOVANI',
      identity: '14735242',
      cpf: '27343414671',
      classYear: 2021,
    },
    {
      id: 'b46804e0-26c8-45f5-b514-31979c5118b8',
      fullName: 'SAMUEL CASTILHO DA SILVA',
      warName: 'CASTILHO',
      identity: '20755281',
      cpf: '19412008764',
      classYear: 2021,
    },
    {
      id: '11c46e65-54f7-488e-9865-730ca27a48a5',
      fullName: 'ANA CLARA SCATOLINI ALVES DE GODOY',
      warName: 'SCATOLINI',
      identity: '31378799',
      cpf: '99126112150',
      classYear: 2021,
    },
    {
      id: 'c3a8ec7f-043a-44ab-bbd4-32e7d4b44a1d',
      fullName: 'IGOR OLIVEIRA DIAS',
      warName: 'DIAS',
      identity: '59820195',
      cpf: '38476549253',
      classYear: 2022,
    },
    {
      id: '79ff4cec-7568-4f8a-b159-43774d1e3542',
      fullName: 'FELIPE CARVALHO GARCIA',
      warName: 'GARCIA',
      identity: '77173763',
      cpf: '13012550495',
      classYear: 2022,
    },
    {
      id: 'f3e2009e-10f4-456e-80c9-4a3d49d58b6b',
      fullName: 'IGOR FONTANA FONSECA',
      warName: 'FONTANA',
      identity: '43813720',
      cpf: '50390808558',
      classYear: 2022,
    },
    {
      id: '966cefac-7682-42a1-903f-1e1d0c187589',
      fullName: 'JULIO HENRIQUE FONSECA DE PAULA BARRA',
      warName: 'BARRA',
      identity: '14500918',
      cpf: '46080988872',
      classYear: 2022,
    },
    {
      id: '9079da7d-c9a8-480f-93e5-98b78dacf459',
      fullName: 'CAIO FABIO DA SILVA MACHADO',
      warName: 'CAIO FABIO',
      identity: '45549970',
      cpf: '20523123647',
      classYear: 2022,
    },
    {
      id: '16f6dfdb-29a0-4907-b99c-de7205bc2da5',
      fullName: 'RODRIGO CARLOS ZERO',
      warName: 'ZERO',
      identity: '25996186',
      cpf: '11317603146',
      classYear: 2022,
    },
    {
      id: '2c2181a4-e6c1-4c45-9a81-06df4ddbb7ef',
      fullName: 'LARISSA JENIFER CONDE',
      warName: 'CONDE',
      identity: '52157178',
      cpf: '92210026946',
      classYear: 2022,
    },
    {
      id: '75c1cfa5-f8c1-4653-93bc-eba2ceaae0e5',
      fullName: 'MATHEUS SILVA PAGANELLI DAVID',
      warName: 'PAGANELLI',
      identity: '67057485',
      cpf: '74959323855',
      classYear: 2022,
    },
    {
      id: '44b9be7f-a775-40a5-800d-074b48c028f2',
      fullName: 'JOAO PEDRO DE CAMPOS COELHO',
      warName: 'CAMPOS',
      identity: '90834084',
      cpf: '45468609043',
      classYear: 2022,
    },
    {
      id: '69459fe9-0b5d-4b7c-b4d4-0c8be621ffa8',
      fullName: 'SAMUEL RODRIGUES DA LUZ',
      warName: 'SAMUEL',
      identity: '63299450',
      cpf: '99458949382',
      classYear: 2022,
    },
    {
      id: 'f896916b-610d-4140-bc55-56b3a2b50430',
      fullName: 'LEONARDO CAMPOS DOS REIS',
      warName: 'LEONARDO',
      identity: '3720120',
      cpf: '89070137990',
      classYear: 2022,
    },
    {
      id: 'c8611c83-af34-46c8-9a22-0af8c92c7a36',
      fullName: 'PEDRO AUGUSTO SOUZA',
      warName: 'AUGUSTO',
      identity: '50135690',
      cpf: '4879544768',
      classYear: 2022,
    },
    {
      id: '101d3ad0-a523-42a6-8a4c-8564150000e4',
      fullName: 'VICTOR FRANCA FERREIRA',
      warName: 'FRANCA',
      identity: '21136987',
      cpf: '25221321578',
      classYear: 2022,
    },
    {
      id: '0bfafb78-77b5-4a6d-832a-ef01e3c370d4',
      fullName: 'JONNATHAN DE SOUZA SATHLER',
      warName: 'SATHLER',
      identity: '7957189',
      cpf: '49011278709',
      classYear: 2022,
    },
    {
      id: '38f10bbb-10ad-4e1e-bd70-14a9950154af',
      fullName: 'BEATRIZ RAMOS DOS SANTOS FEITOSA',
      warName: 'RAMOS',
      identity: '22033220',
      cpf: '25976159207',
      classYear: 2022,
    },
    {
      id: '533e7c02-db3c-4d8b-925f-6de753fe101c',
      fullName: 'Caio Vinicius Amancio Soares',
      warName: 'Amâncio',
      identity: '711760',
      cpf: '46077534838',
      rank: 'CB',
    },
    {
      id: '5e26f07d-220d-4569-8511-04dde6eaae2a',
      fullName: 'Marcello Chaves Rosa',
      warName: 'Marcello',
      identity: '000000',
      cpf: '00000000000',
      rank: '1S',
    },
    {
      id: '8ea09817-3022-42e8-bc62-3ac45a4af950',
      fullName: 'Carlos Afonso Zanelli',
      warName: 'Zanelli',
      identity: '111111',
      cpf: '11111111111',
      rank: '2S',
    },
    {
      id: 'e2e51ba6-3138-4f2d-8e1f-40373782bba6',
      fullName: 'Júlio Celim',
      warName: 'Celim',
      identity: '21YS2222',
      cpf: '22222222222',
      rank: 'S2',
    },
    {
      id: 'abb60213-addb-41ad-b252-085b6b8b2079',
      fullName: 'Emmanoel Eso',
      warName: 'Emmanoel',
      identity: '20YS3333',
      cpf: '33333333333',
      rank: 'S2',
    },
  ];
  return {
    props: { mails, receivers },
  };
};

export default Encomendas;
