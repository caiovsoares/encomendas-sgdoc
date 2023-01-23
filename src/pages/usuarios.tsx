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
import { useRouter } from 'next/router';
import { getAPIClient } from '../services/apiClient';
import { GetServerSideProps } from 'next';
import { Permission, User } from '../interfaces';
import PermissionsModal from '../components/PermissionsModal';
import { BiEdit, BiInfoCircle, BiTrash } from 'react-icons/bi';
import UsersModal from '../components/UsersModal';

type usuariosProps = {
  users: User[];
  permissions: Permission[];
};

const Usuarios = ({ users, permissions }: usuariosProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalType, setModalType] = useState('');
  const [user, setUser] = useState<User>();
  const router = useRouter();
  const toast = useToast();

  function HandleRegisterItem() {
    onOpen();
    setModalType('register');
  }

  function HandleDetailItem(user: User) {
    setUser(user);
    setModalType('detail');
    onOpen();
  }

  function HandleEditItem(user: User) {
    setUser(user);
    setModalType('edit');
    onOpen();
  }

  const columns = React.useMemo(
    () => [
      {
        Header: 'Nome',
        accessor: ({ rank, warName, fullName }: User) =>
          `${rank} ${warName} - ${fullName}`,
      },
      { Header: 'Permissão', accessor: 'permission.name' },
      {
        Header: 'Opções',
        accessor: (row) => row,
        Cell: ({ cell: { value } }) => {
          return (
            <Flex alignItems='center' h='20px'>
              <Button
                size='sm'
                paddingInline={2}
                bg='menuButton'
                color='menuButtonText'
                _hover={{ bg: 'menuButtonHover' }}
                onClick={() => HandleDetailItem(value)}
              >
                <BiInfoCircle size={20} />
              </Button>

              <Button
                size='sm'
                ml={2}
                paddingInline={2}
                bg='menuButton'
                color='menuButtonText'
                _hover={{ bg: 'menuButtonHover' }}
              >
                <BiEdit size={20} />
              </Button>
              <Button
                size='sm'
                ml={2}
                paddingInline={2}
                bg='alertButton'
                color='menuButtonText'
                _hover={{ bg: 'alertButtonHover' }}
              >
                <BiTrash size={20} />
              </Button>
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
      data: users,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  return (
    <Flex width='100%' flexDir='column'>
      <UsersModal
        isOpen={isOpen}
        onClose={onClose}
        user={user}
        type={modalType}
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

  const usersPromise = apiClient.get('user');
  const permissionsPromise = apiClient.get('permission');

  const [usersRes, permissionsRes] = await Promise.all([
    usersPromise,
    permissionsPromise,
  ]);
  const users = usersRes.data;
  const permissions = permissionsRes.data;

  return {
    props: { users, permissions },
  };
};

export default Usuarios;
