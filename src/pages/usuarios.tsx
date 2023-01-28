import React, { useState } from 'react';
import {
  Button,
  Flex,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
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
import { Permission, Staff, User } from '../interfaces';
import { BiEdit, BiInfoCircle, BiShieldX, BiTrash } from 'react-icons/bi';
import UsersModal from '../components/UsersModal';
import { api } from '../services/api';

type usuariosProps = {
  users: User[];
  permissions: Permission[];
  staffs: Staff[];
};

const Usuarios = ({ users, permissions, staffs }: usuariosProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalType, setModalType] = useState('');
  const [user, setUser] = useState<User>();
  const toast = useToast();
  const router = useRouter();

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

  function HandleResetPassword(id: string) {
    api.patch('user/resetPassword', { id }).then((res) => {
      if (res.status < 300) {
        toast({
          title: 'Sucesso',
          description: 'Senha resetada com sucesso!',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: 'Erro',
          description: 'Houve um problema!',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    });
  }

  function HandleRemoveUser(id: string) {
    api.delete('user', { data: { id } }).then((res) => {
      if (res.status < 300) {
        toast({
          title: 'Sucesso',
          description: 'Usuário apagado com sucesso!',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        router.replace(router.asPath);
      } else {
        toast({
          title: 'Erro',
          description: 'Houve um problema!',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    });
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
                onClick={() => HandleEditItem(value)}
                _hover={{ bg: 'menuButtonHover' }}
              >
                <BiEdit size={20} />
              </Button>

              <Popover>
                <PopoverTrigger>
                  <Button
                    size='sm'
                    ml={2}
                    paddingInline={2}
                    bg='alertButton'
                    color='menuButtonText'
                    _hover={{ bg: 'alertButtonHover' }}
                  >
                    <BiShieldX size={20} />
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverHeader>Tem certeza?</PopoverHeader>
                  <PopoverBody>
                    Isso irá RESETAR a senha deste usuário!
                    <Button
                      mt={2}
                      bg='alertButton'
                      color='menuButtonText'
                      _hover={{ bg: 'alertButtonHover' }}
                      onClick={() => HandleResetPassword(value.id)}
                    >
                      Confirmar
                    </Button>
                  </PopoverBody>
                </PopoverContent>
              </Popover>
              <Popover>
                <PopoverTrigger>
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
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverHeader>Tem certeza?</PopoverHeader>
                  <PopoverBody>
                    Essa ação não poderá ser desfeita!
                    <Button
                      mt={2}
                      bg='alertButton'
                      color='menuButtonText'
                      _hover={{ bg: 'alertButtonHover' }}
                      onClick={() => {
                        HandleRemoveUser(value.id);
                      }}
                    >
                      Confirmar
                    </Button>
                  </PopoverBody>
                </PopoverContent>
              </Popover>
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
        permissions={permissions}
        staffs={staffs}
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
  const staffsPromise = apiClient.get('user/staffWithoutUser');
  const permissionsPromise = apiClient.get('permission');

  const [usersRes, permissionsRes, staffsRes] = await Promise.all([
    usersPromise,
    permissionsPromise,
    staffsPromise,
  ]);
  const users = usersRes.data;
  const permissions = permissionsRes.data;
  const staffs = staffsRes.data;

  return {
    props: { users, permissions, staffs },
  };
};

export default Usuarios;
