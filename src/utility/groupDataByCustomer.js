
export const groupDataByCustomer = (customers) => {
    const mothlyDataObject = {};
    customers.forEach(customerData => {
        const { customerId } = customerData;
        if (!mothlyDataObject[customerId]) {
            mothlyDataObject[customerId] = []
        }
        mothlyDataObject[customerId].push(customerData)
    });
    return mothlyDataObject;
}