import React from "react";
import { useTable, useFilters, useSortBy, useExpanded } from 'react-table';

export const DataTable = ({ columns, data }) => {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        visibleColumns,
    } = useTable({
        columns,
        data,
        initialState: {
            hiddenColumns: ['transactions']
        }
    },
        useFilters,
        useSortBy,
        useExpanded
    )

    
 // Create a function that will render our row sub components
 const renderRowSubComponent = React.useCallback(
    ({ row }) => (
        <table style={{ width: '100%' }}>
        <thead>
            <th>Transaction Date</th>
            <th>Transaction Amount</th>
            <th>Reward Point</th>
        </thead>
        <tbody>
            {
                row.values.transactions.map((item, i) => <tr key={i}>
                    <td>{item.transactionDate}</td>
                    <td>$ {item.transactionAmount}</td>
                    <td>{item.rewardPoint} pts</td>
                </tr>)
            }
        </tbody>
    </table>
    ),
    []
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
                            <>
                                <tr {...row.getRowProps()}>
                                    {row.cells.map(cell => {
                                        return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                    })}
                                </tr>
                                {row.isExpanded ? (
                                    <tr>
                                        <td colSpan={visibleColumns.length}>
                                            {renderRowSubComponent({ row })}
                                        </td>
                                    </tr>
                                ) : null}
                            </>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}