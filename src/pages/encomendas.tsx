import  React, { useState }  from 'react'
import {  Box, Flex, Text, useDisclosure } from '@chakra-ui/react'
import { exampleMails } from '../utils'
import ReactTable from '../components/ReactTable'
import { PageButton } from '../components/PageButton'
import { BiCheckCircle, BiInfoCircle, BiXCircle } from 'react-icons/bi'
import MailsModal from '../components/MailsModal'
import axios from 'axios'

const Encomendas = (props) => {

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [ mail, setMail ] = useState({})
  const [ modalType, setModalType] = useState('')

  async function HandleDetailItem(mail:{}){
    onOpen()
    setMail(mail)
    setModalType('detail')
  } 

  function HandleRegisterItem(mail:{}){
    onOpen()
    setMail(mail)
    setModalType('register')
  } 

  function HandleReceiveItens(mail:{}){
    onOpen()
    setMail(mail)
    setModalType('receive')
  } 

  function HandleSearchItens(mail:{}){
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
            Cell: ({cell:{value}}) => {
              return(
                <>{value?
                  <Flex flexDir='row'><Box mr='5px' flexDir='row'><BiCheckCircle color='green' size='20px'/></Box>{String(value)}</Flex>:
                  <Box mr='5px'><BiXCircle color='red' size='20px'/></Box>}
                </>
              )
            }
          },
          {
            Header: ' ',
            accessor: row => row,
            Cell: ({cell:{ value }}) => { return(
              <Flex alignItems='center' h='20px'>
                <BiInfoCircle size='30px' onClick={() => { HandleDetailItem(value)}}/>
              </Flex>
            )
            }
          }
        ],
    []
  )
  
  const data = React.useMemo(() => props.mails, [])
  
  return(
    
  <Flex width='100%' flexDir='column'>
    <MailsModal isOpen={isOpen} onClose={onClose} mail={mail} type={modalType}/>
    <Flex flexDir='row' minH='30px' h='7vh' alignItems='center' justifyContent='center'>
      <PageButton>Novo Cadastro</PageButton>
      <PageButton>Buscar</PageButton>
      <PageButton>Registrar Recebimento</PageButton>
    </Flex>
    <Flex flexDir='row' alignItems='center' h='93vh' width='100%'>
      <ReactTable columns={columns} data={data}/>
    </Flex>
  </Flex>
)}

export async function getStaticProps(context) {

  const mails = exampleMails(100);

  const ditto = await axios({
    headers: { Accept: 'text/html, application/json, text/plain, */*' },
    proxy: {
      host: 'proxy.gapys.intraer',
      port: 8080,
      auth: {
        username: '46077534838',
        password: 'Opticom1!'
      },
      protocol: 'http'
    },
    url: 'https://pokeapi.co/api/v2/pokemon/ditto',
    method: 'get'
  });
  console.log(ditto)

  return {
    props: {mails},
  }
}

export default Encomendas