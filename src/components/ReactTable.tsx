import {
  Box,
  Button,
  Flex,
  Select,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorMode,
} from '@chakra-ui/react';
import React from 'react';
import {
  BiChevronDown,
  BiChevronLeft,
  BiChevronRight,
  BiChevronsLeft,
  BiChevronsRight,
  BiChevronUp,
} from 'react-icons/bi';
import { GlobalFilter } from './GlobalFilter';

function ReactTable({ tableOptions }) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    //selectedFlatRows,
    state: { pageIndex, pageSize, selectedRowIds },
    state,
    setGlobalFilter,
  } = tableOptions;

  const { globalFilter } = state;

  const { colorMode } = useColorMode();

  // Render the UI for your table
  return (
    <Flex height='calc(100% - 20px)' width='100%' mt='10px' mb='10px'>
      <Flex width='5%' justifyContent='center' alignItems='center'>
        <Flex flexDir='column-reverse' borderRadius='6px'>
          <Button
            size='xs'
            bgColor='menuButton'
            _hover={canPreviousPage && { bg: 'menuButtonHover' }}
            color='menuButtonText'
            boxShadow='lg'
            borderTopRadius={0}
            _focus={{}}
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
          >
            <BiChevronsLeft size='20px' />
          </Button>
          <Button
            size='xs'
            bgColor='menuButton'
            _hover={canPreviousPage && { bg: 'menuButtonHover' }}
            color='menuButtonText'
            boxShadow='lg'
            borderBottomRadius={0}
            _focus={{}}
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          >
            <BiChevronLeft size='20px' />
          </Button>
        </Flex>
      </Flex>
      <Flex flexDir='column' width='90%' justifyContent='center'>
        <Flex boxShadow='md' overflowY='auto'>
          <Table width='100%' variant='striped' size='sm' {...getTableProps()}>
            <Thead>
              <Tr>
                <Th colSpan={10}>
                  <GlobalFilter
                    filter={globalFilter}
                    setFilter={setGlobalFilter}
                  />
                </Th>
              </Tr>
              {headerGroups.map((headerGroup) => (
                <Tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <Th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                    >
                      <Flex flexDir='row' alignItems='center'>
                        {column.render('Header')}
                        {column.isSorted ? (
                          column.isSortedDesc ? (
                            <BiChevronDown size='15px' />
                          ) : (
                            <BiChevronUp size='15px' />
                          )
                        ) : (
                          ''
                        )}
                      </Flex>
                    </Th>
                  ))}
                </Tr>
              ))}
            </Thead>
            <Tbody {...getTableBodyProps()}>
              {page.map((row, i) => {
                prepareRow(row);
                return (
                  <Tr {...row.getRowProps()}>
                    {row.cells.map((cell, j) => {
                      return (
                        <Td {...cell.getCellProps()}>{cell.render('Cell')}</Td>
                      );
                    })}
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </Flex>
        <Flex mt='10px' justifyContent='center' alignItems='center'>
          <Text mr='10px'>
            Pagina{' '}
            <strong>
              {pageIndex + 1} de {pageOptions.length}
            </strong>{' '}
          </Text>
          <Select
            w='auto'
            variant='ghost'
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[5, 10, 15, 20, 30, 40, 50].map((pageSize) => (
              <option color='text' key={pageSize} value={pageSize}>
                Exibir {pageSize}
              </option>
            ))}
          </Select>
        </Flex>
      </Flex>
      <Flex width='5%' justifyContent='center' alignItems='center'>
        <Flex flexDir='column' borderRadius='6px'>
          <Button
            size='xs'
            bgColor='menuButton'
            _hover={canNextPage && { bg: 'menuButtonHover' }}
            color='menuButtonText'
            borderBottomRadius={0}
            _focus={{}}
            onClick={() => nextPage()}
            disabled={!canNextPage}
          >
            <BiChevronRight size='20px' />
          </Button>
          <Button
            size='xs'
            bgColor='menuButton'
            _hover={canNextPage && { bg: 'menuButtonHover' }}
            color='menuButtonText'
            borderTopRadius={0}
            _focus={{}}
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            <BiChevronsRight size='20px' />
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default ReactTable;
