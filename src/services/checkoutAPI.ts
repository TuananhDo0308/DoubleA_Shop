import axios from 'axios';
import API_URL from './LinkAPI';
export const getPayments = async () => {
    const response = await axios.post(`${API_URL}/payment`);
    return response.data;
};

interface Order {
    userId: string;
    payId: string;
    email: string;
    name: string;
    phoneNumber: string;
    billingAddress: string;
    total: number;
  }
  
  export const placeOrder = async (orderData: Order) => {
    const response = await axios.post(`${API_URL}/order`, orderData);
    return response.data;
  };