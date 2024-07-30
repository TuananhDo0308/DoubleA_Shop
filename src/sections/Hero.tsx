"use client";
import Image from "next/image";
import cogImage from "@/assets/cog.png"
import Cylinder from "@/assets/cylinder.png"
import noodleImage from '@/assets/noodle.png'
import {motion,useScroll,useTransform} from "framer-motion"
import { useRef } from "react";
export const Hero = () => {
  const Heroref= useRef(null);
  const {scrollYProgress} =useScroll({
    target:Heroref,
    offset: ["start end","end start"]
  })
  const translateY = useTransform(scrollYProgress ,[0,1],[150,-150])
  return <section className="pt-0 pb-20  md:pt-0 md:pb-10 bg-[radial-gradient(ellipse_200%_100%_at_bottom_left,#183EC2,#EAEEFE_100%)] overflow-x-clip" style={{ height: 'calc(100vh - 80px)' }}>
    <div className="container" style={{ height: 'calc(100vh - 100px)' }}>
      <div className="md:flex items-center" style={{ height: 'calc(100vh - 120px)' }}>
        <div className="md:w-[478px]  ">
          <div className="text-sm inline-flex border border-[#222]/10 px-3 rounded-lg tracking-tight mt-10">Version2.0 here</div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-gradient-to-b from-black to-[#001E80] text-transparent bg-clip-text mt-6">
            Welcome to DoubleA shop
          </h1>
          <p className="text-xl text-[#010D3E] tracking-tight mt-6">
          Welcome to the future of hydration! 
          Our automated bottled water vending service 
          ensures you stay refreshed with just a few clicks. 
          Whether you're at home, in the office, or on the go, 
          our smart vending machines deliver premium quality bottled 
          water directly to you. Say goodbye to the hassle of traditional 
          vending and embrace convenience and sustainability with DoubleA.

          Stay hydrated, stay healthy!
          </p>
          <div className="flex gap-1 items-center mt-[30px]">
            <button className="btn btn-primary">Get product</button>
            <button className="btn btn-text"> <span>Learn more</span></button>
          </div>
        </div>
        <div className="mt-5 md:mt-0 md:h-[648px] md:flex-1 relative ">
          <motion.img 
            src={cogImage.src} 
            alt="Cog image" 
            className="md:absolute lg:left-0 md:h-full md:w-auto md:max-w-none md:-left-6 "
            animate={{
              translateY:[-30,30],
            }}
            transition={{
              repeat:Infinity,
              repeatType:"mirror",
              duration:3,
              ease:"easeInOut",
            }}
          />
          <motion.img
            src={Cylinder.src} alt="Cylinder"
            width={220}
            height={220}
            className="hidden md:block -top-20 -left-32 md:absolute"
            style={{
              translateY: translateY,
            }}
          />
          <motion.img
            src={noodleImage.src}
            alt="noodle"
            width={220}
            className="hidden lg:block absolute top-[524px] left-[448px] rotate-[30deg]"
            style={{
              rotate:30,
              translateY:translateY,
            }}
          />
        </div>
      </div>
    </div>
  </section>;
};
