import React, { useRef } from 'react';
import {
  Box,
  Button,
  Flex,
  Heading,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import {
  useTable,
  usePagination,
  useSortBy,
  useGlobalFilter,
} from 'react-table';
import ReactTable from '../../components/ReactTable';
import { PageButton } from '../../components/PageButton';
import { getAPIClient } from '../../services/apiClient';
import { GetServerSideProps } from 'next';
import {
  Cadet,
  Expedition,
  ExpeditionList,
  Mail,
  Staff,
  WorkPlace,
} from '../../interfaces';
import { findReceiverName, invertStringDate } from '../../utils';
import { MailList } from '../../interfaces';
import ReactToPrint from 'react-to-print';
import { CadetList } from '../../components/CadetList';
import MailListModal from '../../components/MailListModal';
import { BiPrinter, BiTrash } from 'react-icons/bi';
import { api } from '../../services/api';
import { useRouter } from 'next/router';

type ExpeditionListIdProps = {
  expeditionList: ExpeditionList;
};

const ExpeditionListId = ({ expeditionList }: ExpeditionListIdProps) => {
  const router = useRouter();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const componentRef = useRef();
  const expeditions = expeditionList.expeditions;

  const columns = React.useMemo(
    () => [
      { Header: 'CEP', accessor: 'cep' },
      { Header: 'Nº/Informação', accessor: 'contentInfo' },
      { Header: 'Método', accessor: 'method' },
      { Header: 'Rastreio', accessor: 'tracking' },
      {
        Header: 'Setor',
        accessor: (expedition: Expedition) => expedition.workPlace.abbreviation,
        id: 'workPlace',
      },
    ],
    []
  );

  const tableOptions = useTable(
    {
      columns,
      data: expeditions,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  // const deleteMailList = async () => {
  //   api
  //     .delete('mail-list', { data: { id: mailList.id } })
  //     .then((res) => {
  //       if (res.status < 300) {
  //         toast({
  //           title: 'Sucesso',
  //           description: 'Lista excluída com sucesso!',
  //           status: 'success',
  //           duration: 3000,
  //           isClosable: true,
  //         });
  //         router.push('/lista');
  //       } else
  //         toast({
  //           title: 'Erro',
  //           description: 'Houve um problema, a lista não foi excluída!',
  //           status: 'error',
  //           duration: 3000,
  //           isClosable: true,
  //         });
  //     })
  //     .catch((err) => {
  //       toast({
  //         title: 'Erro',
  //         description: 'Houve um problema, a lista não foi excluída!',
  //         status: 'error',
  //         duration: 3000,
  //         isClosable: true,
  //       });
  //     });
  // };

  // const deleteReceivement = async () => {
  //   api
  //     .patch('mail-list/unreceive', { id: mailList.id })
  //     .then((res) => {
  //       if (res.status < 300) {
  //         toast({
  //           title: 'Sucesso',
  //           description: 'Recebimento da lista excluído com sucesso!',
  //           status: 'success',
  //           duration: 3000,
  //           isClosable: true,
  //         });
  //         router.replace(router.asPath);
  //       } else
  //         toast({
  //           title: 'Erro',
  //           description:
  //             'Houve um problema, o recebimento da lista não foi excluído!',
  //           status: 'error',
  //           duration: 3000,
  //           isClosable: true,
  //         });
  //     })
  //     .catch((err) => {
  //       toast({
  //         title: 'Erro',
  //         description:
  //           'Houve um problema, o recebimento da lista não foi excluído!',
  //         status: 'error',
  //         duration: 3000,
  //         isClosable: true,
  //       });
  //     });
  // };

  return (
    <Flex width='100%' flexDir='column' alignItems='center'>
      {/* <MailListModal
        id={mailList.id}
        receivers={receivers}
        isOpen={isOpen}
        onClose={onClose}
      /> */}
      {/* <Flex
        flexDir='column'
        minH='30px'
        h='18vh'
        alignItems='center'
        justifyContent='center'
      >
        <Heading size='sm'>
          Lista de expedições do dia {invertStringDate(expeditionList.created_at)}
        </Heading>
        <Flex flexDir='row' mt={3} alignItems='center'>
          {mailList.mailListReceivements[0] ? (
            <>
              <Flex flexDir='column'>
                {mailList.mailListReceivements.map(({ receiver }) => (
                  <Text key={receiver.id}>• {findReceiverName(receiver)}</Text>
                ))}
              </Flex>
              <Popover>
                <PopoverTrigger>
                  <Button
                    ml={3}
                    size='sm'
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
                    Isso irá apagar o recebimento desta lista!
                    <Button
                      bg='alertButton'
                      color='menuButtonText'
                      _hover={{ bg: 'alertButtonHover' }}
                      onClick={deleteReceivement}
                    >
                      Confirmar
                    </Button>
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            </>
          ) : (
            <>
              <PageButton onClick={onOpen}>Registrar Recebimento</PageButton>
              <Popover>
                <PopoverTrigger>
                  <Button
                    size='sm'
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
                    Essa ação não poderá ser desfeita
                    <Button
                      bg='alertButton'
                      color='menuButtonText'
                      _hover={{ bg: 'alertButtonHover' }}
                      onClick={deleteMailList}
                    >
                      Confirmar
                    </Button>
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            </>
          )}
          <ReactToPrint
            trigger={() => (
              <Button
                w='min'
                boxShadow='lg'
                size='sm'
                rounded='md'
                bgColor='menuButton'
                _hover={{ bg: 'menuButtonHover' }}
                color='menuButtonText'
                marginInline='10px'
              >
                <BiPrinter size='20px' />
              </Button>
            )}
            content={() => componentRef.current}
          />
          <Box hidden={true}>
            <Box ref={componentRef}>
              <CadetList mails={mailList.mails} date={mailList.created_at} />
            </Box>
          </Box>
        </Flex>
      </Flex> */}
      <Flex flexDir='row' alignItems='center' h='100vh' width='100%'>
        <ReactTable tableOptions={tableOptions} />
      </Flex>
    </Flex>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { id } = context.query;
    const apiClient = getAPIClient(context);
    const userRes = await apiClient.get('/user/auth');
    const user = userRes.data;

    if (userRes.status > 299 || !user?.permission?.editExpedition)
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };

    const expeditionList: ExpeditionList = (
      await apiClient.get(`expedition-list/${id}`)
    ).data;

    return {
      props: { expeditionList },
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

export default ExpeditionListId;
