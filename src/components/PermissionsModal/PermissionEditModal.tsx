import { useState } from 'react';
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
  RadioGroup,
  Stack,
  Radio,
} from '@chakra-ui/react';
import { useForm, Controller } from 'react-hook-form';
import { api } from '../../services/api';
import { Permission } from '../../interfaces';
import { BiCheckCircle, BiXCircle } from 'react-icons/bi';

type PermissionEditProps = {
  onClose: () => void;
  permission: Permission;
};

export function PermissionEditModal({
  onClose,
  permission,
}: PermissionEditProps) {
  const router = useRouter();
  const [editMail, setEditMail] = useState(permission.editMail ? 'true' : '');
  const [editExpedition, setEditExpedition] = useState(
    permission.editExpedition ? 'true' : ''
  );
  const [editReceiver, setEditReceiver] = useState(
    permission.editReceiver ? 'true' : ''
  );
  const [editUser, setEditUser] = useState(permission.editUser ? 'true' : '');
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm({ mode: 'onChange' });
  const toast = useToast();

  const onSubmit = async (data) => {
    data.id = permission.id;
    data.editMail = editMail === 'true';
    data.editExpedition = editExpedition === 'true';
    data.editReceiver = editReceiver === 'true';
    data.editUser = editUser === 'true';

    const result = await (await api.put('permission', data)).data;

    if (result.id) {
      toast({
        title: 'Sucesso',
        description: 'Permissão alterada com sucesso!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      router.replace(router.asPath);
      onClose();
    } else
      toast({
        title: 'Erro',
        description: 'Houve um problema, verifique os dados e tente novamente!',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
  };

  return (
    <ModalContent>
      <ModalHeader>Editando {permission.name}</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isRequired>
            <FormLabel>Nome:</FormLabel>
            <Controller
              name='name'
              control={control}
              defaultValue={permission.name}
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  {...field}
                  isInvalid={errors.name}
                  placeholder='Nome da permissão'
                />
              )}
            />
          </FormControl>

          <FormLabel mt={3}>Permissões: </FormLabel>

          <FormLabel fontSize='sm'>Editar Encomenda: </FormLabel>
          <RadioGroup onChange={setEditMail} value={editMail}>
            <Stack direction='row'>
              <Radio value='true'>
                <BiCheckCircle color='green' size='20px' />
              </Radio>
              <Radio value=''>
                <BiXCircle color='red' size='20px' />
              </Radio>
            </Stack>
          </RadioGroup>

          <FormLabel fontSize='sm'>Editar Expedição: </FormLabel>
          <RadioGroup onChange={setEditExpedition} value={editExpedition}>
            <Stack direction='row'>
              <Radio value='true'>
                <BiCheckCircle color='green' size='20px' />
              </Radio>
              <Radio value=''>
                <BiXCircle color='red' size='20px' />
              </Radio>
            </Stack>
          </RadioGroup>

          <FormLabel fontSize='sm'>Editar Destinatário: </FormLabel>
          <RadioGroup onChange={setEditReceiver} value={editReceiver}>
            <Stack direction='row'>
              <Radio value='true'>
                <BiCheckCircle color='green' size='20px' />
              </Radio>
              <Radio value=''>
                <BiXCircle color='red' size='20px' />
              </Radio>
            </Stack>
          </RadioGroup>

          <FormLabel fontSize='sm'>Editar Usuário: </FormLabel>
          <RadioGroup onChange={setEditUser} value={editUser}>
            <Stack direction='row'>
              <Radio value='true'>
                <BiCheckCircle color='green' size='20px' />
              </Radio>
              <Radio value=''>
                <BiXCircle color='red' size='20px' />
              </Radio>
            </Stack>
          </RadioGroup>

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
