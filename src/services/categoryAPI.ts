import axios from 'axios';
import API_URL from './LinkAPI';

export const getCategories = async () => {
    const response = await axios.post(`${API_URL}/category`);
    console.log(response.data)
    return response.data;
};
export const getSupplier = async () => {
    const response = await axios.post(`${API_URL}/admin/supplier/getSupplier`);
    console.log("ok:",response.data)
    return response.data;
};