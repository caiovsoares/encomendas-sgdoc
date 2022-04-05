import { extendTheme } from '@chakra-ui/react'
import { createBreakpoints } from '@chakra-ui/theme-tools'

const fonts = { mono: `'Menlo', monospace` }

const breakpoints = createBreakpoints({
  sm: '40em',
  md: '52em',
  lg: '64em',
  xl: '80em',
})

const theme = extendTheme({
  semanticTokens:{
    colors: {
      text:{
        default:'black',
        _dark:'white'
      },      
      menuButton:{
        default:'blue.700',
        _dark:'blue.900'
      },
      menuButtonText:{
        default:'white',
        _dark:'white'
      },
      background:{
        default:'white',
        _dark:'gray.900'
      },
      navigation:{
        default:'blue.700',
        _dark:'blue.900'
      },
    },
  },
  fonts,
  breakpoints,
})

export default theme
