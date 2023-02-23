import { Flex, Heading, Image } from '@chakra-ui/react';

export default function Custom404() {
  return (
    <Flex w='100%' alignItems='center' justifyContent='center' flexDir='column'>
      <Heading size='lg'>Página não encontrada!</Heading>
      <Image src='404.png' h='200px'></Image>
    </Flex>
  );
}
