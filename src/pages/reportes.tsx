import React from 'react';
import { Flex } from '@chakra-ui/react';
import { getAPIClient } from '../services/apiClient';
import { GetServerSideProps } from 'next';
import { Report, User } from '../interfaces';

type reportesProps = {
  reports: Report[];
};

const Reportes = ({ reports }: reportesProps) => {
  console.log(reports);
  return <Flex width='100%' flexDir='column'></Flex>;
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
