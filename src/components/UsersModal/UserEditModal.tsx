import { useRouter } from 'next/router';
import {
  Button,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from '@chakra-ui/react';
import { useForm, Controller } from 'react-hook-form';
import { api } from '../../services/api';
import { Permission, User } from '../../interfaces';
import Select from 'react-select';

type UserEditProps = {
  user: User;
  onClose: () => void;
  permissions: Permission[];
};

export function UserEditModal({ onClose, user, permissions }: UserEditProps) {
  const router = useRouter();
  const {
    handleSubmit,
    formState: { isSubmitting },
    control,
  } = useForm({ mode: 'onChange' });
  const toast = useToast();

  const onSubmit = async (data) => {
    data.userId = user.id;
    data.permissionId = data.permissionSelect.value;

    api.put('user', data).then((res) => {
      if (res.status < 300) {
        toast({
          title: 'Sucesso',
          description: 'Usuário editado com sucesso!',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        router.replace(router.asPath);
        onClose();
      } else {
        toast({
          title: 'Erro',
          description:
            'Houve um problema, verifique os dados e tente novamente!',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    });
  };

  return (
    <ModalContent>
      <ModalHeader>
        Editando {user.rank} {user.warName}
      </ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl mt='3'>
            <FormLabel fontWeight='semibold' color='gray.600'>
              E-mail:
            </FormLabel>
            <Controller
              name='email'
              control={control}
              defaultValue={user.email}
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder='Exemplo: tp.fulanofdsj@fab.mil.br'
                />
              )}
            />
          </FormControl>

          <FormControl mt='3'>
            <FormLabel fontWeight='semibold' color='gray.600'>
              Login:
            </FormLabel>
            <Controller
              name='login'
              control={control}
              defaultValue={user.login}
              rules={{ required: true }}
              render={({ field }) => (
                <Input {...field} placeholder='Exemplo: fulanofdsj' />
              )}
            />
          </FormControl>

          <FormControl mt='3' isRequired>
            <FormLabel fontWeight='semibold' color='gray.600'>
              Permissão:
            </FormLabel>
            <Controller
              name='permissionSelect'
              control={control}
              defaultValue={{
                value: user.permission.id,
                label: user.permission.name,
              }}
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  {...field}
                  options={permissions.map((permissions) => ({
                    value: permissions.id,
                    label: permissions.name,
                  }))}
                  placeholder='Selecione...'
                />
              )}
            />
          </FormControl>

          <Button
            isLoading={isSubmitting}
            colorScheme='blue'
            mb='3'
            mt='3'
            mr={3}
            type='submit'
          >
            Salvar
          </Button>
          <Button onClick={onClose} mb='3' mt='3'>
            Cancelar
          </Button>
        </form>
      </ModalBody>
    </ModalContent>
  );
}
