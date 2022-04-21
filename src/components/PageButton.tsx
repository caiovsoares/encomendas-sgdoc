import { Button } from '@chakra-ui/react';

export const PageButton = ({ onClick, children }) => {
  return (
    <Button
      onClick={onClick}
      boxShadow='lg'
      size='sm'
      rounded='md'
      bgColor='menuButton'
      _hover={{ bg: 'menuButtonHover' }}
      color='menuButtonText'
      marginInline='10px'
    >
      {children}
    </Button>
  );
};
