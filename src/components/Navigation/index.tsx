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
  BiBug,
  BiCar,
} from 'react-icons/bi';
import { ImTrello } from 'react-icons/im';
import { ButtonNavigationSession } from './ButtonNavigationSession';
import { AuthContext } from '../../contexts/AuthContext';
import { useRouter } from 'next/router';

export const Navigation = () => {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  return (
    <Flex
      direction='column'
      boxShadow='0px 0px 5px 2px #1A365D'
      bg='navigation'
      height='100%'
      alignItems='center'
      justifyContent='space-between'
      width='fit-content'
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
        <ButtonNavigation href='/' icon={<BiHome size='20px' />}>
          Início
        </ButtonNavigation>
        {user?.permission?.editMail && (
          <>
            <ButtonNavigation href='/encomendas' icon={<BiGift size='20px' />}>
              Encomendas
            </ButtonNavigation>
            <ButtonNavigation href='/lista' icon={<BiListUl size='20px' />}>
              Lista Cadetes
            </ButtonNavigation>
          </>
        )}

        {user?.permission?.editReceiver && (
          <ButtonNavigation
            href='/destinatarios'
            icon={<BiSmile size='20px' />}
          >
            Destinatarios
          </ButtonNavigation>
        )}

        {user?.permission?.editExpedition && (
          <ButtonNavigation href='/expedicoes' icon={<BiWorld size='20px' />}>
            Expedições
          </ButtonNavigation>
        )}

        {user?.permission?.editUser && (
          <ButtonNavigation
            href='/usuarios'
            icon={<BiUserCircle size='20px' />}
          >
            Usuários
          </ButtonNavigation>
        )}

        {user?.permission?.editUser && (
          <ButtonNavigation
            href='/permissoes'
            icon={<BiClipboard size='20px' />}
          >
            Permissões
          </ButtonNavigation>
        )}

        {user?.permission?.editShippingCompany && (
          <ButtonNavigation
            href='/transportadoras'
            icon={<BiCar size='20px' />}
          >
            Transportadoras
          </ButtonNavigation>
        )}

        {user?.permission?.editReport && (
          <ButtonNavigation href='/reportes' icon={<BiBug size='20px' />}>
            Reportes
          </ButtonNavigation>
        )}
      </Flex>
      <Flex flexDir='column' height='auto' alignItems='center' width='100%'>
        <ButtonNavigation
          href='https://trello.com/b/lCeNCQcB/encomendas-sgdoc'
          icon={<ImTrello size='20px' />}
        >
          Trello
        </ButtonNavigation>
        <ButtonNavigationSession />
      </Flex>
    </Flex>
  );
};
