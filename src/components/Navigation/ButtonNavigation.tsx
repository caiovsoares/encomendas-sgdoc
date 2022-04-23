import { Box, Button } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export const ButtonNavigation = ({ href, children, icon }) => {
  const { asPath } = useRouter();

  return (
    <Link href={href}>
      <Button
        margin={2}
        marginTop={4}
        padding={0}
        variant='ghost'
        bg={asPath === href ? 'menuButtonHover' : ''}
        _hover={{ bg: 'menuButtonHover' }}
        width='calc(100% - 20px)'
        overflow='clip'
        color='menuButtonText'
        justifyContent='left'
      >
        <Box w='30px' h='30px' margin='10px'>
          {icon}
        </Box>
        {children}
      </Button>
    </Link>
  );
};
