import axios from 'axios';
import API_URL from './LinkAPI';


export const removeItems = async (userId: string,productId: string) => {
    
    const response = await axios.post(`${API_URL}/cart/removeFromCart`,
        {userId,
        productId});
    console.log(response.data)
    return response.data;
};
export const addToCart = async (userId: string, productId: string) => {
    try {
        const response = await axios.post(`${API_URL}/cart/addToCart`, {
            userId,
            productId
        });
        console.log(userId)
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error adding product to cart:", error);
        throw error;
    }
};

export const updateCart = async (userId: string,productId: string, newQuantity: number) => {
    const response = await axios.post(`${API_URL}/cart/updateCartDetail`,
        {userId,
        productId,
        newQuantity});
    console.log(response.data)
    return response.data;
};
