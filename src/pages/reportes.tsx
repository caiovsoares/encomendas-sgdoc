import React, { useState } from 'react';
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Switch,
  Text,
} from '@chakra-ui/react';
import { getAPIClient } from '../services/apiClient';
import { GetServerSideProps } from 'next';
import { Report, User } from '../interfaces';
import { invertStringDate } from '../utils';

type reportesProps = {
  reports: Report[];
};

const Reportes = ({ reports }: reportesProps) => {
  const [showResolvedReports, setShowResolvedReports] = useState(false);
  reports[0].resolution = 'teste';
  reports[0].resolved_at = '2023/02/12';
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
            .filter((report) => !!report.resolution)
            .map((report) => (
              <Flex
                borderRadius={10}
                p={4}
                _hover={{ bg: 'backgroundHover' }}
                key={report.id}
              >
                <Grid
                  w='100%'
                  templateColumns='min-content 1fr'
                  alignItems='center'
                  gap={2}
                >
                  <GridItem>
                    <Heading size='sm' textAlign='right'>
                      Autor:
                    </Heading>
                  </GridItem>
                  <GridItem>
                    {report.author} ({invertStringDate(report.created_at)})
                  </GridItem>
                  <GridItem>
                    <Heading size='sm' textAlign='right'>
                      Mensagem:
                    </Heading>
                  </GridItem>
                  <GridItem>
                    <Text>{report.content}</Text>
                  </GridItem>
                  {report.resolution && (
                    <>
                      <GridItem>
                        <Heading size='sm' textAlign='right'>
                          Resolução:
                        </Heading>
                      </GridItem>
                      <GridItem>
                        <Text>
                          {report.resolution} - Em:{' '}
                          {invertStringDate(report.resolved_at)}
                        </Text>
                      </GridItem>
                    </>
                  )}
                </Grid>
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
