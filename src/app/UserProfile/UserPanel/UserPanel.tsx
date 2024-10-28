import { AppDispatch, useAppSelector } from "@/app/GlobalRedux/store";
import React from "react";
import Image from "next/image";
import { IMG_URL } from "@/services/LinkAPI";
import DefaultAvatar from "@/assets/avatar-2.png";
import { useDispatch } from "react-redux";
import { changeStatus } from "@/app/GlobalRedux/Features/userEditUiSlice";

export default function UserPanel() {
  const user = useAppSelector((state) => state.userReducer.value);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="bg-white container drop-shadow-md flex flex-col justify-center items-start rounded-xl my-4">
      <div className="py-6 flex items-center gap-3">
        <Image
          src={user?.strimg ? `${IMG_URL}/${user.strimg}` : DefaultAvatar}
          alt="Profile"
          className="mx-auto mb-4 rounded-full border-4 border-white shadow-lg"
          width={100}
          height={100}
        />
        <h3 className="text-3xl font-semibold text-gray-700">
          Hello {user?.str_ho_ten || "N/A"}
        </h3>
        
      </div>
      <p className="text-gray-500 mt-2">{user?.str_email || "N/A"}</p>
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
    </div>
  );
}
