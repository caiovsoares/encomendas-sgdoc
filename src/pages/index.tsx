import  React  from 'react'
import { Button, Flex, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import { exampleMails, bigExampleMails } from '../utils'
  import ReactTable from '../components/ReactTable'
  import axios from 'axios'


const Index = (props) => {

  const columns = React.useMemo(
    () => [
      {
        Header: 'SGDOC',
        columns: [
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
      },
    ],
    []
  )
  
  const data = React.useMemo(() => props.mails, [])
  
  return(
  <Flex width='100%' flexDir='column'>
    <Flex flexDir='row' h='10vh'>
      <Button>oi</Button>
    </Flex>
    <Flex flexDir='row' alignItems='center' h='80vh' width='100%' overflowY='auto'>
      <ReactTable columns={columns} data={data}/>
    </Flex>
    <Flex flexDir='row' h='10vh'>
      <Button>oi</Button>
    </Flex>
  </Flex>
)}

export async function getServerSideProps(context) {

  const mails = bigExampleMails();

  return {
    props: {mails},
  }
}

export default Index