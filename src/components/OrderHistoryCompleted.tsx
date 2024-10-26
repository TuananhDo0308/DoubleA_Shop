import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { getHistoryCompleted } from "@/services/signUpAPI"; // Updated API to get completed order history
import OrderProductList from "@/components/ListProduct"; // Import the new component
import { useAppSelector } from "@/app/GlobalRedux/store";

interface OrderDetail {
  Product: {
    str_tensp?: string;
    strimg?: string;
    d_don_gia?: number;
  };
  i_so_luong?: number;
}

interface Order {
  str_mahd: string; // Added order ID field
  str_ho_ten?: string;
  strsdt?: string;
  str_dia_chi_nhan?: string;
  ldt_ngay_dat?: string;
  ld_ngay_giao?: string;
  d_tong?: number;
  str_tinh_trang?: string;
  OrderDetails?: OrderDetail[];
}

export const OrderHistory2 = () => {
  const user = useAppSelector((state)=>state.userReducer.value)
  const [orders2, setorders2] = useState<Order[]>([]);
  const [visibleInvoices, setVisibleInvoices] = useState<string[]>([]); // State to manage visible invoices

  const fetchHistoryorders2 = async () => {
    try {
      if (!user?.str_mand) {
        console.error("User ID is missing.");
        return;
      }

      const sendInfo = {
        userId: user.str_mand,
      };

      const response = await getHistoryCompleted(sendInfo); // Use the new API to get completed orders2

      if (Array.isArray(response.orders)) {
        setorders2(response.orders as Order[]);
      } else {
        console.error("Unexpected response structure:", response);
      }
    } catch (error) {
      console.error("Failed to fetch order history:", error);
    }
  };

  useEffect(() => {
    if (user?.str_mand) {
      fetchHistoryorders2();
    }
  }, [user?.str_mand]);

  const toggleInvoiceVisibility = (orderId: string) => {
    setVisibleInvoices(prevState =>
      prevState.includes(orderId)
        ? prevState.filter(id => id !== orderId)
        : [...prevState, orderId]
    );
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">Completed Order History</h1>
      <p className="text-gray-600 mb-4">
        Check the status of recent orders, manage returns, and download invoices.
      </p>
      {orders2.length > 0 ? (
        orders2.map((order, index) => (
          <div key={index} className="mb-10 border rounded-lg p-4 shadow-sm">
            <div className="mb-4">
              <p className="text-lg font-medium">Customer Information</p>
              <p className="text-gray-700">
                <strong>Name:</strong> {order.str_ho_ten || user?.str_ho_ten || "N/A"}
              </p>
              <p className="text-gray-700">
                <strong>Phone:</strong> {order.strsdt || user?.strsdt || "N/A"}
              </p>
              <p className="text-gray-700">
                <strong>Email:</strong> {user?.str_email || "N/A"}
              </p>
              <p className="text-gray-700">
                <strong>Address:</strong> {order.str_dia_chi_nhan || user?.str_dia_chi || "N/A"}
              </p>
            </div>

            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-sm text-gray-500">Order Date</p>
                <p className="text-lg font-medium">{order.ldt_ngay_dat ? new Date(order.ldt_ngay_dat).toLocaleString() : "N/A"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Delivery Date</p>
                <p className="text-lg font-medium">{order.ld_ngay_giao ? new Date(order.ld_ngay_giao).toLocaleString() : "N/A"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total amount</p>
                <p className="text-lg font-medium">{order.d_tong ? `${order.d_tong}$` : "N/A"}</p>
              </div>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                onClick={() => toggleInvoiceVisibility(order.str_mahd)} // Toggle visibility
              >
                {visibleInvoices.includes(order.str_mahd) ? "Hide Invoice" : "View Invoice"}
              </button>
            </div>

            <p className="text-sm text-gray-500">Status</p>
            <p className={`text-lg font-medium mb-4 ${order.str_tinh_trang === "Completed" ? "text-green-600" : "text-red-600"}`}>
              {order.str_tinh_trang || "Unknown"}
            </p>

            {visibleInvoices.includes(order.str_mahd) && (
              <OrderProductList orderId={order.str_mahd} /> // Pass orderId to component
            )}
          </div>
        ))
      ) : (
        <p className="text-gray-600">No completed orders found.</p>
      )}
    </div>
  );
};
