"use client";
import React, { useState } from "react";
import { OrderHistory } from "@/components/OrderHistory";
import { OrderHistory2 } from "@/components/OrderHistoryCompleted";
import Image from "next/image";
import { FaSignOutAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { AppDispatch, useAppSelector } from "../GlobalRedux/store";
import { useDispatch } from "react-redux";
import { logOut } from "../GlobalRedux/Features/userSlice";
import { useRouter } from "next/navigation";
import { changeStatus } from "../GlobalRedux/Features/userEditUiSlice";
import UserEditModal from "@/components/UserEditModal";
import { Chip } from "@/components/Chiptabs";
import UserPanel from "./UserPanel/UserPanel";
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
    <div className="relative bg-gray-100 flex flex-col items-center ">
      <UserPanel/>
      {/* Profile Section */}

      <div className="bg-white w-full max-w-screen-lg shadow-lg rounded-lg p-6 mt-16">
        

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
