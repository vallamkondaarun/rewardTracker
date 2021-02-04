import React, { useMemo } from "react";
import { useSelector } from 'react-redux';
import { DataTable, TableTextFilters } from '../components/common';
import { getCustomersSelector } from '../selectors/customer.selector';
import moment from 'moment';
import { calculateReward } from '../utility/calculateReward';
import { groupDataByMonth } from '../utility/groupDataByMonth';

export const Customers = () => {
    const customers = useSelector(state => getCustomersSelector(state));
    const memoizedCustomers = useMemo(() => {
        const mothlyDataObject = groupDataByMonth(customers);
        const customerMonthlyData = [];
        for (const key in mothlyDataObject) {
            const monthlyData = mothlyDataObject[key];
            const { customerId, name, transactionDate } = monthlyData[0];
            const month = moment(transactionDate, 'DD/MM/YYYY').format('MMM');
            let totalAmount = 0;
            let totalRewardPoints = 0;
            let noOfTransactions = 0;
            monthlyData.forEach(data => {
                totalAmount += data.transactionAmount;
                const rewardPoint = calculateReward(data.transactionAmount);
                totalRewardPoints += rewardPoint;
                noOfTransactions += 1;
            });
            customerMonthlyData.push({ customerId, name, transactionAmount: totalAmount, transactionDate: month, rewardPoints: totalRewardPoints, noOfTransactions });
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
                Header: 'Total Transaction Amount',
                accessor: 'transactionAmount',
                disableFilters: true,
                Cell: props => <div>$ {props.value}</div>
            },
            {
                Header: 'Total Reward Points',
                accessor: 'rewardPoints',
                disableFilters: true,
                Cell: props => <div>{props.value} pts</div>
            }
        ], [])
    return (
        <div style={{ marginTop: '100px' }}>
            <h2>Customer Rewards for the last 3 months</h2>
            <DataTable columns={columns} data={memoizedCustomers} />
        </div>
    )
}

export default Customers;