import {
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Flex,
  Image,
  Heading,
  Text,
  Box,
  Tfoot,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { MailListMail } from '../interfaces';
import { findReceiverShortName, invertStringDate } from '../utils';

type CadetListProps = {
  mails: MailListMail[];
  date: string;
};

export const CadetList = ({ mails, date }: CadetListProps) => {
  const router = useRouter();
  return (
    <Box paddingX={10}>
      <Flex
        mt={10}
        flexDir='column'
        alignItems='center'
        justifyContent='center'
      >
        <Image
          src={`${router.basePath}/brasao-brasil.png`}
          h='100px'
          minW='100px'
        />
        <Heading size='md' mt={3}>
          MINISTÉRIO DA DEFESA
        </Heading>
        <Text>COMANDO DA AERONÁUTICA</Text>
        <Text decoration='underline'>ACADEMIA DA FORÇA AÉREA</Text>
      </Flex>
      <Table width='100%' variant='striped' size='sm'>
        <Thead>
          <Tr>
            <Th colSpan={3}>
              <br />
            </Th>
          </Tr>
          <Tr>
            <Th>Rastreio</Th>
            <Th>Remetente</Th>
            <Th>Destinatário</Th>
          </Tr>
        </Thead>
        <Tbody>
          {mails.map((mail) => (
            <Tr key={mail.id}>
              <Td>{mail.tracking}</Td>
              <Td>{mail.sender}</Td>
              <Td>{findReceiverShortName(mail.destiny)}</Td>
            </Tr>
          ))}
        </Tbody>
        <Tfoot>
          <Tr>
            <Td colSpan={3} mt={5} paddingInline={5}>
              <br />
              <hr />
              <br />
              <br />
              <hr />
              <Text align='center'>
                NOME DE GUERRA - IDENTIDADE MILITAR - ASSINATURA
              </Text>
              <Text size='xsm' align='right'>
                {invertStringDate(date)}
              </Text>
              <Text size='xsm' align='left'>
                Total: {mails.length}
              </Text>
            </Td>
          </Tr>
          <Tr>
            <Td colSpan={3}>
              <br />
            </Td>
          </Tr>
        </Tfoot>
      </Table>
    </Box>
  );
};
