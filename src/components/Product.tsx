"use client";
import React, {useRef} from 'react';
import { ProductType } from '@/types/Product';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import Image from "next/image";

interface ProductProps {
  product: ProductType;
}

export const Product: React.FC<ProductProps> = ({ product }) => {
  return (
    <div className="p-4">
      <div className="w-full">
        <TiltCard imageSrc={product.image} altText={product.name} />
      </div>
      <h3 className="mt-2 text-lg font-extrabold uppercase px-4">{product.name}</h3>
      
      <div className='flex flex-wrap justify-between px-4'>
        <div>
          <div className='flex'>
            <p className='text-sm'>Stock: </p>
            <p className='text-sm'>7</p>
          </div>
          <p className="mt-1 font-bold text-lg text-blue-600">{product.price}</p>
        </div>
        <DottedButton/>
      </div>
    </div>
  );
};


const DottedButton = () => {
  return (
    <button className="rounded-2xl mt-2 border-2 border-dashed border-black bg-white px-4 py-2 font-semibold  text-black transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none">
      Add to cart
    </button>
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
        width: "100%", // Đặt chiều rộng 100%
        height:"300px"
      }}
      className="relative rounded-xl bg-gradient-to-br from-indigo-300 to-violet-300"
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

