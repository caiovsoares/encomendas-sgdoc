import { Button, Flex, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import { exampleMails } from '../utils'
import { useTable, useSortBy } from 'react-table'

const Index = (props) => (
  <Flex width='100%' flexDir='column'>
    <Flex flexDir='row' h='10vh'>
      <Button>oi</Button>
    </Flex>
    <Flex flexDir='row' alignItems='center' h='80vh' width='100%' overflowY='scroll'>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Rastreio</Th>
            <Th>Remetente</Th>
            <Th>Destinatário</Th>
            <Th>Recebido</Th>
          </Tr>
        </Thead>
        <Tbody>
          {props.exampleMails.map(e =>
            <Tr>
              <Td>{e.tracking}</Td>
              <Td>{e.sender}</Td>
              <Td>{e.destiny.warName}</Td>
              <Td>{e.receiver.warName}</Td>
            </Tr>)}
        </Tbody>
      </Table>
    </Flex>
    <Flex flexDir='row' h='10vh'>
      <Button>oi</Button>
    </Flex>
    {/*props.exampleMails.map(e => <Button key={e.id}>{e.id+' '+e.destiny.fullName}</Button>)*/}
  </Flex>
)

export async function getStaticProps(context) {
  return {
    props: {exampleMails},
  }
}

export default Index