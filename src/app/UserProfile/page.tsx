"use client";
import React, { useState } from "react";
import { OrderHistory } from "@/components/OrderHistory";
import { OrderHistory2 } from "@/components/OrderHistoryCompleted";
import DefaultAvatar from "@/assets/avatar-2.png";
import Image from "next/image";
import { IMG_URL } from "@/services/LinkAPI";
import { FaSignOutAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { AppDispatch, useAppSelector } from "../GlobalRedux/store";
import { useDispatch } from "react-redux";
import { logOut } from "../GlobalRedux/Features/userSlice";
import { useRouter } from "next/navigation";
import { changeStatus } from "../GlobalRedux/Features/userEditUiSlice";
import UserEditModal from "@/components/UserEditModal";
import Link from "next/link";
import { Chip } from "@/components/Chiptabs";

export default function UserInfo() {
  const [selectedTab, setSelectedTab] = useState<string>("OrderHistory");
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const user = useAppSelector((state) => state.userReducer.value);

  const handleLogout = () => {
    dispatch(logOut());
    router.push("/");
  };

  return (
    <div className="relative h-screen bg-gray-100 flex flex-col items-center pt-8">
      {/* Nút Back và Sign Out */}
      <div className="relative w-full">
        <Link href="/">
          <button className="absolute top-9 left-4 text-white text-xl font-bold bg-blue-700 px-5 py-2 rounded-xl hover:bg-blue-500">
            &larr; Back
          </button>
        </Link>
        <button
          onClick={handleLogout}
          className="absolute top-4 right-4 bg-black text-white p-2 rounded-md hover:bg-gray-700"
        >
          <FaSignOutAlt className="w-6 h-6" />
        </button>
      </div>

      {/* Profile Section */}
      <div className="bg-white w-full max-w-screen-lg shadow-lg rounded-lg p-6 mt-16">
        <div className="text-center">
          <Image
            src={user?.strimg ? `${IMG_URL}/${user.strimg}` : DefaultAvatar}
            alt="Profile"
            className="mx-auto mb-4 rounded-full border-4 border-white shadow-lg"
            width={120}
            height={120}
          />
          <h3 className="text-3xl font-semibold text-gray-700">
            {user?.str_ho_ten || "N/A"}
          </h3>
          <p className="text-gray-500 mt-2">{user?.str_email || "N/A"}</p>
        </div>

        <div className="text-center mt-4">
          <button
            onClick={() => dispatch(changeStatus())}
            className="bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-md px-4 py-2"
          >
            Edit
          </button>
        </div>

        <div className="mt-4 text-center space-y-1 text-gray-600">
          <p>
            <i className="fas fa-map-marker-alt mr-2"></i>Address:{" "}
            {user?.str_dia_chi || "N/A"}
          </p>
          <p>
            <i className="fas fa-phone-alt mr-2"></i>Contact:{" "}
            {user?.strsdt || "N/A"}
          </p>
          <p>
            <i className="fas fa-calendar-day mr-2"></i>Birthday:{" "}
            {user?.ld_ngay_sinh || "N/A"}
          </p>
        </div>

        {/* Tabs Navigation */}
        <div className="flex justify-center mt-8 space-x-4">
          <Chip
            text="Processing Orders"
            selected={selectedTab === "OrderHistory"}
            value="OrderHistory"
            setSelectedCategory={setSelectedTab}
          />
          <Chip
            text="Order History"
            selected={selectedTab === "OrderHistory2"}
            value="OrderHistory2"
            setSelectedCategory={setSelectedTab}
          />
        </div>

        {/* Tab Content */}
        <div className="mt-8 w-full bg-white rounded-lg shadow-lg p-6">
          {selectedTab === "OrderHistory" && (
            <motion.div
              key="OrderHistory"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <OrderHistory />
            </motion.div>
          )}
          {selectedTab === "OrderHistory2" && (
            <motion.div
              key="OrderHistory2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <OrderHistory2 />
            </motion.div>
          )}
        </div>
      </div>

      {/* User Edit Modal */}
      <UserEditModal />
    </div>
  );
}
