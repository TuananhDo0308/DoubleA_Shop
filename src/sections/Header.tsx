"use client"
import { useState } from "react";
import Image from "next/image";
import Logo from "@/assets/logo.png";
import DefaultAvatar from "@/assets/avatar-2.png"; // Default avatar path
import SlideInNotifications from "@/components/Message"; // Import SlideInNotifications
import { IMG_URL } from "@/services/LinkAPI";
import { AppDispatch, useAppSelector } from "@/app/GlobalRedux/store";
import { useDispatch } from "react-redux";
import { changeStatus } from "@/app/GlobalRedux/Features/loginUiSlice";
import Link from "next/link";
export default function Navbar () {
  const user = useAppSelector((state)=>state.userReducer.value)
  const dispatch = useDispatch<AppDispatch>()
  // Function to scroll to a section with smooth behavior
  const handleScrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Function to handle Sign In click and create a new notification
  const handleSignInClick = () => {
    const newNotification = {
      id: Math.random(), // Generate a random ID for the notification
      message: "Signed In successfully!", // Notification message
    };
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur bg-white/5">
      <div className="py-5">
        <div className="container flex items-center justify-between">
          {/* Logo */}
          <Image src={Logo} alt="app_logo" height={30} width={30} />

          {/* Navbar */}
          <nav className="flex gap-6 text-black/60 items-center">
            <button className="topNav" >
              Home
            </button>
            <button className="topNav" >
              About Us
            </button>
            <button className="topNav" >
              Shop
            </button>
            {user.isAuth? (
              <div className="flex items-center space-x-2">
                <Link href="/UserProfile">
                  <button className="focus:outline-none">
                    <Image
                      src={`${IMG_URL}/${user?.strimg}`}
                      alt="User Avatar"
                      width={40}
                      height={40}
                      className="rounded-full cursor-pointer"
                    />
                  </button>
                </Link>
              </div>
            ) : (
              <button
                className="bg-black text-white px-4 py-2 rounded-lg font-medium inline-block"
                onClick={()=>{dispatch(changeStatus())}}
              >
                Sign In
              </button>
            )}
          </nav>
        </div>
      </div>

 
    </header>
  );
};
