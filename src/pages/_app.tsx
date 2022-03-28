import { Button, ChakraProvider } from '@chakra-ui/react'

import theme from '../theme'
import { AppProps } from 'next/app'

import { Container } from '../components/Container'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <Container >
        <Component {...pageProps} />
      </Container>
    </ChakraProvider>
  )
}

export default MyApp
