import { ChakraProvider } from '@chakra-ui/react';

import theme from '../theme';
import { AppProps } from 'next/app';

import { Container } from '../components/DarkMode/Container';
import { DarkModeSwitch } from '../components/DarkMode/DarkModeSwitch';
import { AuthProvider } from '../contexts/AuthContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <AuthProvider>
        <head>
          <title>SGDOC</title>
        </head>
        <Container>
          <Component {...pageProps} />
          <DarkModeSwitch />
        </Container>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
