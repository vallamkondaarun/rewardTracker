import React, { useMemo } from "react";
import { useSelector } from 'react-redux';
import { DataTable, TableTextFilters } from '../common';
import { getCustomersSelector } from '../../selectors/customer.selector';
import { calculateReward } from '../../utility/calculateReward';
import { groupDataByCustomer } from '../../utility/groupDataByCustomer';

export const CustomerAllRewards = () => {
    const customers = useSelector(state => getCustomersSelector(state));
    const memoizedCustomers = useMemo(() => {
        const mothlyDataObject = groupDataByCustomer(customers);
        const customerMonthlyData = [];
        for (const key in mothlyDataObject) {
            const monthlyData = mothlyDataObject[key];
            const { customerId, name } = monthlyData[0];
            let totalRewardPoints = 0;
            let noOfTransactions = 0;
            monthlyData.forEach(data => {
                const rewardPoint = calculateReward(data.transactionAmount);
                totalRewardPoints += rewardPoint;
                noOfTransactions += 1;
            });
            customerMonthlyData.push({ customerId, name, rewardPoints: totalRewardPoints, noOfTransactions });
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
                Header: 'No of Transactions',
                accessor: 'noOfTransactions',
                disableFilters: true
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
            <h2>Customer Total Rewards</h2>
            <DataTable columns={columns} data={memoizedCustomers} />
        </div>
    )
}

export default CustomerAllRewards;