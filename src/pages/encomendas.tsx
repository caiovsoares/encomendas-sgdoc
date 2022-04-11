import  React  from 'react'
import {  Box, Button, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import { exampleMails } from '../utils'
import ReactTable from '../components/ReactTable'
import { PageButton } from '../components/PageButton'
import { BiCheckCircle, BiInfoCircle, BiXCircle } from 'react-icons/bi'


const Encomendas = (props) => {

  const { isOpen, onOpen, onClose } = useDisclosure()

  const columns = React.useMemo(
    () => [
          {
            Header: 'Rastreio',
            accessor: 'tracking'
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
                <BiInfoCircle size='30px' onClick={onOpen}/>
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
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay backdropFilter='blur(5px)'/>
        <ModalContent>
          <ModalHeader>Detalhes</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <strong>titulo</strong>
            <p>opa bao?</p>
          </ModalBody>
          <ModalFooter>
              <Button mr='10px'>Editar</Button>
              <Button>Excluir</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
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

  const mails = exampleMails(100);


  return {
    props: {mails},
  }
}

export default Encomendas