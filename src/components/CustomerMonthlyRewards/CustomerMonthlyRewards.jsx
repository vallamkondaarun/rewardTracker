import React, { useMemo } from "react";
import { useSelector } from 'react-redux';
import { DataTable, TableTextFilters } from '../common';
import { getCustomersSelector } from '../../selectors/customer.selector';
import moment from 'moment';
import { calculateReward } from '../../utility/calculateReward';
import { groupDataByMonth } from '../../utility/groupDataByMonth';

export const CustomerMonthlyRewards = () => {
    const customers = useSelector(state => getCustomersSelector(state));
    const memoizedCustomers = useMemo(() => {
        const mothlyDataObject = groupDataByMonth(customers);
        const customerMonthlyData = [];
        for (const key in mothlyDataObject) {
            const monthlyData = mothlyDataObject[key];
            const { customerId, name, transactionDate } = monthlyData[0];
            const month = moment(transactionDate, 'DD/MM/YYYY').format('MMM');
            let totalRewardPoints = 0;
            let noOfTransactions = 0;
            const transactions = [];
            monthlyData.forEach(data => {
                const rewardPoint = calculateReward(data.transactionAmount);
                totalRewardPoints += rewardPoint;
                noOfTransactions += 1;
                transactions.push({ transactionDate: moment(transactionDate, 'DD/MM/YYYY').format('DD/MMM/YYY'), transactionAmount: data.transactionAmount, rewardPoint });
            });
            customerMonthlyData.push({ customerId, name, transactions, transactionDate: month, rewardPoints: totalRewardPoints, noOfTransactions });
        }
        return customerMonthlyData.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
    }, [customers]);
    const columns = useMemo(
        () => [
            {
                Header: 'Customer Name',
                accessor: 'name',
                Filter: (column) => TableTextFilters(column, 'Name')
            },
            {
                Header: 'Month',
                accessor: 'transactionDate',
                disableFilters: true
            },
            {
                Header: 'No of Transactions',
                accessor: 'noOfTransactions',
                disableFilters: true
            },
            {
                Header: 'Transactions',
                accessor: 'transactions',
                disableFilters: true,
                Cell: props => <div/>,
                show: false
            },
            {
                Header: 'Total Reward Points',
                accessor: 'rewardPoints',
                disableFilters: true,
                Cell: props => <div>{props.value} pts</div>
            },
            {
                id: 'expander',
                Header: 'Action',
                Cell: ({ row }) =>
                  <span
                      {...row.getToggleRowExpandedProps({
                      })}
                    >
                      {row.isExpanded ? 'Hide Details' : 'Show Details'}
                    </span>
              }
        ], [])
    return (
        <div style={{ marginTop: '100px' }}>
            <h2>Customer Monthly Rewards</h2>
            <DataTable columns={columns} data={memoizedCustomers} />
        </div>
    )
}

export default CustomerMonthlyRewards;