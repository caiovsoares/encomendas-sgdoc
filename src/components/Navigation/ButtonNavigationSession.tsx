import { Box, Button, Image } from '@chakra-ui/react';
import Link from 'next/link';
import { BiLogInCircle, BiLogOutCircle } from 'react-icons/bi';
import { ButtonNavigation } from './ButtonNavigation';

export const ButtonNavigationSession = ({ session, signIn, signOut }) => {
  if (session)
    return (
      <>
        <Button
          margin={2}
          marginTop={4}
          padding={0}
          variant='ghost'
          _hover={{ bg: 'menuButtonHover' }}
          width='calc(100% - 20px)'
          overflow='clip'
          color='menuButtonText'
          justifyContent='left'
        >
          <Box w='30px' h='30px' margin='10px'>
            <Image src='patentes/G05-FAB_Primeiro_Sargento.svg' minW='30px' />
          </Box>
          {session?.user?.warName}
        </Button>
        <Button
          onClick={signOut}
          margin={2}
          marginTop={4}
          padding={0}
          variant='ghost'
          _hover={{ bg: 'menuButtonHover' }}
          width='calc(100% - 20px)'
          overflow='clip'
          color='menuButtonText'
          justifyContent='left'
        >
          <Box w='30px' h='30px' margin='10px'>
            <BiLogOutCircle size='30px' />
          </Box>
          Logout
        </Button>
      </>
    );
  else
    return (
      <Button
        onClick={signIn}
        margin={2}
        marginTop={4}
        padding={0}
        variant='ghost'
        _hover={{ bg: 'menuButtonHover' }}
        width='calc(100% - 20px)'
        overflow='clip'
        color='menuButtonText'
        justifyContent='left'
      >
        <Box w='30px' h='30px' margin='10px'>
          <BiLogInCircle size='30px' />
        </Box>
        Login
      </Button>
    );
};
