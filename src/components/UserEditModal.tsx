"use client";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { updateProfile } from "@/services/signUpAPI"; // Import API call to update profile
import Image from "next/image";
import { IMG_URL } from "@/services/LinkAPI";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/app/GlobalRedux/store";
import { logIn } from "@/app/GlobalRedux/Features/userSlice";
import { changeStatus } from "@/app/GlobalRedux/Features/userEditUiSlice";

const schema = yup.object().shape({
  str_ho_ten: yup.string().required("Name is required"),
  str_email: yup.string().email("Invalid email address").required("Email is required"),
  strsdt: yup.string().matches(/^\d{10}$/, "Phone number must be exactly 10 digits").required("Phone number is required"),
  str_dia_chi: yup.string().required("Address is required"),
  ld_ngay_sinh: yup.date().nullable().required("Date of Birth is required")
    .test("age", "You must be at least 10 years old", function(value) {
      const today = new Date();
      const birthDate = new Date(value);
      const age = today.getFullYear() - birthDate.getFullYear();
      return age >= 10;
    }),
  profilePicture: yup.mixed().notRequired(),
});

export default function UserEditModal() {
  const dispatch = useDispatch<AppDispatch>()
  const user = useAppSelector((state) => state.userReducer.value); // Lấy thông tin người dùng từ Redux
  const status = useAppSelector((state) => state.userEditUiReducer.value); // Lấy thông tin người dùng từ Redux

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      str_ho_ten: "",
      str_email: "",
      strsdt: "",
      str_dia_chi: "",
      ld_ngay_sinh: undefined,
      profilePicture: null,
    },
    mode: "onTouched",
  });

  const { handleSubmit, setValue, watch, formState: { errors } } = methods;
  const profilePicture = watch("profilePicture");

  useEffect(() => {
    if (user) {
      var dob = new Date(user.ld_ngay_sinh);
      setValue("str_ho_ten", user.str_ho_ten || "");
      setValue("str_email", user.str_email || "");
      setValue("strsdt", user.strsdt || "");
      setValue("str_dia_chi", user.str_dia_chi || "");
      setValue("ld_ngay_sinh",dob ||(undefined));
    }
  }, [user, setValue]);

  const handleProfilePictureChange = (e:any) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("profilePicture", file);
    }
  };

  const onSubmit = async (data:any) => {
    try {
      const formData = new FormData(); 
      formData.append("userID", user.str_mand);
      formData.append("newName", data.str_ho_ten);
      formData.append("email", data.str_email);
      formData.append("password", user.str_mat_khau);
      formData.append("phone", data.strsdt);
      formData.append("dob", data.ld_ngay_sinh?.toISOString().substring(0, 10)); 
      formData.append("address", data.str_dia_chi);
  
      if (data.profilePicture instanceof File) {
        formData.append("profilePicture", data.profilePicture); 
      }
  
      const response = await updateProfile(formData); 
  
      const updatedUser = {
        ...user,
        str_ho_ten: data.str_ho_ten,
        str_email: data.str_email,
        strsdt: data.strsdt,
        ld_ngay_sinh: response.user.ld_ngay_sinh,
        str_dia_chi: data.str_dia_chi,
        strimg: response.user.strimg || user.strimg,
      };
      dispatch(logIn(updatedUser));
      dispatch(changeStatus());

    } catch (error) {
      console.error("Failed to update profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };
  if(status){
    return (
      <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="relative w-full max-w-lg bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-3xl font-bold text-blue-800 mb-4">Edit Profile</h2>
  
          {/* Wrap form with FormProvider to provide form methods to children */}
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Profile Image Upload */}
              <div>
                <label className="block text-lg font-bold text-gray-700">Profile Picture</label>
                <div className="mt-1 flex items-center">
                  {profilePicture instanceof File ? (
                    <Image
                      src={URL.createObjectURL(profilePicture)}
                      alt="Profile Preview"
                      className="rounded-full object-cover cursor-pointer"
                      width={150}
                      height={150}
                      onClick={() => document.getElementById("profilePictureInput")?.click()}
                    />
                  ) : (
                    <Image
                      src={`${IMG_URL}/${user?.strimg}`}
                      alt="Profile Picture"
                      className="rounded-full object-cover cursor-pointer"
                      width={150}
                      height={150}
                      onClick={() => document.getElementById("profilePictureInput")?.click()}
                    />
                  )}
  
                  <input
                    type="file"
                    id="profilePictureInput"
                    accept="image/*"
                    onChange={handleProfilePictureChange}
                    className="hidden"
                  />
                </div>
              </div>
  
              {/* Name Input */}
              <div>
                <label className="block text-lg font-bold mt-2 text-gray-700">Name</label>
                <input
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${errors.str_ho_ten ? "border-red-500" : ""}`}
                  type="text"
                  {...methods.register("str_ho_ten")}
                />
                {errors.str_ho_ten && <p className="text-red-500 text-sm">{errors.str_ho_ten.message}</p>}
              </div>
  
              {/* Email Input */}
              <div>
                <label className="block text-lg font-bold mt-2 text-gray-700">Email</label>
                <input
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${errors.str_email ? "border-red-500" : ""}`}
                  type="email"
                  {...methods.register("str_email")}
                />
                {errors.str_email && <p className="text-red-500 text-sm">{errors.str_email.message}</p>}
              </div>
  
              {/* Phone Input */}
              <div>
                <label className="block text-lg font-bold mt-2 text-gray-700">Phone</label>
                <input
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${errors.strsdt ? "border-red-500" : ""}`}
                  type="text"
                  {...methods.register("strsdt")}
                />
                {errors.strsdt && <p className="text-red-500 text-sm">{errors.strsdt.message}</p>}
              </div>
  
              {/* Address Input */}
              <div>
                <label className="block text-lg font-bold mt-2 text-gray-700">Address</label>
                <input
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${errors.str_dia_chi ? "border-red-500" : ""}`}
                  type="text"
                  {...methods.register("str_dia_chi")}
                />
                {errors.str_dia_chi && <p className="text-red-500 text-sm">{errors.str_dia_chi.message}</p>}
              </div>
  
              {/* Date of Birth Input */}
              <div>
                <label className="block text-lg font-bold mt-2 text-gray-700">Date of Birth</label>
                <input
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${errors.ld_ngay_sinh ? "border-red-500" : ""}`}
                  type="date"
                  {...methods.register("ld_ngay_sinh")}
                />
                {errors.ld_ngay_sinh && <p className="text-red-500 text-sm">{errors.ld_ngay_sinh.message}</p>}
              </div>
  
              {/* Modal Actions */}
              <div className="mt-6 flex justify-end space-x-2">
                <button
                  onClick={()=>{dispatch(changeStatus());}}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  Update
                </button>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    );
  }
  
}
