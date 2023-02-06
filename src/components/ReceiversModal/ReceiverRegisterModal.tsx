import { useRouter } from 'next/router';
import {
  Button,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormLabel,
  Input,
  useToast,
  NumberInput,
  NumberInputField,
  RadioGroup,
  Stack,
  Radio,
} from '@chakra-ui/react';
import { useForm, Controller } from 'react-hook-form';
import { useState } from 'react';
import Select from 'react-select';
import { api } from '../../services/api';

export function ReceiverRegisterModal({ onClose }) {
  const router = useRouter();
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm();
  const toast = useToast();
  const [receiverType, setReceiverType] = useState('cadet');

  const onSubmit = async (data) => {
    data.rank = data.rankSelect?.value;
    data.classYear = parseInt(data.classYear);

    api
      .post(receiverType, data)
      .then((res) => {
        if (res.status < 300) {
          toast({
            title: 'Sucesso',
            description: 'Destinatário criado com sucesso!',
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
      <ModalHeader>Cadastrar novo Destinatário</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormLabel fontWeight='semibold' color='gray.600' mb={0}>
            Tipo de Destinatário
          </FormLabel>
          <RadioGroup onChange={setReceiverType} value={receiverType}>
            <Stack direction='row'>
              <Radio value='cadet'>Cadete</Radio>
              <Radio value='staff'>Militar</Radio>
              <Radio value='work-place'>Seção</Radio>
            </Stack>
          </RadioGroup>

          {(receiverType === 'cadet' || receiverType === 'staff') && (
            <>
              <FormLabel fontWeight='semibold' color='gray.600' mt={3} mb={0}>
                Nome Completo:
              </FormLabel>
              <Controller
                name='fullName'
                control={control}
                defaultValue=''
                rules={{ required: true }}
                render={({ field }) => (
                  <Input
                    isRequired={true}
                    {...field}
                    isInvalid={errors.fullName}
                    placeholder='Exemplo: Fulano Da Silva '
                  />
                )}
              />

              <FormLabel fontWeight='semibold' color='gray.600' mt={3} mb={0}>
                Nome de Guerra:
              </FormLabel>
              <Controller
                name='warName'
                control={control}
                defaultValue=''
                rules={{ required: true }}
                render={({ field }) => (
                  <Input
                    isRequired={true}
                    {...field}
                    isInvalid={errors.warName}
                    placeholder='Exemplo: F. Silva'
                  />
                )}
              />

              <FormLabel fontWeight='semibold' color='gray.600' mt={3} mb={0}>
                CPF:
              </FormLabel>
              <Controller
                name='cpf'
                control={control}
                defaultValue=''
                rules={{ required: false, maxLength: 11, minLength: 11 }}
                render={({ field }) => (
                  <NumberInput isInvalid={errors.cpf} {...field} step={1}>
                    <NumberInputField
                      onBlur={() => {
                        if (errors.cpf)
                          toast({
                            title: 'Atenção',
                            description: 'CPF deve ter 11 digitos',
                            status: 'warning',
                            duration: 3000,
                            isClosable: true,
                          });
                      }}
                      placeholder='Exemplo: 12312312312'
                    />
                  </NumberInput>
                )}
              />

              <FormLabel fontWeight='semibold' color='gray.600' mt={3} mb={0}>
                Identidade:
              </FormLabel>

              <Controller
                name='identity'
                control={control}
                defaultValue=''
                rules={{ required: false }}
                render={({ field }) => (
                  <Input {...field} placeholder='Exemplo: 12YS1234' />
                )}
              />
            </>
          )}

          {receiverType === 'cadet' && (
            <>
              <FormLabel fontWeight='semibold' color='gray.600' mt={3} mb={0}>
                Ano de Entrada:
              </FormLabel>
              <Controller
                name='classYear'
                control={control}
                defaultValue=''
                rules={{ required: false }}
                render={({ field }) => (
                  <NumberInput
                    {...field}
                    step={1}
                    min={new Date().getUTCFullYear() - 5}
                    max={new Date().getUTCFullYear() + 1}
                  >
                    <NumberInputField placeholder='Exemplo: 2021 (Somente para Cadetes)' />
                  </NumberInput>
                )}
              />
            </>
          )}

          {receiverType === 'staff' && (
            <>
              <FormLabel fontWeight='semibold' color='gray.600' mt={3} mb={0}>
                Posto/Graduação:
              </FormLabel>
              <Controller
                name={'rankSelect'}
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={[
                      { value: 'S2', label: 'S2 - Soldado-de-Segunda-Classe' },
                      { value: 'S1', label: 'S1 - Soldado-de-Primeira-Classe' },
                      { value: 'CB', label: 'Cb - Cabo' },
                      { value: '3S', label: '3S - Terceiro-Sargento' },
                      { value: '2S', label: '2S - Segundo-Sargento' },
                      { value: '1S', label: '1S - Primeiro-Sargento' },
                      { value: 'SO', label: 'SO - Suboficial' },
                      { value: 'ASP', label: 'Asp - Aspirante' },
                      { value: '2T', label: '2º Ten - 2º Tenente' },
                      { value: '1T', label: '1º Ten - 1º Tenente' },
                      { value: 'CAP', label: 'Cap - Capitão' },
                      { value: 'MAJ', label: 'Maj - Major' },
                      { value: 'TC', label: 'Ten Cel - Tenente-Coronel' },
                      { value: 'CEL', label: 'Cel - Coronel' },
                      { value: 'BR', label: 'Brig - Brigadeiro' },
                      { value: 'MBR', label: 'Maj Brig - Major-Brigadeiro' },
                      {
                        value: 'TBR',
                        label: 'Ten Brig Ar - Tenente-Brigadeiro-do-Ar',
                      },
                      { value: 'MAR', label: 'Mar Ar - Marechal-do-Ar' },
                    ]}
                    placeholder='Selecione...'
                  />
                )}
              />
            </>
          )}

          {receiverType === 'work-place' && (
            <>
              <FormLabel fontWeight='semibold' color='gray.600' mt={3} mb={0}>
                Nome:
              </FormLabel>
              <Controller
                name='name'
                control={control}
                defaultValue=''
                rules={{ required: true }}
                render={({ field }) => (
                  <Input
                    isRequired={true}
                    {...field}
                    isInvalid={errors.fullName}
                    placeholder='Exemplo: Seção de Gestão Documental'
                  />
                )}
              />

              <FormLabel fontWeight='semibold' color='gray.600' mt={3} mb={0}>
                Sigla:
              </FormLabel>
              <Controller
                name='abbreviation'
                control={control}
                defaultValue=''
                rules={{ required: true }}
                render={({ field }) => (
                  <Input
                    isRequired={true}
                    {...field}
                    isInvalid={errors.warName}
                    placeholder='Exemplo: SGDOC'
                  />
                )}
              />
            </>
          )}

          <FormLabel fontWeight='semibold' color='gray.600' mt={3} mb={0}>
            Email:
          </FormLabel>
          <Controller
            name='email'
            control={control}
            defaultValue=''
            render={({ field }) => (
              <Input
                isRequired={true}
                {...field}
                isInvalid={errors.email}
                placeholder='Exemplo: fsilvafs@fab.mil.br '
              />
            )}
          />

          <Button onClick={onClose} float='right' mb='3' mt='3'>
            Cancel
          </Button>
          <Button
            isLoading={isSubmitting}
            colorScheme='blue'
            float='right'
            mb='3'
            mt='3'
            mr={3}
            type='submit'
          >
            Save
          </Button>
        </form>
      </ModalBody>
    </ModalContent>
  );
}
