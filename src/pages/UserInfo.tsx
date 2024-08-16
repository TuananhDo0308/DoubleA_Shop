import React, { useState } from "react";
import { OrderHistory } from "@/sections/OrderHistory"; // Adjust the import path accordingly
import { useAuth } from "@/context/AuthContext";
import DefaultAvatar from "@/assets/avatar-2.png"; // Path to default avatar image
import Image from "next/image";
import { IMG_URL } from "@/services/LinkAPI";
export default function UserInfo({ setShowUserInfo, onOpenEditModal }) {
  const { user, signOut } = useAuth(); // Lấy hàm logout từ AuthContext

  const handleLogout = () => {
    signOut(); // Gọi hàm logout
    setShowUserInfo(false); // Đóng cửa sổ UserInfo
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="relative w-full h-full bg-white shadow-lg overflow-y-auto">
        <button
          onClick={() => setShowUserInfo(false)}
          className="absolute top-4 left-4 z-50 text-xl font-bold text-white"
        >
          &larr; Back
        </button>

        {/* User Profile Section */}
        <div className="relative block h-64">
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=2710&amp;q=80')",
            }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-50 bg-black"
            ></span>
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-20"
            style={{ transform: "translateZ(0px)" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-white fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </div>

        <div className="relative py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-32">
              <div className="px-6">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                    <Image
                      alt="Profile"
                      src={`${IMG_URL}/${user?.strimg}` || DefaultAvatar}
                      className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                      width={150}
                      height={150}
                    />
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                    <div className="py-6 px-3 mt-32 sm:mt-0">
                      <button
                        onClick={onOpenEditModal} // Trigger modal when clicking edit
                        className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                        type="button"
                      >
                        Edit
                      </button>
                      <button
                        onClick={handleLogout} // Gọi hàm logout khi click
                        className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                        type="button"
                      >
                        Log out
                      </button>
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-1">
                    <div className="flex justify-center py-4 lg:pt-4 pt-8">
                      <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-gray-600">
                          {user?.str_email || "N/A"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-8">
                  <h3 className="text-4xl font-semibold leading-normal text-gray-700 ">
                    {user?.str_ho_ten || "N/A"}
                  </h3>
                  <div className="text-sm leading-normal mt-1 text-gray-400 font-bold uppercase">
                    <i className="fas fa-map-marker-alt text-lg text-gray-400"></i>
                    Address: {user?.str_dia_chi || "N/A"}
                  </div>
                  <div className="text-sm leading-normal mt-1 text-gray-400 font-bold uppercase">
                    <i className="fas fa-phone-alt text-lg text-gray-400"></i>
                    Contact: {user?.strsdt || "N/A"}
                  </div>
                  <div className="mb-2 text-gray-600 ">
                    <i className="fas fa-calendar-day text-lg text-gray-400"></i>
                    Birthday: {user?.ld_ngay_sinh || "N/A"}
                  </div>
                </div>

                {/* Order History Section */}
                <div className="mt-10 py-10 border-t border-gray-200">
                  <OrderHistory />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}