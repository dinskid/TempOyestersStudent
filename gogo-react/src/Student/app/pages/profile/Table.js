import React from 'react';
import { useTable, usePagination, useSortBy } from 'react-table';
import classnames from 'classnames';
import PopOverItem from './PopOverItem';
import { Button } from 'reactstrap';

const Table = ({ columns, data, handleReloadTable }) => {
  // const [handleReloadTable] = useContext(LibraryContext);
  const {
    getTableProps,
    getTableBodyProps,
    prepareRow,
    headerGroups,
    page,
    canPreviousPage,
    canNextPage,
    pageCount,
    gotoPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 6 },
    },
    useSortBy,
    usePagination
  );

  console.log(data, page);

  return (
    <div style={{ marginBottom: '25rem' }}>
      <table
        style={{ maxWidth: '1100px', margin: '0 auto' }}
        {...getTableProps()}
        className={`r-table table  `}
      >
        <thead style={{ backgroundColor: 'blue' }}>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, columnIndex) => (
                <th
                  key={`th_${columnIndex}`}
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className={
                    column.isSorted
                      ? column.isSortedDesc
                        ? 'sorted-desc'
                        : 'sorted-asc'
                      : ''
                  }
                >
                  {column.render('Header')}
                  {/* <span /> */}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            console.log(row.original);
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell, cellIndex) => (
                  <td
                    style={{ fontSize: '1.3rem' }}
                    key={`td_${cellIndex}`}
                    {...cell.getCellProps({
                      className: cell.column.cellClass,
                    })}
                  >
                    {cell.render('Cell')}
                  </td>
                ))}
                <td>
                  <PopOverItem
                    blog_id={row.original.blog_id}
                    handleReloadTable={handleReloadTable}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default Table;
