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
  Radio,
  RadioGroup,
  Stack,
} from '@chakra-ui/react';
import { useForm, Controller } from 'react-hook-form';
import { api } from '../../services/api';
import { BiCheckCircle, BiXCircle } from 'react-icons/bi';

interface PermissionRegisterProps {
  onClose: () => void;
}

export function PermissionRegisterModal({ onClose }: PermissionRegisterProps) {
  const router = useRouter();
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm({ mode: 'onChange' });
  const toast = useToast();
  const [editMail, setEditMail] = useState('');
  const [editExpedition, setEditExpedition] = useState('');
  const [editReceiver, setEditReceiver] = useState('');
  const [editUser, setEditUser] = useState('');
  const [editReport, setEditReport] = useState('');
  const [editShippingCompany, setEditShippingCompany] = useState('');

  const onSubmit = async (data) => {
    data.editMail = editMail === 'true';
    data.editExpedition = editExpedition === 'true';
    data.editReceiver = editReceiver === 'true';
    data.editUser = editUser === 'true';
    data.editReport = editReport === 'true';
    data.editShippingCompany = editShippingCompany === 'true';

    api
      .post('permission', data)
      .then((res) => {
        if (res.status < 300) {
          toast({
            title: 'Sucesso',
            description: 'Permissão criada com sucesso!',
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
          router.replace(router.asPath);
          onClose();
        } else
          toast({
            title: 'Erro',
            description:
              'Houve um problema, verifique os dados e tente novamente!',
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
      })
      .catch((err) => {
        toast({
          title: 'Erro',
          description:
            'Houve um problema, verifique os dados e tente novamente!',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      });
  };

  return (
    <ModalContent>
      <ModalHeader>Cadastrar nova Permissão</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isRequired>
            <FormLabel>Nome:</FormLabel>
            <Controller
              name='name'
              control={control}
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

          <FormLabel fontSize='sm'>Editar Reporte: </FormLabel>
          <RadioGroup onChange={setEditReport} value={editReport}>
            <Stack direction='row'>
              <Radio value='true'>
                <BiCheckCircle color='green' size='20px' />
              </Radio>
              <Radio value=''>
                <BiXCircle color='red' size='20px' />
              </Radio>
            </Stack>
          </RadioGroup>

          <FormLabel fontSize='sm'>Editar Transportadora: </FormLabel>
          <RadioGroup
            onChange={setEditShippingCompany}
            value={editShippingCompany}
          >
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
