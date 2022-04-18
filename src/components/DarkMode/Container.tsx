import { Flex, FlexProps } from '@chakra-ui/react'
import { Navigation } from '../Navigation'

export const Container = (props: FlexProps) => {

  return (
    <Flex
      height='100vh'
      direction="row"
      alignItems="center"
      justifyContent="flex-start"
      bg={'background'}
      color={'text'}
      {...props}
      >
        <Navigation/>
        <Flex
            height='100%'
            width='100%'
        >
            {props.children}
        </Flex>
      </Flex>

  )
}