import {
  Box,
  Flex,
  Heading,
  Image,
  Slide,
  Text,
  useDisclosure,
} from '@chakra-ui/react';

export const ShowTutorial = () => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <>
      <Text onClick={onToggle} fontSize='sm' color='tutorial'>
        Ver tutorial
      </Text>
      <Slide direction='bottom' in={isOpen} style={{ zIndex: 10 }}>
        <Box
          mt='4'
          bg='navigation'
          rounded='md'
          shadow='md'
          color='menuButtonText'
        >
          <Text onClick={onToggle} ml='20px'>
            {'< '}voltar
          </Text>
          <Box p='40px' maxH='93vh' overflowY='auto'>
            <Heading size='xl'>1. Criar a Planilha</Heading>
            <Text>
              Crie uma tabela no editor de planilhas de sua preferência e
              preencha os dados dos novos destinatários a serem inseridos no
              sistema utilizando a primeira linha como cabeçalho com as
              seguintes informações:
            </Text>
            <Text ml='40px'>fullName, warName, classYear, cpf, identity</Text>
            <Text ml='40px' color='alert'>
              É importante que o cabeçalho(linha 1) possua exatamente essa mesma
              configuração
            </Text>
            <Text>Exemplo:</Text>
            <Image src='/tutorial/tutorial1.png' />
            <Heading size='xl' mt='40px'>
              2. Salvar
            </Heading>
            <Text>
              Exporte a planilha de seu editor em um dos formatos aceitos:
            </Text>
            <Text ml='40px'>.xlsx .xls ou .csv</Text>
            <Text>Exemplos:</Text>
            <Flex>
              <Image boxSize='35vw' src='tutorial/tutorial2.png' />
              <Image boxSize='35vw' src='tutorial/tutorial3.png' ml='40px' />
            </Flex>
          </Box>
        </Box>
      </Slide>
    </>
  );
};
