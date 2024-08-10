"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useMeasure } from "@react-hookz/web";
import {
  useDragControls,
  useMotionValue,
  useAnimate,
  motion,
} from "framer-motion";
import Image from "next/image";
import Icon from "@/assets/BagIcon.png";
import appleImg from "@/assets/products/Fruits/apple.jpg";
import kiwiImg from "@/assets/products/Fruits/kiwi.jpg";
import orangeImg from "@/assets/products/Fruits/orange.jpg";
import strawberryImg from "@/assets/products/Fruits/Straw.jpg";
import watermelonImg from "@/assets/products/Fruits/watermelom.jpg";
import matchaImg from "@/assets/products/Tea/MATCHA.jpg";

export const DragCloseDrawerExample = () => {
  const [open, setOpen] = useState(false);

  const products = [
    {
      id: 1,
      name: 'Apple Juice',
      price: 5000,
      image: appleImg,
      quantity: 1,
    },
    {
      id: 2,
      name: 'Kiwi Juice',
      price: 6000,
      image: kiwiImg,
      quantity: 1,
    },
    {
      id: 3,
      name: 'Orange Juice',
      price: 4000,
      image: orangeImg,
      quantity: 1,
    },
    {
      id: 4,
      name: 'Strawberry Smoothie',
      price: 8000,
      image: strawberryImg,
      quantity: 1,
    },
    {
      id: 5,
      name: 'Watermelon Juice',
      price: 3000,
      image: watermelonImg,
      quantity: 1,
    },
    {
      id: 6,
      name: 'Matcha Latte',
      price: 5000,
      image: matchaImg,
      quantity: 1,
    },
  ];

  const [cartProducts, setCartProducts] = useState(products);

  const shippingCost = 49900;
  const vatRate = 0.1; // 10%

  const handleQuantityChange = (id, delta) => {
    setCartProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id
          ? {
              ...product,
              quantity: Math.max(1, product.quantity + delta),
            }
          : product
      )
    );
  };

  const handleRemoveProduct = (id) => {
    setCartProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
  };

  const subtotal = cartProducts.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );

  const router = useRouter();

  const handleSignInClick = () => {
    router.push('/Checkout');
  };
  const total = subtotal + shippingCost + subtotal * vatRate;

  return (
    <div className="absolute h-screen z-50">
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-10 right-10 h-16 w-16 border-2 justify-around items-center flex flex-wrap rounded-full border-dashed border-black bg-white transition-all duration-300 hover:shadow-[4px_4px_0px_black] hover:translate-x-[-4px] hover:translate-y-[-4px]"
      >
        <Image src={Icon} alt="bagIcon" className="h-8 w-8" />
      </button>

      <DragCloseDrawer open={open} setOpen={setOpen}>
        <div className="h-screen bg-white pt-20">
          <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
          <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
            <div className="rounded-lg md:w-2/3">
              {cartProducts.map((product) => (
                <div
                  key={product.id}
                  className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start"
                >
                  <div className="relative w-full h-60 sm:w-40 sm:h-40">
                    <Image
                      src={product.image}
                      alt="product-image"
                      className="object-cover rounded-lg"
                      layout="fill"
                    />
                  </div>
                  <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                    <div className="mt-5 sm:mt-0">
                      <h2 className="text-lg font-bold text-gray-900">
                        {product.name}
                      </h2>
                    </div>
                    <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                      <div className="flex items-center border-gray-100">
                        <span
                          className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"
                          onClick={() => handleQuantityChange(product.id, -1)}
                        >
                          -
                        </span>
                        <input
                          className="h-8 w-8 border bg-white text-center text-xs outline-none"
                          type="number"
                          value={product.quantity}
                          readOnly
                        />
                        <span
                          className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
                          onClick={() => handleQuantityChange(product.id, 1)}
                        >
                          +
                        </span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <p className="text-sm">{product.price.toLocaleString()} ₭</p>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
                          onClick={() => handleRemoveProduct(product.id)}
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
                <p className="text-gray-700">{subtotal.toLocaleString()} ₭</p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-700">Shipping</p>
                <p className="text-gray-700">{shippingCost.toLocaleString()} ₭</p>
              </div>
              <hr className="my-4" />
              <div className="flex justify-between">
                <p className="text-lg font-bold">Total</p>
                <div>
                  <p className="mb-1 text-lg font-bold">
                    {total.toLocaleString()} ₭
                  </p>
                  <p className="text-sm text-gray-700">including VAT</p>
                </div>
              </div>
              <button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600" onClick={handleSignInClick}>
                Check out
              </button>
            </div>
          </div>
        </div>
      </DragCloseDrawer>
    </div>
  );
};

const DragCloseDrawer = ({ open, setOpen, children }) => {
  const [scope, animate] = useAnimate();
  const [drawerRef, { height }] = useMeasure();

  const y = useMotionValue(0);
  const controls = useDragControls();

  const handleClose = async () => {
    animate(scope.current, {
      opacity: [1, 0],
    });

    const yStart = typeof y.get() === "number" ? y.get() : 0;

    await animate("#drawer", {
      y: [yStart, height],
    });

    setOpen(false);
  };

  return (
    <>
      {open && (
        <motion.div
          ref={scope}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={handleClose}
          className="fixed inset-0 z-50 bg-neutral-950/70"
        >
          <motion.div
            id="drawer"
            ref={drawerRef}
            onClick={(e) => e.stopPropagation()}
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            transition={{
              ease: "easeInOut",
            }}
            className="absolute bottom-0 h-[90vh] w-full overflow-hidden rounded-t-3xl bg-white"
            style={{ y }}
            drag="y"
            dragControls={controls}
            onDragEnd={() => {
              if (y.get() >= 100) {
                handleClose();
              }
            }}
            dragListener={false}
            dragConstraints={{
              top: 0,
              bottom: 0,
            }}
            dragElastic={{
              top: 0,
              bottom: 0.5,
            }}
          >
            <div className="absolute left-0 right-0 top-0 z-10 flex justify-center bg-white p-4">
              <button
                onPointerDown={(e) => {
                  controls.start(e);
                }}
                className="h-2 w-14 cursor-grab touch-none rounded-full bg-neutral-700 active:cursor-grabbing"
              ></button>
            </div>
            <div className="relative z-0 h-full overflow-y-scroll p-4 pt-12">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};
