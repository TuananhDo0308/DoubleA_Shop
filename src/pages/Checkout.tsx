"use client";
import "@/app/globals.css";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { FaPhoneAlt, FaMapMarkerAlt, FaEnvelope, FaUser } from "react-icons/fa";
import { getPayments, placeOrder } from "@/services/checkoutAPI"; // Import các hàm API

export default function CheckoutPage({ setShowCheckout }) {
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [paymentCost, setPaymentCost] = useState(0);
  const { user, cart, setCart } = useAuth(); // Access setCart to reset the cart
  const [paymentMethods, setPaymentMethods] = useState([]);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [billingAddress, setBillingAddress] = useState("");

  useEffect(() => {
    if (user) {
      setEmail(user.str_email);
      setName(user.str_ho_ten);
      setPhoneNumber(user.strsdt);
      setBillingAddress(user.str_dia_chi);
    }

    fetchPaymentMethods();
  }, [user]);

  // Fetch payment methods
  const fetchPaymentMethods = async () => {
    try {
      const response = await getPayments();
      const payments = response.list;
      setPaymentMethods(payments);
      setPaymentMethod(payments[0]?.str_mapt);
      setPaymentCost(payments[0]?.d_gia || 0);
    } catch (error) {
      console.error('Error fetching payment methods:', error);
    }
  };

  const vatRate = 0.1; // 10% VAT
  const subtotal = cart.reduce((acc, product) => acc + product.d_don_gia * product.i_so_luong, 0);
  const sub = subtotal * (1 + vatRate);
  const total = sub + paymentCost;

  // Handle place order and reset cart
  const handlePlaceOrder = async () => {
    const orderData = {
      userId: user.str_mand,
      payId: paymentMethod,
      email: email,
      name: name,
      phoneNumber: phoneNumber,
      billingAddress: billingAddress,
      total: total,
      cart: cart,
    };

    try {
      // Call API to place the order
      const response = await placeOrder(orderData);
      console.log("Order placed successfully:", response);
      alert("Order placed successfully!");

      // Clear the cart in AuthContext
      setCart([]); // Clear the cart

      setShowCheckout(false); // Close the checkout page
    } catch (error) {
      console.error('Failed to place order:', error);
      alert('Failed to place order. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="relative w-full h-full bg-white shadow-lg overflow-y-auto">
        {/* Nút Back */}
        <button
          onClick={() => setShowCheckout(false)}
          className="absolute top-5 left-10 z-50 text-xl font-bold text-gray-700"
        >
          &larr; Back
        </button>

        <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
          <div className="px-4 pt-8">
            <p className="text-xl font-medium">Order Summary</p>
            <p className="text-gray-400">Check your items. And select a suitable payment method.</p>
            <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
              {cart.map((product) => (
                <div key={product.str_masp} className="flex flex-col rounded-lg bg-white sm:flex-row">
                  <Image
                    className="m-2 h-24 w-28 rounded-md border object-cover object-center"
                    src={'/path/to/your/image/${method.strimg}.jpg'} // Replace with the correct path for image
                    alt={product.str_tensp}
                    width={112}
                    height={96}
                  />
                  <div className="flex w-full flex-col px-4 py-4">
                    <span className="font-semibold">{product.str_tensp}</span>
                    <span className="float-right text-gray-400">{product.i_so_luong} x {product.d_don_gia}$</span>
                    <p className="text-lg font-bold">{product.d_don_gia * product.i_so_luong}$</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
            <p className="mt-8 text-lg font-medium">Payment Methods</p>
            <form className="mt-5 grid gap-6">
              {paymentMethods.map((method) => (
                <div key={method.str_mapt} className="relative">
                  <input
                    className="peer hidden"
                    id={method.str_mapt}
                    type="radio"
                    name="payment"
                    checked={paymentMethod === method.str_mapt}
                    onChange={() => {
                      setPaymentMethod(method.str_mapt);
                      setPaymentCost(method.d_gia);
                    }}
                  />
                  <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
                  <label
                    className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                    htmlFor={method.str_mapt}
                  >
                    <Image className="w-14 object-contain" src={`/path/to/your/image/${method.strimg}.jpg`} alt={method.str_tenpt} width={56} height={56} />
                    <div className="ml-5">
                      <span className="mt-2 font-semibold">{method.str_tenpt}</span>
                      <p className="text-slate-500 text-sm leading-6">{method.str_mo_ta}</p>
                      <p className="text-slate-500 text-sm leading-6">Cost: {method.d_gia}$</p>
                    </div>
                  </label>
                </div>
              ))}
            </form>

            <div className="mt-6">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <div className="relative mt-1">
                <input
                  type="text"
                  id="email"
                  name="email"
                  className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="your.email@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <FaEnvelope className="h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>

            <div className="mt-6">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <div className="relative mt-1">
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <FaUser className="h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>

            <div className="mt-6">
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
              <div className="relative mt-1">
                <input
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Your phone number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <FaPhoneAlt className="h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>

            <div className="mt-6">
              <label htmlFor="billingAddress" className="block text-sm font-medium text-gray-700">Billing Address</label>
              <div className="relative mt-1">
                <input
                  type="text"
                  id="billingAddress"
                  name="billingAddress"
                  className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Your billing address"
                  value={billingAddress}
                  onChange={(e) => setBillingAddress(e.target.value)}
                />
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <FaMapMarkerAlt className="h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>

            <div className="mt-6 border-t border-b py-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Subtotal</p>
                <p className="font-semibold text-gray-900">{subtotal}$</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Payment Cost</p>
                <p className="font-semibold text-gray-900">{paymentCost}$</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">VAT</p>
                <p className="font-semibold text-gray-900">{vatRate * 100}%</p>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">Total</p>
              <p className="text-2xl font-semibold text-gray-900">{total}$</p>
            </div>
            <button 
              className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white" 
              disabled={!cart.length}  // Disable if cart is empty
              onClick={handlePlaceOrder} // Gọi sự kiện khi nhấn nút "Place Order"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

