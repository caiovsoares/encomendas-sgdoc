import { Button, Flex, Image, Img } from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { ButtonNavigation } from './ButtonNavigation';
import { BiGift, BiHome, BiUserCircle } from 'react-icons/bi';
import { ImTrello } from 'react-icons/im';
import { ButtonNavigationSession } from './ButtonNavigationSession';
import { AuthContext } from '../../contexts/AuthContext';

export const Navigation = () => {
  const [isOpen, changeMenuState] = useState(false);
  const { user } = useContext(AuthContext);
  return (
    <Flex
      direction='column'
      height='100%'
      boxShadow='0px 0px 10px 5px #1A365D'
      bg='navigation'
      alignItems='center'
      width={isOpen ? '200px' : '70px'}
      transition='width 1s'
      onMouseEnter={() => changeMenuState(true)}
      onMouseLeave={() => changeMenuState(false)}
    >
      <Img
        src='gladio.png'
        alt='Gládio Alado'
        mt={5}
        height='80px'
        objectFit='contain'
        width='calc(100% - 10px)'
      />
      <ButtonNavigation href='/' icon={<BiHome size='30px' />}>
        Início{' '}
      </ButtonNavigation>
      {user?.permission?.editMail && (
        <ButtonNavigation href='/encomendas' icon={<BiGift size='30px' />}>
          Encomendas
        </ButtonNavigation>
      )}

      {user?.permission?.editReceiver && (
        <ButtonNavigation
          href='/destinatarios'
          icon={<BiUserCircle size='30px' />}
        >
          Destinatarios{' '}
        </ButtonNavigation>
      )}
      <ButtonNavigation
        href='https://trello.com/b/lCeNCQcB/encomendas-sgdoc'
        icon={<ImTrello size='30px' />}
      >
        Trello
      </ButtonNavigation>
      <ButtonNavigationSession />
    </Flex>
  );
};
