import { ChakraProvider } from '@chakra-ui/react'

import theme from '../theme'
import { AppProps } from 'next/app'

import { Container } from '../components/Container'
import { DarkModeSwitch } from '../components/DarkModeSwitch'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <Container >
        <Component {...pageProps} />
        <DarkModeSwitch/>
      </Container>
    </ChakraProvider>
  )
}

export default MyApp
