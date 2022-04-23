import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Flex,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { PageButton } from '../../components/PageButton';
import { InputDate } from './InputDate';

export const SearchButton = ({ href, children }) => {
  const router = useRouter();
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  return (
    <Popover>
      <PopoverTrigger>
        <PageButton onClick={() => {}}>{children}</PageButton>
      </PopoverTrigger>
      <PopoverContent w='fit-content'>
        <PopoverBody>
          <Flex flexDir='row' alignItems='center'>
            De: <InputDate setDate={setFromDate} />
            Até: <InputDate setDate={setToDate} />
            <PageButton
              onClick={() => {
                router.push(`${href}?from=${fromDate}&to=${toDate}`);
              }}
            >
              Atualizar
            </PageButton>
          </Flex>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
