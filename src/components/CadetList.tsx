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
import { Mail } from '../interfaces';
import { findReceiverShortName, invertStringDate } from '../utils';

type CadetListProps = {
  mails: Mail[];
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
            <br />
          </Tr>
          <Tr>
            <Th>Rastreio</Th>
            <Th>Remetente</Th>
            <Th>Destinatário</Th>
          </Tr>
        </Thead>
        <Tbody>
          {mails.map((mail) => (
            <Tr>
              <Td>{mail.tracking}</Td>
              <Td>{mail.sender}</Td>
              <Td>{findReceiverShortName(mail.destiny)}</Td>
            </Tr>
          ))}
          {mails.map((mail) => (
            <Tr>
              <Td>{mail.tracking}</Td>
              <Td>{mail.sender}</Td>
              <Td>{findReceiverShortName(mail.destiny)}</Td>
            </Tr>
          ))}
          {mails.map((mail) => (
            <Tr>
              <Td>{mail.tracking}</Td>
              <Td>{mail.sender}</Td>
              <Td>{findReceiverShortName(mail.destiny)}</Td>
            </Tr>
          ))}
          {mails.map((mail) => (
            <Tr>
              <Td>{mail.tracking}</Td>
              <Td>{mail.sender}</Td>
              <Td>{findReceiverShortName(mail.destiny)}</Td>
            </Tr>
          ))}
          {mails.map((mail) => (
            <Tr>
              <Td>{mail.tracking}</Td>
              <Td>{mail.sender}</Td>
              <Td>{findReceiverShortName(mail.destiny)}</Td>
            </Tr>
          ))}
          {mails.map((mail) => (
            <Tr>
              <Td>{mail.tracking}</Td>
              <Td>{mail.sender}</Td>
              <Td>{findReceiverShortName(mail.destiny)}</Td>
            </Tr>
          ))}
          {mails.map((mail) => (
            <Tr>
              <Td>{mail.tracking}</Td>
              <Td>{mail.sender}</Td>
              <Td>{findReceiverShortName(mail.destiny)}</Td>
            </Tr>
          ))}
          {mails.map((mail) => (
            <Tr>
              <Td>{mail.tracking}</Td>
              <Td>{mail.sender}</Td>
              <Td>{findReceiverShortName(mail.destiny)}</Td>
            </Tr>
          ))}
          {mails.map((mail) => (
            <Tr>
              <Td>{mail.tracking}</Td>
              <Td>{mail.sender}</Td>
              <Td>{findReceiverShortName(mail.destiny)}</Td>
            </Tr>
          ))}
          {mails.map((mail) => (
            <Tr>
              <Td>{mail.tracking}</Td>
              <Td>{mail.sender}</Td>
              <Td>{findReceiverShortName(mail.destiny)}</Td>
            </Tr>
          ))}
          {mails.map((mail) => (
            <Tr>
              <Td>{mail.tracking}</Td>
              <Td>{mail.sender}</Td>
              <Td>{findReceiverShortName(mail.destiny)}</Td>
            </Tr>
          ))}
          {mails.map((mail) => (
            <Tr>
              <Td>{mail.tracking}</Td>
              <Td>{mail.sender}</Td>
              <Td>{findReceiverShortName(mail.destiny)}</Td>
            </Tr>
          ))}
          {mails.map((mail) => (
            <Tr>
              <Td>{mail.tracking}</Td>
              <Td>{mail.sender}</Td>
              <Td>{findReceiverShortName(mail.destiny)}</Td>
            </Tr>
          ))}
          {mails.map((mail) => (
            <Tr>
              <Td>{mail.tracking}</Td>
              <Td>{mail.sender}</Td>
              <Td>{findReceiverShortName(mail.destiny)}</Td>
            </Tr>
          ))}
          {mails.map((mail) => (
            <Tr>
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
            </Td>
          </Tr>
          <Tr>
            <br />
          </Tr>
        </Tfoot>
      </Table>
    </Box>
  );
};
