import { Input } from '@chakra-ui/react';

export const InputDate = ({ setDate }) => {
  return (
    <Input
      onChange={(e) => {
        setDate(e.target.value);
      }}
      type='date'
      size='sm'
      w='fit-content'
      marginInline='10px'
    />
  );
};
