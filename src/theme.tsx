import { ComponentStyleConfig, extendTheme } from '@chakra-ui/react';
import { switchAnatomy } from '@chakra-ui/anatomy';
import { createBreakpoints } from '@chakra-ui/theme-tools';

const fonts = { mono: `'Menlo', monospace` };

const breakpoints = createBreakpoints({
  sm: '40em',
  md: '52em',
  lg: '64em',
  xl: '80em',
});

const Switch: ComponentStyleConfig = {
  parts: ['track'],
  variants: {
    monoColor: {
      track: {
        bg: 'menuButton',
        _checked: {
          bg: 'menuButton',
        },
      },
    },
  },
};

const theme = extendTheme({
  semanticTokens: {
    colors: {
      text: {
        default: 'black',
        _dark: 'white',
      },
      menuButton: {
        default: 'blue.700',
        _dark: 'blue.900',
      },
      menuButtonHover: {
        default: 'blue.900',
        _dark: 'blue.700',
      },
      alertButton: {
        default: 'red.700',
        _dark: 'red.900',
      },
      alert: {
        default: 'red.500',
        _dark: 'red.500',
      },
      tutorial: {
        default: 'gray.400',
        _dark: 'gray.600',
      },
      alertButtonHover: {
        default: 'red.900',
        _dark: 'red.700',
      },
      menuButtonText: {
        default: 'white',
        _dark: 'white',
      },
      background: {
        default: 'white',
        _dark: 'gray.900',
      },
      navigation: {
        default: 'blue.700',
        _dark: 'blue.900',
      },
      backgroundHover: {
        default: 'gray.200',
        _dark: 'gray.700',
      },
    },
  },
  fonts,
  breakpoints,
  components: {
    Switch,
  },
});

export default theme;
