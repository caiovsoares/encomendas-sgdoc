import React, { useState } from 'react';
import { Button, Flex, useDisclosure, useToast } from '@chakra-ui/react';
import {
  useTable,
  usePagination,
  useSortBy,
  useGlobalFilter,
} from 'react-table';
import ReactTable from '../components/ReactTable';
import { PageButton } from '../components/PageButton';
import { BiCheckCircle, BiEdit, BiTrash, BiXCircle } from 'react-icons/bi';
import { useRouter } from 'next/router';
import { getAPIClient } from '../services/apiClient';
import { GetServerSideProps } from 'next';
import { Permission } from '../interfaces';
import { api } from '../services/api';
import PermissionsModal from '../components/PermissionsModal';

type permissoesProps = {
  permissions: Permission[];
};

const Permissoes = ({ permissions }: permissoesProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalType, setModalType] = useState('');
  const [permission, setPermission] = useState<Permission>();
  const router = useRouter();
  const toast = useToast();

  function HandleRegisterItem() {
    onOpen();
    setModalType('register');
  }

  function HandleEditItem(permission: Permission) {
    setPermission(permission);
    setModalType('edit');
    onOpen();
  }

  async function HandleRemoveItem(id: string) {
    api
      .delete('permission', { data: { id } })
      .then((res) => {
        if (res.status < 300) {
          toast({
            title: 'Sucesso',
            description: 'Permissão excluída com sucesso!',
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
          router.replace(router.asPath);
        } else {
          toast({
            title: 'Erro',
            description: 'Houve um problema, a permissão não foi excluída!',
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        }
      })
      .catch((err) => {
        toast({
          title: 'Erro',
          description: 'Houve um problema, a permissão não foi excluída!',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      });
  }

  const columns = React.useMemo(
    () => [
      { Header: 'Nome', accessor: 'name' },
      {
        Header: 'Encomenda',
        accessor: 'editMail',
        Cell: ({ cell }) =>
          cell.row.original.editMail ? (
            <BiCheckCircle color='green' size='20px' />
          ) : (
            <BiXCircle color='red' size='20px' />
          ),
      },
      {
        Header: 'Expedição',
        accessor: 'editExpedition',
        Cell: ({ cell }) =>
          cell.row.original.editExpedition ? (
            <BiCheckCircle color='green' size='20px' />
          ) : (
            <BiXCircle color='red' size='20px' />
          ),
      },
      {
        Header: 'Destinatário',
        accessor: 'editReceiver',
        Cell: ({ cell }) =>
          cell.row.original.editReceiver ? (
            <BiCheckCircle color='green' size='20px' />
          ) : (
            <BiXCircle color='red' size='20px' />
          ),
      },
      {
        Header: 'Usuário',
        accessor: 'editUser',
        Cell: ({ cell }) =>
          cell.row.original.editUser ? (
            <BiCheckCircle color='green' size='20px' />
          ) : (
            <BiXCircle color='red' size='20px' />
          ),
      },
      {
        Header: 'Opções',
        acessor: (permission: Permission) => permission.name,
        Cell: ({ cell }) => (
          <>
            <Button
              size='sm'
              paddingInline={2}
              bg='menuButton'
              color='menuButtonText'
              _hover={{ bg: 'menuButtonHover' }}
              onClick={() => HandleEditItem(cell.row.original)}
            >
              <BiEdit size={15} />
            </Button>
            <Button
              size='sm'
              ml={2}
              paddingInline={2}
              bg='alertButton'
              color='menuButtonText'
              _hover={{ bg: 'alertButtonHover' }}
              onClick={() => HandleRemoveItem(cell.row.original.id)}
            >
              <BiTrash size={15} />
            </Button>
          </>
        ),
      },
    ],
    []
  );

  const tableOptions = useTable(
    {
      columns,
      data: permissions,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  return (
    <Flex width='100%' flexDir='column'>
      <PermissionsModal
        isOpen={isOpen}
        onClose={onClose}
        type={modalType}
        permission={permission}
      />
      <Flex
        flexDir='row'
        minH='30px'
        h='7vh'
        alignItems='center'
        justifyContent='center'
      >
        <PageButton onClick={HandleRegisterItem}>Novo Cadastro</PageButton>
      </Flex>
      <Flex flexDir='row' alignItems='center' h='93vh' width='100%'>
        <ReactTable tableOptions={tableOptions} />
      </Flex>
    </Flex>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const apiClient = getAPIClient(context);
    const userRes = await apiClient.get('/user/auth');
    const user = userRes.data;

    if (userRes.status > 299 || !user?.permission?.editUser)
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };

    const permissions = await (await apiClient.get('permission')).data;

    return {
      props: { permissions },
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

export default Permissoes;
