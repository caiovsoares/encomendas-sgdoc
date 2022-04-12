import { Box, Button, ButtonGroup, Flex, Select, Table, Tbody, Td, Text, Th, Thead, Tr, useColorMode } from '@chakra-ui/react'
import React from 'react'
import { BiCheck, BiCheckCircle, BiChevronLeft, BiChevronRight, BiChevronsLeft, BiChevronsRight, BiCommentCheck, BiCommentX, BiXCircle } from 'react-icons/bi'
import { useTable, usePagination, useRowSelect, useGlobalFilter } from 'react-table'
import { GlobalFilter } from './GlobalFilter'
import IndeterminateCheckbox from './IndeterminateCheckbox'

function ReactTable({ columns, data }) {
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
      selectedFlatRows,
      state: { pageIndex, pageSize, selectedRowIds },
      state,
      setGlobalFilter
    } = useTable(
      {
        columns,
        data,        
      },
      useGlobalFilter,
      usePagination,
      useRowSelect,
      hooks => {
        hooks.visibleColumns.push(columns => [
          // Let's make a column for selection
          {
            id: 'selection',
            // The header can use the table's getToggleAllRowsSelectedProps method
            // to render a checkbox
            Header: ({ getToggleAllPageRowsSelectedProps }) => (
              <div>
                <IndeterminateCheckbox {...getToggleAllPageRowsSelectedProps()} />
              </div>
            ),
            // The cell can use the individual row's getToggleRowSelectedProps method
            // to the render a checkbox
            Cell: ({ row }) => (
              <div>
                <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
              </div>
            ),
          },
          ...columns,
        ])
      }
    )

    const { globalFilter } = state
      
    const {colorMode} = useColorMode();

    // Render the UI for your table
    return (
      <Flex height='calc(100% - 20px)' width='100%' mt='10px' mb='10px'>
        <Flex width='10%' justifyContent='center' alignItems='center'>
          <Box boxSize='-webkit-fit-content' boxShadow={canPreviousPage?'-3px 4px 10px 0px '+ (colorMode=='light'?'gray':'#333'):''} borderRadius='6px'>
            <Button bgColor='menuButton' _hover={canPreviousPage && {bg:'menuButtonHover'}} color='menuButtonText' boxShadow='lg' borderRightRadius={0} onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
              <BiChevronsLeft size='20px'/>
            </Button>
            <Button bgColor='menuButton' _hover={canPreviousPage && {bg:'menuButtonHover'}} color='menuButtonText' boxShadow='lg' borderLeftRadius={0} onClick={() => previousPage()} disabled={!canPreviousPage}>
              <BiChevronLeft size='20px'/>
            </Button>
          </Box>
        </Flex>
        <Flex flexDir='column' width='80%' justifyContent='center'>
          <Flex boxShadow='md' overflowY='auto'>
            <Table width='100%' variant="striped" {...getTableProps()}>
              <Thead>
                <Tr>
                  <Th colSpan={5}><GlobalFilter filter={globalFilter} setFilter={setGlobalFilter}/></Th>
                </Tr>
                {headerGroups.map(headerGroup => (
                  <Tr {...headerGroup.getHeaderGroupProps()}>
                    
                    {headerGroup.headers.map(column => (
                      <Th {...column.getHeaderProps()}>{column.render('Header')}</Th>
                    ))}

                  </Tr>
                  
                ))}
              </Thead>
              <Tbody {...getTableBodyProps()}>
                {page.map((row, i) => {
                  prepareRow(row)
                  return (
                    <Tr {...row.getRowProps()}>
                      {row.cells.map((cell, j) => {
                        return <Td {...cell.getCellProps()}>
                            {cell.render('Cell')}
                        </Td>
                      })}
                    </Tr>
                  )
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
              onChange={e => {
                setPageSize(Number(e.target.value))
              }}
            >
              {[5, 10, 20, 30, 40, 50].map(pageSize => (
                <option color='text'  key={pageSize} value={pageSize}>
                  Exibir {pageSize}
                </option>
              ))}
            </Select>
          </Flex>
        </Flex>
        <Flex width='10%' justifyContent='center' alignItems='center'>
          <Box boxSize='-webkit-fit-content' boxShadow={canNextPage?'3px 4px 10px 0px '+ (colorMode=='light'?'gray':'#333'):''} borderRadius='6px'>
            <Button bgColor='menuButton' _hover={canNextPage && {bg:'menuButtonHover'}} color='menuButtonText' borderRightRadius={0} onClick={() => nextPage()} disabled={!canNextPage}>
              <BiChevronRight size='20px'/>
            </Button>
            <Button bgColor='menuButton' _hover={canNextPage && {bg:'menuButtonHover'}} color='menuButtonText' borderLeftRadius={0} onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
              <BiChevronsRight size='20px'/>
            </Button>
          </Box>
        </Flex>
      </Flex>
    )
}

export default ReactTable;