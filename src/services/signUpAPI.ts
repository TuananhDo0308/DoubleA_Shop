import axios from 'axios';
import API_URL from './LinkAPI';
import { use } from 'react';
export const registerUser = async (userData) => {
    const response = await axios.post(`${API_URL}/users/signup`, userData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

export const loginUser = async (credentials) => {
    console.log("Cre: ",credentials);
    const response = await axios.post(`${API_URL}/users/signin`, credentials);
    return response.data;
};
export const getHistory = async (userId) => {
    const response = await axios.post(`${API_URL}/getOrder`, userId ); // Gửi dưới dạng đối tượng
    console.log("recieve:", response.data)
    return response.data;
};

export const updateProfile = async (user) => {
    console.log("userData",user);
    const response = await axios.post(`${API_URL}/users/updateProfile`, user, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};