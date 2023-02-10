import { Box, Button, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export const ButtonNavigation = ({ href, children, icon }) => {
  const { asPath } = useRouter();

  return (
    <Link href={href}>
      <Button
        marginTop={1}
        mx={2}
        py={1}
        pl={0}
        pr={1}
        w='90%'
        h='fit-content'
        _focus={{}}
        bg={asPath === href ? 'menuButtonHover' : ''}
        _hover={{ bg: 'menuButtonHover' }}
        color='menuButtonText'
        justifyContent='left'
      >
        <Box w='20px' h='20px' mx='5px'>
          {icon}
        </Box>
        <Text fontSize='sm'>{children}</Text>
      </Button>
    </Link>
  );
};
