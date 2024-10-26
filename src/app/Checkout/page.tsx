"use client";
import "@/app/globals.css";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaPhoneAlt, FaMapMarkerAlt, FaEnvelope, FaUser } from "react-icons/fa";
import { getPayments, placeOrder } from "@/services/checkoutAPI";
import { useForm, FormProvider } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { IMG_URL } from "@/services/LinkAPI";
import ConfirmDialog from "@/components/ConfirmBox";
import { clearCart } from "@/app/GlobalRedux/Features/userCart"; // Import action to clear cart
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "../GlobalRedux/store";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Đổi thành 'next/navigation'
import LabeledInput from "@/components/CustomInput";
const inputs = [
  {
    label: 'Email',
    id: 'email',
    type: 'text',
    placeholder: 'your.email@gmail.com',
    icon: FaEnvelope,
  },
  {
    label: 'Name',
    id: 'name',
    type: 'text',
    placeholder: 'Your full name',
    icon: FaUser,
  },
  {
    label: 'Phone Number',
    id: 'phoneNumber',
    type: 'text',
    placeholder: 'Your phone number',
    icon: FaPhoneAlt,
  },
  {
    label: 'Billing Address',
    id: 'billingAddress',
    type: 'text',
    placeholder: 'Your billing address',
    icon: FaMapMarkerAlt,
  },
];
// Define the form data interface
interface OrderFormData {
  email: string;
  name: string;
  phoneNumber: string;
  billingAddress: string;
}

// Define the payment method interface
interface PaymentMethod {
  str_mapt: string;
  str_tenpt: string;
  str_mo_ta: string;
  d_gia: number;
  strimg: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const cart = useAppSelector((state) => state.cartSliceReducer.CartDetails); // Select cart from Redux store
  const user = useAppSelector((state) => state.userReducer.value); // Select user from Redux store
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  const [paymentCost, setPaymentCost] = useState<number>(0);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const schema = yup.object().shape({
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email is required"),
    name: yup.string().required("Name is required"),
    phoneNumber: yup
      .string()
      .required("Phone number is required")
      .length(10, "Phone number must be 10 digits"),
    billingAddress: yup.string().required("Billing address is required"),
  });

  const methods = useForm<OrderFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: user?.str_email || "",
      name: user?.str_ho_ten || "",
      phoneNumber: user?.strsdt || "",
      billingAddress: user?.str_dia_chi || "",
    },
    mode: "onTouched",
  });

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = methods;

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
      console.error("Error fetching payment methods:", error);
    }
  };

  const vatRate = 0.1; // 10% VAT
  const subtotal = cart.reduce(
    (acc, product) => acc + product.d_don_gia * product.i_so_luong,
    0
  );
  const sub = subtotal * (1 + vatRate);
  const total = (sub + paymentCost).toFixed(1); // Ensuring only one decimal place

  const handlePlaceOrder = async (data: OrderFormData) => {
    const orderData = {
      userId: user.str_mand, // User ID from Redux store
      payId: paymentMethod || "", // Payment ID
      email: data.email,
      name: data.name,
      phoneNumber: data.phoneNumber,
      billingAddress: data.billingAddress,
      total: parseFloat(total), // Convert total to number
    };

    try {
      const response = await placeOrder(orderData);
      console.log("Order placed successfully:", response);
      dispatch(clearCart()); // Clear the cart in Redux store after placing order
      router.push("/"); // Chuyển hướng về trang chính
    } catch (error) {
      console.error("Failed to place order:", error);
      alert("Failed to place order. Please try again.");
    }
  };

  const onSubmit = (data: OrderFormData) => {
    // Show confirmation dialog before placing the order
    setIsDialogOpen(true);
  };

  const handleConfirm = async () => {
    // Handle the actual order placement after confirmation
    setIsDialogOpen(false);
    handleSubmit(handlePlaceOrder)();
  };

  const handleCancel = () => {
    // Close the confirmation dialog without placing the order
    setIsDialogOpen(false);
  };
  
return (
  <div className="relative mt-10 flex justify-center items-start gap-6">
    {/* Cột Giỏ hàng */}
    <div className="bg-white rounded-2xl shadow-lg p-6" style={{ width: "500px" }}>
    <Link href="/">
        <p className="text-blue-600 hover:underline mb-4 inline-block">
          &larr; Back
        </p>
      </Link>
      <p className="text-2xl font-bold mb-4">Cart Items</p>
      {cart.map((product) => (
        <div
          key={product.str_masp}
          className="flex justify-between p-4 mb-4 bg-gray-50 rounded-lg shadow-sm"
        >
          <div className="flex">
            <Image
              className="rounded-lg"
              src={`${IMG_URL}/${product?.strimg}`}
              alt={product.str_tensp}
              width={80}
              height={80}
            />
            <div className="flex flex-col justify-between ml-4 flex-grow">
              <span className="font-semibold text-lg">{product.str_tensp}</span>
              <span className="text-gray-500">
                {product.i_so_luong} x {product.d_don_gia}$
              </span>
            </div>
          </div>
          <p className="font-semibold text-lg">
            {product.d_don_gia * product.i_so_luong}$
          </p>
        </div>
      ))}
    </div>

    {/* Cột Thông tin và Thanh toán */}
    <div className="w-[400px] bg-white rounded-2xl shadow-lg p-6" style={{ width: "500px" }}>
    <p className="text-xl font-bold mb-4">Order Summary</p>

{/* Phương thức thanh toán */}
<p className="mt-4 text-lg font-medium">Payment Methods</p>
<div className="space-y-4 mb-8">
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
      <label
        className={`peer-checked:border-2 peer-checked:border-blue-600 gap-6 peer-checked:bg-blue-50 flex cursor-pointer select-none rounded-lg border border-gray-950 p-4 ${
          paymentMethod === method.str_mapt ? "bg-gray-300" : ""
        }`}
        htmlFor={method.str_mapt}
      >
        <Image
          className="w-14 object-contain mr-4 rounded-xl"
          src={`${IMG_URL}/${method.strimg}`}
          alt={method.str_tenpt}
          width={60}
          height={50}
        />
        <div className="ml-5">
          <span className="mt-2 font-semibold">{method.str_tenpt}</span>
          <p className="text-slate-500 text-sm leading-6">{method.str_mo_ta}</p>
          <p className="text-slate-500 text-sm leading-6">Cost: {method.d_gia}$</p>
        </div>
      </label>
    </div>
  ))}
</div>
          <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {inputs.map((input) => (
          <LabeledInput
            key={input.id}
            label={input.label}
            id={input.id}
            type={input.type}
            placeholder={input.placeholder}
            icon={input.icon}
            register={methods.register}
            error={errors[input.id as keyof OrderFormData]?.message}
            />
        ))}
         {/* Tổng kết */}
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
              className="mt-4 mb-8 w-full h-[100px] rounded-md bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-500"
              style={{height:"50px"}}
              disabled={!cart.length}
              type="submit"
            >
              Place Order
            </button>
        </form>
   
    </FormProvider>
    </div>
      <ConfirmDialog
isOpen={isDialogOpen}
title="Confirm Order"
message={`Are you sure you want to place this order for ${total}$?`}
onConfirm={handleConfirm}
onCancel={handleCancel}
/> 
    </div>
  );
  
}

{/* */}