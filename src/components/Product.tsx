"use client";
import React, { useRef, useState } from "react";
import { ProductType } from "@/types/Product";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext"; // Import useAuth to access the cart
import { addToCart } from "@/services/cartAPI";
import SlideInNotifications from "./Message"; // Import SlideInNotifications
import { IMG_URL } from "@/services/LinkAPI";

interface ProductProps {
  product: ProductType;
}

export const Product: React.FC<ProductProps> = ({ product }) => {
  const { cart, setCart } = useAuth();
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]); // State for notifications

  const handleAddToCart = async () => {
    try {
      const productInCart = cart.find(item => item.str_masp === product.str_masp);
      const desiredQuantity = productInCart ? productInCart.i_so_luong + 1 : 1;

      if (product.i_so_luong < desiredQuantity) {
        // Thay thế console.log bằng setNotifications
        setNotifications(prev => [
          { id: Math.random(), message: `Not enough stock for ${product.str_tensp}` },
          ...prev
        ]);
        return;
      }

      // Thêm sản phẩm vào cơ sở dữ liệu
      await addProductToCartInDB();

      // Thêm thông báo khi sản phẩm được thêm vào giỏ hàng
      setNotifications(prev => [
        { id: Math.random(), message: `${product.str_tensp} added to cart` },
        ...prev
      ]);

      const updatedCart = getUpdatedCart();
      setCart(updatedCart); // Cập nhật giỏ hàng trong AuthContext
    } catch (error) {
      // Thêm thông báo lỗi thay vì dùng console.log
      setNotifications(prev => [
        { id: Math.random(), message: 'Error adding product to cart' },
        ...prev
      ]);
    }
  };

  const addProductToCartInDB = async () => {
    try {
      await addToCart(user.str_mand, product.str_masp);
    } catch (error) {
      // Thêm thông báo lỗi thay vì dùng console.log
      setNotifications(prev => [
        { id: Math.random(), message: error.message || "Failed to add product to cart." },
        ...prev
      ]);
    }
  };

  const getUpdatedCart = () => {
    const updatedCart = [...cart];
    const productInCart = updatedCart.find(item => item.str_masp === product.str_masp);

    if (productInCart) {
      productInCart.i_so_luong += 1;
    } else {
      updatedCart.push({ ...product, i_so_luong: 1 });
    }

    return updatedCart;
  };

  const removeNotif = (id) => {
    setNotifications(prevNotifs => prevNotifs.filter(n => n.id !== id));
  };

  return (
    <div className="p-4">
      <SlideInNotifications notifications={notifications} removeNotif={removeNotif} /> {/* Pass notifications and removeNotif */}
      <div className="w-full">
        <TiltCard imageSrc={`${IMG_URL}/${product.strimg}`} altText={product.str_tensp} />
      </div>
      <h3 className="mt-2 text-lg font-extrabold uppercase px-4">{product.str_tensp}</h3>
      
      <div className='flex flex-wrap justify-between px-4'>
        <div>
          <div className='flex'>
            <p className='text-sm'>Stock: {product.i_so_luong}</p>
          </div>
          <p className="mt-1 font-bold text-lg text-blue-600">${product.d_don_gia.toFixed(2)}</p>
        </div>
        <button
          onClick={handleAddToCart} // Call the function to add the product to the cart
          className="rounded-2xl mt-2 border-black bg-white px-4 py-2 font-semibold text-black transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none"
        >
          Add
        </button>
      </div>
    </div>
  );
};

const ROTATION_RANGE = 32.5;
const HALF_ROTATION_RANGE = 32.5 / 2;

const TiltCard = ({ imageSrc, altText }) => {
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x);
  const ySpring = useSpring(y);

  const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

  const handleMouseMove = (e) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = (e.clientX - rect.left) * ROTATION_RANGE;
    const mouseY = (e.clientY - rect.top) * ROTATION_RANGE;

    const rX = (mouseY / height - HALF_ROTATION_RANGE) * -1;
    const rY = mouseX / width - HALF_ROTATION_RANGE;

    x.set(rX);
    y.set(rY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        transform,
        width: "100%",
        height: "300px",
      }}
      className="relative rounded-xl bg-gradient-to-br from-blue-500 to-[#183ec2]"
      
    >
      <div
        style={{
          transform: "translateZ(75px)",
          transformStyle: "preserve-3d",
        }}
        className="absolute inset-4 grid place-content-center rounded-xl bg-white shadow-lg overflow-hidden"
      >
        <Image
          src={imageSrc}
          alt={altText}
          layout="fill"
          objectFit="cover"
          quality={100}
          className="rounded-xl"
        />
      </div>
    </motion.div>
  );
};
