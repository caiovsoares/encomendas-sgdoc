import  React  from 'react'
import { Button, Flex, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import { exampleMails } from '../utils'
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
  
  const data = React.useMemo(exampleMails, [])
  
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
    {/*props.exampleMails.map(e => <Button key={e.id}>{e.id+' '+e.destiny.fullName}</Button>)*/}
  </Flex>
)}

export async function getStaticProps(context) {

  const resultado = (await axios.get('http://localhost:3333/olamundo/')).data;
  


  console.log(resultado)
  const mails = exampleMails();

  return {
    props: {mails},
  }
}

export default Index