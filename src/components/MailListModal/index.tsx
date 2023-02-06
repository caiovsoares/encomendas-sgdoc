import { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useToast,
} from '@chakra-ui/react';
import Select from 'react-select';
import { useRouter } from 'next/router';
import { Controller, useForm } from 'react-hook-form';
import { Cadet, Staff, WorkPlace } from '../../interfaces';
import { api } from '../../services/api';
import { findReceiverName } from '../../utils';
import { BiMinus, BiPlus } from 'react-icons/bi';

type MailListModalProps = {
  onClose: () => void;
  isOpen: boolean;
  id: string;
  receivers: (Staff | Cadet | WorkPlace)[];
};

const MailListModal = ({
  onClose,
  isOpen,
  id,
  receivers,
}: MailListModalProps) => {
  const router = useRouter();
  const {
    handleSubmit,
    formState: { isSubmitting },
    control,
    setValue,
  } = useForm({ mode: 'onChange' });
  const toast = useToast();
  const [receiversAmount, setReceiversAmount] = useState(2);

  const onSubmit = async (data) => {
    data.id = id;
    data.receiverIds = data.destinySelect
      .filter((obj) => obj)
      .map((obj) => obj.value);

    api
      .patch('mail-list', data)
      .then((data) => {
        toast({
          title: 'Sucesso',
          description: 'Lista recebida com sucesso!',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        router.replace(router.asPath);
        onClose();
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

  const formControllers = [];
  for (let i = 0; i < receiversAmount; i++) {
    formControllers.push(
      <FormControl mt='3' isRequired key={`destinySelect${i}`}>
        <FormLabel fontWeight='semibold' color='gray.600'>
          Destinatário:
        </FormLabel>
        <Controller
          name={`destinySelect[${i}]`}
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Select
              {...field}
              options={receivers.map((receiver) => ({
                value: receiver.id,
                label: findReceiverName(receiver),
              }))}
              placeholder='Selecione...'
            />
          )}
        />
      </FormControl>
    );
  }

  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay backdropFilter='blur(5px)' />
      <ModalContent>
        <ModalHeader>Registrar Recebimento</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box boxSize='-webkit-fit-content' borderRadius='6px'>
            <Button
              size='xs'
              bgColor='menuButton'
              color='menuButtonText'
              boxShadow='lg'
              borderRightRadius={0}
              onClick={() => {
                setValue(`destinySelect[${receiversAmount - 1}]`, undefined);
                setReceiversAmount(receiversAmount - 1);
              }}
              disabled={receiversAmount <= 1}
            >
              <BiMinus size='20px' />
            </Button>
            <Button
              size='xs'
              bgColor='menuButton'
              color='menuButtonText'
              boxShadow='lg'
              borderLeftRadius={0}
              onClick={() => setReceiversAmount(receiversAmount + 1)}
              disabled={receiversAmount >= 3}
            >
              <BiPlus size='20px' />
            </Button>
          </Box>
          <form onSubmit={handleSubmit(onSubmit)}>
            {formControllers}
            <Button
              isLoading={isSubmitting}
              colorScheme='blue'
              mb='3'
              mt='3'
              mr={3}
              type='submit'
            >
              Registrar
            </Button>
            <Button onClick={onClose} mb='3' mt='3'>
              Cancelar
            </Button>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default MailListModal;
