import  React  from 'react'
import {  Flex } from '@chakra-ui/react'
import { bigExampleMails, exampleMails } from '../utils'
import ReactTable from '../components/ReactTable'
import { PageButton } from '../components/PageButton'


const Encomendas = (props) => {

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
          },
        ],
    []
  )
  
  const data = React.useMemo(() => props.mails, [])
  
  return(
  <Flex width='100%' flexDir='column'>
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

export async function getServerSideProps(context) {

  const mails = bigExampleMails();


  return {
    props: {mails},
  }
}

export default Encomendas