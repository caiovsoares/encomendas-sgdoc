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
            <Text ml='40px'>
              •Para inserir diversos{' '}
              <strong>
                CADETES: nome completo, nome de guerra, cpf, identidade, ano
              </strong>
            </Text>
            <Text ml='40px'>
              •Para inserir diversos{' '}
              <strong>
                MILITARES: nome completo, nome de guerra, cpf, identidade, posto
              </strong>
            </Text>
            <Text ml='40px'>
              •Para inserir diversos <strong>SETORES: nome, sigla</strong>
            </Text>
            <Text ml='40px' color='alert' bg='yellow' w='fit-content'>
              <strong>
                É importante que o cabeçalho(linha 1) possua exatamente essa
                mesma configuração
              </strong>
            </Text>
            <Text>Exemplo Cadete:</Text>
            <Image src='/tutorial/exemploCadete.png' />
            <Text>Exemplo Militar:</Text>
            <Text>
              Os valores válidos para posto são: S2, S1, CB, 3S, 2S, 1S, SO,
              ASP, 2T, 1T, CAP, MAJ, TC, CEL, BR, MBR, TBR, MAR
            </Text>
            <Image src='/tutorial/exemploMilitar.png' />
            <Text>Exemplo Setor:</Text>
            <Image src='/tutorial/exemploSetor.png' />
            <Heading size='xl' mt='40px'>
              2. Salvar
            </Heading>
            <Text>
              Exporte a planilha de seu editor em um dos formatos aceitos:
            </Text>
            <Text ml='40px'>.xlsx .xls ou .csv</Text>
            <Text>Exemplos:</Text>
            <Flex>
              <Image src='tutorial/salvar1.png' />
              <Image src='tutorial/salvar2.png' ml='40px' />
            </Flex>
            <Heading size='xl' mt='40px'>
              3. Escolher o Arquivo e Enviar
            </Heading>
            <Text>
              Clique em Escolher Arquivo e procure a planilha salva navegando
              pelos arquivos de seu computador, abra e clique em enviar:
            </Text>
            <Text>Exemplos:</Text>
            <Image src='tutorial/escolher.png' />
            <Image src='tutorial/abrir.png' mt={3} />
            <Image src='tutorial/enviar.png' mt={3} />
          </Box>
        </Box>
      </Slide>
    </>
  );
};
