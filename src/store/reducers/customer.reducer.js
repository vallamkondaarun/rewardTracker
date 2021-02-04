import customersData from '../../content/customers.json';

const initialState = {
    customers: customersData
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

export default reducer;
