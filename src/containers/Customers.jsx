import React from "react";
import CustomerAllRewards from '../components/CustomerAllRewards/CustomerAllRewards';
import CustomerMonthlyRewards from '../components/CustomerMonthlyRewards/CustomerMonthlyRewards';

export const Customers = () => {
    return (
        <>
            <CustomerMonthlyRewards />
            <CustomerAllRewards />
        </>
    )
}

export default Customers;