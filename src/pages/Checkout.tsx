"use client";
import "@/app/globals.css";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { FaPhoneAlt, FaMapMarkerAlt, FaEnvelope, FaUser } from "react-icons/fa";
import { getPayments, placeOrder } from "@/services/checkoutAPI"; // Import API functions
import { useForm, FormProvider } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { IMG_URL } from "@/services/LinkAPI";
export default function CheckoutPage({ setShowCheckout }) {
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [paymentCost, setPaymentCost] = useState(0);
  const { user, cart, setCart } = useAuth();
  const [paymentMethods, setPaymentMethods] = useState([]);

  // Initialize form methods with react-hook-form
  const schema = yup.object().shape({
    email: yup.string().email("Invalid email address").required("Email is required"),
    name: yup.string().required("Name is required"),
    phoneNumber: yup.string().required("Phone number is required").length(10, "Phone number must be 10 digits"),
    billingAddress: yup.string().required("Billing address is required"),
  });

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: user?.str_email || "",
      name: user?.str_ho_ten || "",
      phoneNumber: user?.strsdt || "",
      billingAddress: user?.str_dia_chi || "",
    },
    mode: "onTouched",
  });

  const { handleSubmit, setValue, watch, formState: { errors } } = methods;

  useEffect(() => {
    if (user) {
      setValue("email", user.str_email);
      setValue("name", user.str_ho_ten);
      setValue("phoneNumber", user.strsdt);
      setValue("billingAddress", user.str_dia_chi);
    }

    fetchPaymentMethods();
  }, [user, setValue]);

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
  const total = (sub + paymentCost).toFixed(1); // Ensuring only one decimal place

  // Handle place order and reset cart
  const handlePlaceOrder = async (data) => {
    const orderData = {
      userId: user.str_mand,
      payId: paymentMethod,
      email: data.email,
      name: data.name,
      phoneNumber: data.phoneNumber,
      billingAddress: data.billingAddress,
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
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 w-full flex justify-center items-center">
      <div className="relative w-full h-full bg-white shadow-lg overflow-y-auto">
        <div className="grid sm:px-10 lg:grid-cols-2">
          
              <div className=" pt-8">
                <button
                  onClick={() => setShowCheckout(false)}
                  className=" z-50 text-xl font-bold text-white mb-8 bg-blue-700 px-5 py-2 rounded-xl hover:bg-blue-500"
                >
                  &larr; Back
                </button>
                <p className="text-2xl font-bold ">Order Summary</p>
                <p className="text-gray-400">Check your items. And select a suitable payment method.</p>
                <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
                  {cart.map((product) => (
                    <div key={product.str_masp} className="flex flex-col rounded-lg bg-white sm:flex-row">
                      <Image
                        className="m-2 h-24 w-28 rounded-md border object-cover object-center"
                        src={`${IMG_URL}/${product?.strimg}`} 
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
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(handlePlaceOrder)}>
              <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
                <p className="mt-8 text-lg font-medium">Payment Methods</p>
                <div className="mt-5 grid gap-6">
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
                        <Image className="w-14 object-contain" src={`${IMG_URL}/${method.strimg}`} alt={method.str_tenpt} width={56} height={56} />
                        <div className="ml-5">
                          <span className="mt-2 font-semibold">{method.str_tenpt}</span>
                          <p className="text-slate-500 text-sm leading-6">{method.str_mo_ta}</p>
                          <p className="text-slate-500 text-sm leading-6">Cost: {method.d_gia}$</p>
                        </div>
                      </label>
                    </div>
                  ))}
                </div>

                {/* Form fields with validation */}
                <div className="mt-6">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <div className="relative mt-1">
                    <input
                      type="text"
                      id="email"
                      name="email"
                      className={`w-full rounded-md border ${errors.email ? 'border-red-500' : 'border-gray-200'} px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500`}
                      placeholder="your.email@gmail.com"
                      {...methods.register("email")}
                    />
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                      <FaEnvelope className="h-4 w-4 text-gray-400" />
                    </div>
                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                  </div>
                </div>

                <div className="mt-6">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                  <div className="relative mt-1">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className={`w-full rounded-md border ${errors.name ? 'border-red-500' : 'border-gray-200'} px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500`}
                      placeholder="Your full name"
                      {...methods.register("name")}
                    />
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                      <FaUser className="h-4 w-4 text-gray-400" />
                    </div>
                    {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                  </div>
                </div>

                <div className="mt-6">
                  <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
                  <div className="relative mt-1">
                    <input
                      type="text"
                      id="phoneNumber"
                      name="phoneNumber"
                      className={`w-full rounded-md border ${errors.phoneNumber ? 'border-red-500' : 'border-gray-200'} px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500`}
                      placeholder="Your phone number"
                      {...methods.register("phoneNumber")}
                    />
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                      <FaPhoneAlt className="h-4 w-4 text-gray-400" />
                    </div>
                    {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>}
                  </div>
                </div>

                <div className="mt-6">
                  <label htmlFor="billingAddress" className="block text-sm font-medium text-gray-700">Billing Address</label>
                  <div className="relative mt-1">
                    <input
                      type="text"
                      id="billingAddress"
                      name="billingAddress"
                      className={`w-full rounded-md border ${errors.billingAddress ? 'border-red-500' : 'border-gray-200'} px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500`}
                      placeholder="Your billing address"
                      {...methods.register("billingAddress")}
                    />
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                      <FaMapMarkerAlt className="h-4 w-4 text-gray-400" />
                    </div>
                    {errors.billingAddress && <p className="text-red-500 text-sm">{errors.billingAddress.message}</p>}
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
                  className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white hover:bg-gray-700" 
                  disabled={!cart.length}  // Disable if cart is empty
                  type="submit"
                >
                  Place Order
                </button>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
}
