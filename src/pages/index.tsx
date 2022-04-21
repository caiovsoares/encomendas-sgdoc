import React from 'react';
import {
  Button,
  Flex,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { exampleMails } from '../utils';
import ReactTable from '../components/ReactTable';

const Index = (props) => {
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
  );

  const data = React.useMemo(() => props.mails, []);

  return (
    <Flex width='100%' flexDir='column'>
      <Flex backgroundColor='red' flexDir='row' h='7vh'>
        <Button>oi</Button>
      </Flex>
      <Flex flexDir='row' alignItems='center' h='86vh' width='100%'>
        {/* <ReactTable columns={columns} data={data} /> */}
      </Flex>
      <Flex backgroundColor='red' flexDir='row' h='7vh'>
        <Button>oi</Button>
      </Flex>
      1
    </Flex>
  );
};

export async function getServerSideProps(context) {
  const mails = exampleMails(100);

  return {
    props: { mails },
  };
}

export default Index;
