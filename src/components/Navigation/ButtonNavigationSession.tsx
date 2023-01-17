import { Box, Button, Image, useDisclosure } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { BiLogInCircle, BiLogOutCircle } from 'react-icons/bi';
import { AuthContext } from '../../contexts/AuthContext';
import { LoginModal } from './LoginModal';

export const ButtonNavigationSession = () => {
  const router = useRouter();
  const ranks = {
    FAB: 'FAB.png',
    S2: 'S2.png',
    S1: 'S1.png',
    CB: 'CB.png',
    '3S': '3S.png',
    '2S': '2S.png',
    '1S': '1S.png',
    SO: 'G06-FAB_Suboficial.png',
    ASP: 'G07-FAB_Aspirante.png',
    '2T': 'G08-FAB_Segundo-Tenente.gif',
    '1T': 'G09-FAB_Primeiro-Tenente.gif',
    CAP: 'G10-FAB_Capitao.gif',
    MAJ: 'G11-FAB_Major.gif',
    TC: 'G12-FAB_Tenente-Coronel.gif',
    CEL: 'G13-FAB_Coronel.png',
  };

  const { isAuthenticated, signOut, user } = useContext(AuthContext);

  const { isOpen, onOpen, onClose } = useDisclosure();

  if (isAuthenticated)
    return (
      <>
        <Button
          marginInline={2}
          marginTop={1}
          padding={0}
          variant='ghost'
          _hover={{}}
          _focus={{}}
          _active={{}}
          cursor='default'
          width='calc(100% - 20px)'
          overflow='clip'
          color='menuButtonText'
          justifyContent='left'
        >
          <Box w='30px' h='30px' margin='10px' justifyContent='center'>
            <Image
              src={`${router.basePath}/patentes/${ranks[user.rank]}`}
              h='30px'
              minW='30px'
            />
          </Box>
          {`${user.rank} ${user.warName}`}
        </Button>
        <Button
          onClick={signOut}
          marginInline={2}
          marginTop={1}
          padding={0}
          variant='ghost'
          _hover={{ bg: 'menuButtonHover' }}
          _focus={{}}
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
      <>
        <Button
          onClick={onOpen}
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
        <LoginModal onClose={onClose} isOpen={isOpen} />
      </>
    );
};
