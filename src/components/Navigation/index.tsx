import { Button, Flex, Image, Img } from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { ButtonNavigation } from './ButtonNavigation';
import {
  BiGift,
  BiHome,
  BiUserCircle,
  BiWorld,
  BiSmile,
  BiClipboard,
  BiListUl,
} from 'react-icons/bi';
import { ImTrello } from 'react-icons/im';
import { ButtonNavigationSession } from './ButtonNavigationSession';
import { AuthContext } from '../../contexts/AuthContext';
import { useRouter } from 'next/router';

export const Navigation = () => {
  const [isOpen, changeMenuState] = useState(false);
  const { user } = useContext(AuthContext);
  const router = useRouter();
  return (
    <Flex
      direction='column'
      boxShadow='0px 0px 10px 5px #1A365D'
      bg='navigation'
      height='100%'
      alignItems='center'
      justifyContent='space-between'
      width={isOpen ? '200px' : '70px'}
      transition='width 1s'
      onMouseEnter={() => changeMenuState(true)}
      onMouseLeave={() => changeMenuState(false)}
    >
      <Flex flexDir='column' height='auto' alignItems='center' width='100%'>
        <Img
          src={`${router.basePath}/gladio.png`}
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
          <>
            <ButtonNavigation href='/encomendas' icon={<BiGift size='30px' />}>
              Encomendas
            </ButtonNavigation>
            <ButtonNavigation href='/lista' icon={<BiListUl size='30px' />}>
              Lista Cadetes
            </ButtonNavigation>
          </>
        )}

        {user?.permission?.editReceiver && (
          <ButtonNavigation
            href='/destinatarios'
            icon={<BiSmile size='30px' />}
          >
            Destinatarios{' '}
          </ButtonNavigation>
        )}

        {/* {user?.permission?.editExpedition && (
          <ButtonNavigation href='/expedicoes' icon={<BiWorld size='30px' />}>
            Expedições{' '}
          </ButtonNavigation>
        )} */}

        {user?.permission?.editUser && (
          <ButtonNavigation
            href='/usuarios'
            icon={<BiUserCircle size='30px' />}
          >
            Usuários{' '}
          </ButtonNavigation>
        )}

        {user?.permission?.editUser && (
          <ButtonNavigation
            href='/permissoes'
            icon={<BiClipboard size='30px' />}
          >
            Permissões{' '}
          </ButtonNavigation>
        )}
      </Flex>
      <Flex flexDir='column' height='auto' alignItems='center' width='100%'>
        <ButtonNavigation
          href='https://trello.com/b/lCeNCQcB/encomendas-sgdoc'
          icon={<ImTrello size='30px' />}
        >
          Trello
        </ButtonNavigation>
        <ButtonNavigationSession />
      </Flex>
    </Flex>
  );
};
