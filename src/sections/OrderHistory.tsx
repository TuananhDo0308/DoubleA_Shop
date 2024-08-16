import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { getHistory } from "@/services/signUpAPI"; // API lấy lịch sử đơn hàng

export const OrderHistory = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  // Hàm lấy dữ liệu lịch sử đơn hàng từ API
  const fetchHistoryOrders = async () => {
    try {
      const sendInfo = {
        userId: user.str_mand, // Lấy str_mand từ user
      };

      // Gửi sendInfo tới API để lấy lịch sử đơn hàng
      const response = await getHistory(sendInfo);
      console.log("orders data:", response);

      if (Array.isArray(response)) {
        setOrders(response);
      } else {
        console.error("Unexpected response structure:", response);
      }
    } catch (error) {
      console.error("Failed to fetch order history:", error);
    }
  };

  // Lấy dữ liệu khi component được render
  useEffect(() => {
    if (user?.str_mand) {
      fetchHistoryOrders(); 
    }
  }, [user?.str_mand]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">Order History</h1>
      <p className="text-gray-600 mb-4">
        Check the status of recent orders, manage returns, and download invoices.
      </p>
      {orders.length > 0 ? (
        orders.map((order, index) => (
          <div key={index} className="mb-10 border rounded-lg p-4 shadow-sm">
            <div className="mb-4">
              <p className="text-lg font-medium">Customer Information</p>
              <p className="text-gray-700">
                <strong>Name:</strong> {order.str_ho_ten || user.str_ho_ten}
              </p>
              <p className="text-gray-700">
                <strong>Phone:</strong> {order.strsdt || user.strsdt}
              </p>
              <p className="text-gray-700">
                <strong>Email:</strong> {user.str_email}
              </p>
              <p className="text-gray-700">
                <strong>Address:</strong> {order.str_dia_chi_nhan || user.str_dia_chi}
              </p>
            </div>

            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-sm text-gray-500">Order Date</p>
                <p className="text-lg font-medium">{new Date(order.ldt_ngay_dat).toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Delivery Date</p>
                <p className="text-lg font-medium">{new Date(order.ld_ngay_giao).toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total amount</p>
                <p className="text-lg font-medium">{order.d_tong}$</p>
              </div>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
                View Invoice
              </button>
            </div>

            <p className="text-sm text-gray-500">Status</p>
            <p className={`text-lg font-medium mb-4 ${order.str_tinh_trang === "Delivered" ? "text-green-600" : "text-red-600"}`}>
              {order.str_tinh_trang}
            </p>

            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-2 px-4 font-medium text-gray-600">Product</th>
                    <th className="text-left py-2 px-4 font-medium text-gray-600">Quantity</th>
                    <th className="text-left py-2 px-4 font-medium text-gray-600">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {order.BillDetails?.map((detail, idx) => (
                    <tr key={idx} className="border-t">
                      <td className="flex items-center py-4 px-4">
                        <Image
                          src={detail.Product.strimg || '/path/to/default-image.jpg'}
                          alt={detail.Product.str_tensp}
                          width={60}
                          height={60}
                          className="mr-4 rounded-md border object-cover object-center"
                        />
                        <p>{detail.Product.str_tensp}</p>
                      </td>
                      <td className="py-4 px-4">{detail.i_so_luong}</td>
                      <td className="py-4 px-4">{detail.Product.d_don_gia}$</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-600">No orders found.</p>
      )}
    </div>
  );
};
