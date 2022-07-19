import { Box, Button, Image } from '@chakra-ui/react';
import { BiLogInCircle, BiLogOutCircle } from 'react-icons/bi';

export const ButtonNavigationSession = ({ session, signIn, signOut }) => {
  const ranks = {
    FAB: 'FAB.png',
    S2: 'S2.png',
    S1: 'S1.png',
    CB: '2S.png',
    _3S: '3S.png',
    _2S: '2S.png',
    _1S: '1S.png',
    SO: 'G06-FAB_Suboficial.png',
    ASP: 'G07-FAB_Aspirante.png',
    _2T: 'G08-FAB_Segundo-Tenente.gif',
    _1T: 'G09-FAB_Primeiro-Tenente.gif',
    CAP: 'G10-FAB_Capitao.gif',
    MAJ: 'G11-FAB_Major.gif',
    TC: 'G12-FAB_Tenente-Coronel.gif',
    CEL: 'G13-FAB_Coronel.png',
  };

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
          <Box w='30px' h='30px' margin='10px' justifyContent='center'>
            <Image
              src={`patentes/${ranks[session?.user?.rank]}`}
              h='30px'
              minW='30px'
            />
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
