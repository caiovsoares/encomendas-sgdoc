import React, { useState } from 'react'
import { Box, Flex, Text, useDisclosure } from '@chakra-ui/react'
import { exampleMails } from '../utils'
import ReactTable from '../components/ReactTable'
import { PageButton } from '../components/PageButton'
import { BiCheckCircle, BiInfoCircle, BiXCircle } from 'react-icons/bi'
import MailsModal from '../components/MailsModal'
import axios from 'axios'
import { getSession } from 'next-auth/react'

const Encomendas = (props) => {

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [mail, setMail] = useState({})
  const [modalType, setModalType] = useState('')

  async function HandleDetailItem(mail: {}) {
    onOpen()
    setMail(mail)
    setModalType('detail')
  }

  function HandleRegisterItem(mail: {}) {
    onOpen()
    setMail(mail)
    setModalType('register')
  }

  function HandleReceiveItens(mail: {}) {
    onOpen()
    setMail(mail)
    setModalType('receive')
  }

  function HandleSearchItens(mail: {}) {
    onOpen()
    setMail(mail)
    setModalType('search')
  }

  const columns = React.useMemo(
    () => [
      {
        Header: 'Rastreio',
        accessor: 'tracking',
      },
      {
        Header: 'Remetente',
        accessor: 'sender',
      },
      {
        Header: 'Destinatário',
        accessor: 'destiny.warName',
      },
      {
        Header: 'Recebido',
        accessor: 'receiver.warName',
        Cell: ({ cell: { value } }) => {
          return (
            <>{value ?
              <Flex flexDir='row'><Box mr='5px' flexDir='row'><BiCheckCircle color='green' size='20px' /></Box>{String(value)}</Flex> :
              <Box mr='5px'><BiXCircle color='red' size='20px' /></Box>}
            </>
          )
        }
      },
      {
        Header: ' ',
        accessor: row => row,
        Cell: ({ cell: { value } }) => {
          return (
            <Flex alignItems='center' h='20px'>
              <BiInfoCircle size='30px' onClick={() => { HandleDetailItem(value) }} />
            </Flex>
          )
        }
      }
    ],
    []
  )

  const data = React.useMemo(() => props.mails, [])

  return (

    <Flex width='100%' flexDir='column'>
      <MailsModal isOpen={isOpen} onClose={onClose} mail={mail} type={modalType} />
      <Flex flexDir='row' minH='30px' h='7vh' alignItems='center' justifyContent='center'>
        <PageButton>Novo Cadastro</PageButton>
        <PageButton>Buscar</PageButton>
        <PageButton>Registrar Recebimento</PageButton>
      </Flex>
      <Flex flexDir='row' alignItems='center' h='93vh' width='100%'>
        <ReactTable columns={columns} data={data} />
      </Flex>
    </Flex>
  )
}

export async function getServerSideProps(context) {

  //const mails = exampleMails(100);
  const session = await getSession(context);

  if (!session || !session.user.permission.editMail)
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }

  const fromDate = context.query.from;
  const toDate = context.query.to;

  const mails = await (await axios.get(`http://localhost:3333/mails/findAll?userId=${session.user.id}&from=${fromDate}&to=${toDate}`)).data;

  return {
    props: { mails },
  }
}

export default Encomendas