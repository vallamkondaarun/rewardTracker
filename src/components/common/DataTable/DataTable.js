import React from "react";
import { useTable, useFilters, useSortBy, usePagination } from 'react-table';

export const DataTable = ({ columns, data }) => {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        rows,
    } = useTable({
        columns,
        data
    },
        useFilters,
        useSortBy,
        usePagination
    )

    return (
        <>
            <table className='table table-striped table-bordered' {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()}>
                                    <div {...column.getSortByToggleProps()}>
                                        {column.render('Header')}
                                        <span>
                                            {column.isSorted
                                                ? column.isSortedDesc
                                                    ? ' 🔽'
                                                    : ' 🔼'
                                                : ''}
                                        </span>
                                    </div>
                                    <div>{column.canFilter ? column.render('Filter') : null}</div>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row, i) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}
