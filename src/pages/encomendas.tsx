import  React  from 'react'
import { Button, ButtonGroup, Flex, IconButton, Input, Table, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react'
import { bigExampleMails, exampleMails } from '../utils'
import ReactTable from '../components/ReactTable'
import { AddIcon, MinusIcon } from '@chakra-ui/icons'


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
    <Flex flexDir='row' alignItems='center' h='7vh'>
      <Input
        placeholder="Nome, Rastreio ou outro dado"
        w="30%"
        boxShadow="lg"
        bg="gray.50"
        h="12"
      />

      <Text fontSize="xl">De:</Text>
      <Input
        type="date"
        w="45"
        boxShadow="lg"
        bg="gray.50"
        h="12"
      />

      <Text fontSize="xl" >Até:</Text>
      <Input
        type="date"
        w="45"
        boxShadow="lg"
        bg="gray.50"
        h="12"
      />

      <Button
        _hover={{ filter: "brightness(0.9)" }}
        background="blue.700"
        color="gray.50"
        boxShadow="md"
        p="6"
        rounded="md"
      >
        Atualizar
      </Button>

      <Button
        //onOpen={onOpen}
        _hover={{ filter: "brightness(0.9)" }}
        background="blue.700"
        color="gray.50"
        boxShadow="md"
        p="6"
        rounded="md"
      >
        Novo Cadastro
      </Button>

    </Flex>
    <Flex flexDir='row' alignItems='center' h='86vh' width='100%'>
      <ReactTable columns={columns} data={data}/>
    </Flex>
    <Flex flexDir='row' alignItems='center' h='7vh'>
      <Button
        //onOpen={onOpen}
        _hover={{ filter: "brightness(0.9)" }}
        background="blue.700"
        color="gray.50"
        boxShadow="md"
        p="6"
        rounded="md"
      >
        Registrar Recebimento
      </Button>

      <ButtonGroup size="lg" isAttached variant="outline">
        <IconButton aria-label="Mais Itens" icon={<AddIcon />} />
        <IconButton aria-label="Menos Itens" icon={<MinusIcon />} />
      </ButtonGroup>


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