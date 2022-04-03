import { Button, Flex, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import { BiChevronLeft, BiChevronRight, BiChevronsLeft, BiChevronsRight } from 'react-icons/bi'
import { useTable, usePagination, useRowSelect } from 'react-table'
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
    } = useTable(
      {
        columns,
        data,
      },
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
  
    // Render the UI for your table
    return (
      <Flex height='80vh' width='100%'>
        <Flex width='10%' justifyContent='center' alignItems='center'>
          <Button borderRightRadius={0} onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            <BiChevronsLeft size='20px'/>
          </Button>
          <Button  borderLeftRadius={0} onClick={() => previousPage()} disabled={!canPreviousPage}>
            <BiChevronLeft size='20px'/>
          </Button>
        </Flex>
        <Flex flexDir='column' width='80%' justifyContent='center'>
          <Flex overflowY='auto'>
            <Table width='100%' variant="striped"{...getTableProps()}>
              <Thead>
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
                      {row.cells.map(cell => {
                        return <Td {...cell.getCellProps()}>{cell.render('Cell')}</Td>
                      })}
                    </Tr>
                  )
                })}
              </Tbody>
            </Table>
          </Flex>
          <Flex mt='10px' justifyContent='center'>
            <span>
              Page{' '}
              <strong>
                {pageIndex + 1} of {pageOptions.length}
              </strong>{' '}
            </span>
            <span>
              | Go to page:{' '}
              <input
                type="number"
                defaultValue={pageIndex + 1}
                onChange={e => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0
                  gotoPage(page)
                }}
                style={{ width: '100px' }}
              />
            </span>{' '}
            <select
              value={pageSize}
              onChange={e => {
                setPageSize(Number(e.target.value))
              }}
            >
              {[5, 10, 20, 30, 40, 50].map(pageSize => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </Flex>
        </Flex>
        <Flex width='10%' justifyContent='center' alignItems='center'>
        <Button borderRightRadius={0} onClick={() => nextPage()} disabled={!canNextPage}>
            <BiChevronRight size='20px'/>
          </Button>
          <Button borderLeftRadius={0} onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
            <BiChevronsRight size='20px'/>
          </Button>
        </Flex>
      </Flex>
    )
}

export default ReactTable;