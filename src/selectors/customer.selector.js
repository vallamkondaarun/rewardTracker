import { createSelector } from 'reselect';

export const customerSelector = (state) => state.customerReducer;

export const getCustomersSelector = createSelector(
    customerSelector,
    customer => customer.customers
)