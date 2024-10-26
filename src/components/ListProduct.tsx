import React, { useEffect, useState } from "react";
import Image from "next/image";
import { IMG_URL } from "@/services/LinkAPI";
import { getOrderDetail } from "@/services/signUpAPI";// Adjust the path as necessary

interface Product {
  str_masp: string;
  str_tensp: string;
  d_don_gia: number;
  strimg: string;
}

interface OrderDetail {
  i_so_luong: number;
  Product: Product;
}

interface OrderProductListProps {
  orderId: string;
}


const OrderProductList: React.FC<OrderProductListProps> = ({ orderId }) => {
  const [orderDetails, setOrderDetails] = useState<OrderDetail[]>([]);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await getOrderDetail(orderId);
        console.log(response) // Assuming the API returns the order details in response.data
        setOrderDetails(response.orderDetail.OrderDetails); // Adjust according to your API response structure
      } catch (error) {
        console.error("Failed to fetch order details:", error);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  return (
    <div className="overflow-auto max-h-96">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 text-center">Image</th>
            <th className="py-2 text-center">Product Name</th>
            <th className="py-2 text-center">Quantity</th>
            <th className="py-2 text-center">Price</th>
            <th className="py-2 text-center">Total</th>
          </tr>
        </thead>
        <tbody>
          {orderDetails.map((detail, index) => (
            <tr key={index} className="border-t text-center">
              <td className="p-2">
                <Image
                  src={`${IMG_URL}/${detail.Product.strimg}`}
                  alt={detail.Product.str_tensp}
                  width={50}
                  height={50}
                  className="rounded"
                />
              </td>
              <td className="p-2">
                <p className="text-sm font-medium">{detail.Product.str_tensp}</p>
              </td>
              <td className="p-2">
                <p className="text-sm">{detail.i_so_luong}</p>
              </td>
              <td className="p-2">
                <p className="text-sm">${detail.Product.d_don_gia.toFixed(2)}</p>
              </td>
              <td className="p-2">
                <p className="text-sm">
                  ${(detail.i_so_luong * detail.Product.d_don_gia).toFixed(2)}
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderProductList;
