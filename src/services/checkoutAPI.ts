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
    cart: {
      str_masp: string;
      i_so_luong: number;
      d_don_gia: number;
      strimg: string;
      str_tensp: string;
    }[];
    ldt_ngay_dat: Date;
    ld_ngay_giao: Date | null;
    d_tong: number;
    str_tinh_trang: string;
    BillDetails: {
      productId: string;
      quantity: number;
    }[];
  }
  
  export const placeOrder = async (orderData: Order) => {
    const response = await axios.post(`${API_URL}/order`, orderData);
    return response.data;
  };