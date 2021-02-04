import moment from 'moment';

export const groupDataByMonth = (customers) => {
    const mothlyDataObject = {};
    customers.forEach(customerData => {
        const { transactionDate, customerId } = customerData;
        const month = moment(transactionDate, 'DD/MM/YYYY').format('MMM');
        if (!mothlyDataObject[`${month}_${customerId}`]) {
            mothlyDataObject[`${month}_${customerId}`] = []
        }
        mothlyDataObject[`${month}_${customerId}`].push(customerData)
    });
    return mothlyDataObject;
}