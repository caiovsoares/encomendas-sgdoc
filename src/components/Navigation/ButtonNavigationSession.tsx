import { Box, Button, Image, Text, useDisclosure } from '@chakra-ui/react';
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
    BR: 'G14-FAB_Brigadeiro.png',
    MBR: 'G15-FAB_Major-Brigadeiro.png',
    TBR: 'G16-FAB_Tenente-Brigadeiro.png',
    MAR: 'G17-FAB_Marechal-do-Ar.png',
  };

  const { isAuthenticated, signOut, user } = useContext(AuthContext);

  const { isOpen, onOpen, onClose } = useDisclosure();

  if (isAuthenticated)
    return (
      <>
        <Button
          marginTop={1}
          mx={2}
          pl={0}
          pr={1}
          w='90%'
          h='fit-content'
          bg={''}
          _hover={{}}
          _focus={{}}
          _active={{}}
          cursor='default'
          color='menuButtonText'
          justifyContent='left'
        >
          <Box w='20px' h='20px' margin='5px' justifyContent='center'>
            <Image
              src={`${router.basePath}/patentes/${ranks[user.rank]}`}
              h='20px'
              minW='20px'
            />
          </Box>
          <Text fontSize='sm'>{`${user.rank} ${user.warName}`}</Text>
        </Button>
        <Button
          onClick={signOut}
          my={1}
          mx={2}
          pl={0}
          pr={1}
          w='90%'
          h='fit-content'
          bg=''
          _hover={{ bg: 'menuButtonHover' }}
          _focus={{}}
          color='menuButtonText'
          justifyContent='left'
        >
          <Box w='20px' h='20px' margin='5px'>
            <BiLogOutCircle size='20px' />
          </Box>
          <Text fontSize='sm'>Logout</Text>
        </Button>
      </>
    );
  else
    return (
      <>
        <Button
          onClick={onOpen}
          marginTop={1}
          mx={2}
          pl={0}
          pr={1}
          w='90%'
          h='fit-content'
          bg=''
          _hover={{ bg: 'menuButtonHover' }}
          color='menuButtonText'
          justifyContent='left'
        >
          <Box w='20px' h='20px' margin='5px'>
            <BiLogInCircle size='20px' />
          </Box>
          <Text fontSize='sm'>Login</Text>
        </Button>
        <LoginModal onClose={onClose} isOpen={isOpen} />
      </>
    );
};
