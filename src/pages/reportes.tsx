import React, { useState } from 'react';
import { Box, Flex, Heading, Switch, Text } from '@chakra-ui/react';
import { getAPIClient } from '../services/apiClient';
import { GetServerSideProps } from 'next';
import { Report, User } from '../interfaces';

type reportesProps = {
  reports: Report[];
};

const Reportes = ({ reports }: reportesProps) => {
  const [showResolvedReports, setShowResolvedReports] = useState(true);

  return (
    <Box w='100%' h='100%' pt={7} pb={3}>
      <Box h='100%' overflowY='auto'>
        <Flex
          ml={5}
          bg='backgroundHover'
          h={10}
          w='fit-content'
          px={4}
          alignItems='center'
          borderRadius={20}
          mb={2}
        >
          <Heading
            fontSize={!showResolvedReports ? 'md' : 'sm'}
            color={!showResolvedReports ? 'black' : 'gray.400'}
          >
            Abertos
          </Heading>
          <Switch
            variant='monoColor'
            size='sm'
            mx={1}
            onChange={(e) => setShowResolvedReports(e.target.checked)}
          />
          <Heading
            fontSize={showResolvedReports ? 'md' : 'sm'}
            color={showResolvedReports ? 'black' : 'gray.400'}
          >
            Resolvidos
          </Heading>
        </Flex>
        <Flex px={5} flexDir='column'>
          {reports
            .filter((report) => !showResolvedReports && !report.resolution)
            .map((report) => (
              <Flex
                borderRadius={10}
                p={4}
                _hover={{ bg: 'backgroundHover' }}
                key={report.id}
              >
                <Flex flexDir='column'>
                  <Heading
                    alignSelf='center'
                    size='sm'
                    w='100%'
                    textAlign='right'
                    mr={2}
                  >
                    Autor:
                  </Heading>
                  <Heading
                    alignSelf='center'
                    size='sm'
                    w='100%'
                    textAlign='right'
                    mr={2}
                  >
                    Mensagem:
                  </Heading>
                </Flex>
                <Flex flexDir='column'>
                  <Text>{report.author || 'Anônimo'}</Text>
                  <Text>{report.content}</Text>
                </Flex>
              </Flex>
            ))}
        </Flex>
      </Box>
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const apiClient = getAPIClient(context);
    const userRes = await apiClient.get('/user/auth');
    const user: User = userRes.data;

    if (userRes.status > 299 || !user?.permission?.editReport)
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };

    const reports = await (await apiClient.get('report')).data;

    return {
      props: { reports },
    };
  } catch (error) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
};

export default Reportes;
