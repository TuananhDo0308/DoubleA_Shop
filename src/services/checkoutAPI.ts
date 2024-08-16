import axios from 'axios';
import API_URL from './LinkAPI';

export const getPayments = async () => {
    const response = await axios.post(`${API_URL}/payment`);
    return response.data;
};
export const placeOrder = async (orderData) => {
    const response = await axios.post(`${API_URL}/order`, orderData);
    return response.data;
};