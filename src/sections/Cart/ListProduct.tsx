import React from "react";
import Image from "next/image";
import { IMG_URL } from "@/services/LinkAPI";
import { removeItems, updateCart } from "@/services/cartAPI";
import { AppDispatch, useAppSelector } from "@/app/GlobalRedux/store";
import { useDispatch } from "react-redux";
import Link from "next/link";
import {
  incrementProductQuantity,
  decrementProductQuantity,
  setProductQuantity,
  removeProduct,
} from "@/app/GlobalRedux/Features/userCart"

const ProductList: React.FC = () => {
  const cart = useAppSelector((state) => state.cartSliceReducer.CartDetails);
  const user = useAppSelector((state) => state.userReducer.value);
  const dispatch = useDispatch<AppDispatch>();

  const vatRate = 0.1; // 10%

  // Handle quantity change with increment or decrement
  const handleQuantityChange = async (id: string, delta: number) => {
    const product = cart.find((product) => product.str_masp === id);
    if (!product) return;

    const newQuantity = product.i_so_luong + delta;

    if (newQuantity >= 1) {
      try {
        await updateQuantityDB(id, newQuantity);
        dispatch(setProductQuantity({ str_mactgh: product.str_mactgh, quantity: newQuantity }));
      } catch (error) {
        console.error("Error updating cart quantity:", error);
        alert("Failed to update product quantity. Please try again.");
      }
    }
  };

  // Update quantity in the database
  const updateQuantityDB = async (id: string, soluong: number) => {
    try {
      const response = await updateCart(user?.str_mand, id, soluong);
      return response.data;
    } catch (error) {
      console.error("Error updating quantity in DB:", error);
      throw error;
    }
  };

  // Handle removing a product from the cart
  const handleRemoveProduct = async (id: string) => {
    try {
      await removeItems(user?.str_mand, id);
      const product = cart.find((product) => product.str_masp === id);
      if (product) {
        dispatch(removeProduct(product.str_mactgh));
      }
    } catch (error) {
      console.error(error);
      alert("Remove failed!");
    }
  };

  const subtotal = cart.reduce(
    (acc, product) => acc + product.d_don_gia * product.i_so_luong,
    0
  );

  const total = subtotal + subtotal * vatRate;

  return (
    <div className="h-screen bg-white pt-20">
      <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
      <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
        <div className="rounded-lg md:w-2/3">
          {cart.map((product) => (
            <div
              key={product.str_masp}
              className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start"
            >
              <div className="relative w-full h-60 sm:w-40 sm:h-40">
                <Image
                  src={`${IMG_URL}/${product.strimg}`}
                  alt={product.str_tensp}
                  className="object-cover rounded-lg"
                  layout="fill"
                />
              </div>
              <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                <div className="mt-5 sm:mt-0">
                  <h2 className="text-lg font-bold text-gray-900">
                    {product.str_tensp}
                  </h2>
                </div>
                <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                  <div className="flex items-center border-gray-100">
                    <span
                      className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"
                      onClick={() => handleQuantityChange(product.str_masp, -1)}
                    >
                      -
                    </span>
                    <input
                      className="h-8 w-8 border bg-white text-center text-xs outline-none"
                      type="number"
                      value={product.i_so_luong}
                      readOnly
                    />
                    <span
                      className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
                      onClick={() => handleQuantityChange(product.str_masp, 1)}
                    >
                      +
                    </span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <p className="text-sm">
                      {product.d_don_gia.toLocaleString()} $
                    </p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
                      onClick={() => handleRemoveProduct(product.str_masp)}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
          <div className="mb-2 flex justify-between">
            <p className="text-gray-700">Subtotal</p>
            <p className="text-gray-700">{subtotal.toLocaleString()} $</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-700">VAT</p>
            <p className="text-gray-700">
              {(vatRate * 100).toLocaleString()} %
            </p>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between">
            <p className="text-lg font-bold">Total</p>
            <div>
              <p className="mb-1 text-lg font-bold">
                {total.toLocaleString()} $
              </p>
              <p className="text-sm text-gray-700">including VAT</p>
            </div>
          </div>
          <Link href="/Checkout">
          
          <button
            className={`mt-6 w-full rounded-md py-1.5 font-medium text-blue-50 transition-all duration-300 ${
              cart.length > 0
                ? "bg-blue-500 hover:bg-blue-600 cursor-pointer"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={cart.length === 0}
          >
            Check out
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
