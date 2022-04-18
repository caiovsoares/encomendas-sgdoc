import { ChakraProvider } from '@chakra-ui/react'
import { SessionProvider } from "next-auth/react"

import theme from '../theme'
import { AppProps } from 'next/app'

import { Container } from '../components/DarkMode/Container'
import { DarkModeSwitch } from '../components/DarkMode/DarkModeSwitch'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <SessionProvider session={session}>
        <Container >
          <Component {...pageProps} />
          <DarkModeSwitch />
        </Container>
      </SessionProvider>
    </ChakraProvider>
  )
}

export default MyApp
