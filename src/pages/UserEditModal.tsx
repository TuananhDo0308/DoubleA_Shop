"use client";
import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { updateProfile } from "@/services/signUpAPI"; // Import API call to update profile
import { useAuth } from "@/context/AuthContext"; // Import useAuth from AuthContext
import Image from "next/image";
import { IMG_URL } from "@/services/LinkAPI";

// Validation schema for the form
const schema = yup.object().shape({
  str_ho_ten: yup.string().required("Name is required"),
  str_email: yup.string().email("Invalid email address").required("Email is required"),
  strsdt: yup.string().required("Phone number is required"),
  str_dia_chi: yup.string().required("Address is required"),
  ld_ngay_sinh: yup.date().required("Date of Birth is required").nullable(),
  profilePicture: yup.mixed().notRequired(),
});

export default function UserEditModal({ onClose }) {
  const { user, setUser } = useAuth(); // Get the user and setUser from the AuthContext

  // Initialize form methods with react-hook-form
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      str_ho_ten: user?.str_ho_ten || "",
      str_email: user?.str_email || "",
      strsdt: user?.strsdt || "",
      str_dia_chi: user?.str_dia_chi || "",
      ld_ngay_sinh: user?.ld_ngay_sinh || "",
      profilePicture: user?.strimg || "",
    },
    mode: "onTouched",
  });

  const { handleSubmit, setValue, watch, formState: { errors } } = methods;
  const profilePicture = watch("profilePicture");

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setValue("profilePicture", file);
    }
  };

  const onSubmit = async (data) => {
    try {
      // Prepare the FormData object
      const formData = new FormData();
      formData.append("userID", user.str_mand);
      formData.append("newName", data.str_ho_ten);
      formData.append("email", data.str_email);
      formData.append("password", user.str_mat_khau); // Keep the current password
      formData.append("phone", data.strsdt);
      formData.append("dob", data.ld_ngay_sinh);
      formData.append("address", data.str_dia_chi);

      // If a new image was uploaded, append it to the form data
      if (data.profilePicture) {
        formData.append("profilePicture", data.profilePicture);
      }
      else{
        formData.append("profilePicture", user.strimg);
      }
      console.log("hello2",user)

      // Call the API to update the profile
      const response = await updateProfile(formData);

      // Update the user in the AuthContext globally
      user.str_ho_ten= data.str_ho_ten;
      user.str_email= data.str_email;
      user.strsdt= data.strsdt;
      user.ld_ngay_sinh=response.user.ld_ngay_sinh;
      user.str_dia_chi= data.str_dia_chi;
      user.strimg= response.user.strimg;
      setUser(user);
      console.log("Profile updated successfully:", response);

      onClose(); // Close the modal after a successful update
    } catch (error) {
      console.error("Failed to update profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="relative w-full max-w-lg bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>

        {/* Wrap form with FormProvider to provide form methods to children */}
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>

            {/* Profile Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Profile Picture</label>
              <div className="mt-1 flex items-center">
                {profilePicture instanceof File ? (
                  <Image
                    src={URL.createObjectURL(profilePicture)}
                    alt="Profile Preview"
                    className="rounded-full object-cover"
                    width={150}
                    height={150}
                  />
                ) : (
                  <Image
                    src={`${IMG_URL}/${user?.strimg}`}
                    alt="Profile Picture"
                    className="rounded-full object-cover"
                    width={150}
                    height={150}
                  />
                )}
                <button
                  type="button"
                  onClick={() => document.getElementById('profilePictureInput').click()}
                  className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  Upload Image
                </button>
                <input
                  type="file"
                  id="profilePictureInput"
                  accept="image/*"
                  {...methods.register("profilePicture")}
                  onChange={handleProfilePictureChange}
                  className="hidden"
                />
                {errors.profilePicture && <p className="text-red-500 text-sm">{errors.profilePicture.message}</p>}
              </div>
            </div>

            {/* Name Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${errors.str_ho_ten ? "border-red-500" : ""}`}
                type="text"
                {...methods.register("str_ho_ten")}
              />
              {errors.str_ho_ten && <p className="text-red-500 text-sm">{errors.str_ho_ten.message}</p>}
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${errors.str_email ? "border-red-500" : ""}`}
                type="email"
                {...methods.register("str_email")}
              />
              {errors.str_email && <p className="text-red-500 text-sm">{errors.str_email.message}</p>}
            </div>

            {/* Phone Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${errors.strsdt ? "border-red-500" : ""}`}
                type="text"
                {...methods.register("strsdt")}
              />
              {errors.strsdt && <p className="text-red-500 text-sm">{errors.strsdt.message}</p>}
            </div>

            {/* Address Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <input
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${errors.str_dia_chi ? "border-red-500" : ""}`}
                type="text"
                {...methods.register("str_dia_chi")}
              />
              {errors.str_dia_chi && <p className="text-red-500 text-sm">{errors.str_dia_chi.message}</p>}
            </div>

            {/* Date of Birth Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
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
                onClick={onClose}
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
