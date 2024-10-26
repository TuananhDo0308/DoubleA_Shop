// CartButton.tsx
"use client";
import React, { useState } from "react";
import Image from "next/image";
import Icon from "@/assets/BagIcon.png";
import { useAuth } from "@/context/AuthContext";
import { AppDispatch, useAppSelector } from "@/app/GlobalRedux/store";
import Drawer from "./CartDrawer";
import { useDispatch } from "react-redux";
import { changeStatus } from "@/app/GlobalRedux/Features/cartUiSlice";
export const CartButton: React.FC = () => {
  const user = useAppSelector((state) => state.userReducer.value);
  const dispatch = useDispatch<AppDispatch>()

  if(user.isAuth){
    return (
      <div className="absolute h-screen z-50">
        <button
          onClick={()=>{dispatch(changeStatus())}}
          className="fixed bottom-10 right-10 h-16 w-16 border-2 justify-around items-center flex flex-wrap rounded-full border-dashed border-black bg-white transition-all duration-300 hover:shadow-[4px_4px_0px_black] hover:translate-x-[-4px] hover:translate-y-[-4px]"
        >
          <Image src={Icon} alt="bagIcon" className="h-8 w-8" />
        </button>
        <Drawer/>
      </div>
      
    );  
  }
 
};
export default CartButton;
