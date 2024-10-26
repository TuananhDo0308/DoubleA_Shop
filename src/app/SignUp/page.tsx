"use client"
import "@/app/globals.css";
import React, { useState } from "react";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import Image from "next/image";
import defaultImage from "@/assets/Farm/Fruit Farm Chaikulngamdee.jpg"; // Import the default image
import { registerUser } from "@/services/signUpAPI";
import Logo from "@/assets/logo.png";
import { useRouter } from "next/router"; // Import useRouter

interface UserFormData {
  firstName: string;
  lastName: string;
  dob: string;
  gender: string;
  address: string;
  phone: string;
  email: string;
  password: string;
  retypePassword: string;
  profilePicture: File | null;
}

export default function SignUp () {
  const [currentStep, setCurrentStep] = useState(0);
  const router = useRouter();

  const methods = useForm<UserFormData>({
    mode: "onTouched",
  });
  const { handleSubmit, getValues, setError, clearErrors } = methods;

  const validateStep = () => {
    const values = getValues();
    clearErrors();
  
    const calculateAge = (dob: string) => {
      const birthDate = new Date(dob);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        return age - 1;
      }
      return age;
    };
  
    if (currentStep === 0) {
      if (!values.firstName) {
        setError("firstName", { type: "manual", message: "First Name is required" });
        return false;
      }
      if (!values.lastName) {
        setError("lastName", { type: "manual", message: "Last Name is required" });
        return false;
      }
      if (!values.dob) {
        setError("dob", { type: "manual", message: "Date of Birth is required" });
        return false;
      }
      if (calculateAge(values.dob) < 10) {
        setError("dob", { type: "manual", message: "You must be at least 10 years old" });
        return false;
      }
      if (!values.gender) {
        setError("gender", { type: "manual", message: "Gender is required" });
        return false;
      }
    } else if (currentStep === 1) {
      if (!values.address) {
        setError("address", { type: "manual", message: "Address is required" });
        return false;
      }
      if (!values.phone || values.phone.length !== 10) {
        setError("phone", { type: "manual", message: "Phone number must be 10 digits" });
        return false;
      }
    } else if (currentStep === 2) {
      if (!values.email) {
        setError("email", { type: "manual", message: "Email is required" });
        return false;
      }
      if (!values.password || values.password.length < 6) {
        setError("password", { type: "manual", message: "Password must be at least 6 characters" });
        return false;
      }
      if (values.password !== values.retypePassword) {
        setError("retypePassword", { type: "manual", message: "Passwords must match" });
        return false;
      }
    } else if (currentStep === 3) {
      if (!values.profilePicture) {
        setError("profilePicture", { type: "manual", message: "Profile Picture is required" });
        return false;
      }
    }
  
    return true;
  };
  
  const onSubmit = async (data: UserFormData) => {

    try {
      const formData: UserFormData = {
        firstName: data.firstName,
        lastName: data.lastName,
        dob: data.dob,
        gender: data.gender,
        address: data.address,
        phone: data.phone,
        email: data.email,
        password: data.password,
        retypePassword: data.retypePassword,
        profilePicture: data.profilePicture, // Assuming this is a file object
      };
      
      //const response = await registerUser(formData); // Assuming registerUser expects FormData (your custom interface)
      //console.log("Final Data:", response);
      router.push("/"); 
    } catch (error: any) {
      console.error(error);
      alert(error.message || "Error occurred while signing up.");
    }
  };
  
  const nextStep = () => {
    if (validateStep()) {
      setCurrentStep((prev) => prev + 1);
    }
    console.log("ok")
  };

  const prevStep = () => setCurrentStep((prev) => prev - 1);

  return (
    <div className="relative min-h-screen flex justify-center max-h-full items-center">
      {/* Blurred Background */}
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-md"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1614738149154-d6c9f6668b34?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          zIndex: -1,
        }}
      ></div>

      {/* Content Container */}
      <div className="w-[650px] bg-white flex justify-center items-center shadow-lg h-full py-10 rounded-2xl z-10">
        <div className="w-full max-w-md">
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              {currentStep === 0 && <StepOne />}
              {currentStep === 1 && <StepTwo />}
              {currentStep === 2 && <StepThree />}
              {currentStep === 3 && <StepFour />}
              <div className="flex justify-between mt-6">
                {currentStep > 0 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-4 py-2 bg-gray-300 rounded"
                  >
                    Previous
                  </button>
                )}

                {currentStep < 3 && (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                  >
                    Next
                  </button>
                )}
                {currentStep === 0 && (
                  <button
                    type="button"
                    className="px-4 py-2 bg-gray-300 rounded"
                  >
                    Back
                  </button>
                )}
                {currentStep === 3 && (
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                  >
                    Sign up
                  </button>
                )}
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
};

const StepOne = () => {
  const { register, formState: { errors } } = useFormContext<UserFormData>();

  return (
    <div>
      <h1 className="text-2xl font-bold">Step 1: Personal Information</h1>
      <div className="mt-5">
        <label className="block text-md mb-2" htmlFor="firstName">First Name</label>
        <input
          className={`px-4 w-full border-2 py-2 rounded-md text-sm outline-none ${errors.firstName ? "border-red-500" : ""}`}
          type="text"
          {...register("firstName")}
          placeholder="Enter your first name"
        />
        {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
      </div>
      <div className="mt-5">
        <label className="block text-md mb-2" htmlFor="lastName">Last Name</label>
        <input
          className={`px-4 w-full border-2 py-2 rounded-md text-sm outline-none ${errors.lastName ? "border-red-500" : ""}`}
          type="text"
          {...register("lastName")}
          placeholder="Enter your last name"
        />
        {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
      </div>
      <div className="mt-5">
        <label className="block text-md mb-2" htmlFor="dob">Date of Birth</label>
        <input
          className={`px-4 w-full border-2 py-2 rounded-md text-sm outline-none ${errors.dob ? "border-red-500" : ""}`}
          type="date"
          {...register("dob")}
        />
        {errors.dob && <p className="text-red-500 text-sm">{errors.dob.message}</p>}
      </div>
      <div className="mt-5">
        <label className="block text-md mb-2">Gender</label>
        <div className="flex space-x-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              className="form-radio h-5 w-5 text-blue-600"
              {...register("gender")}
              value="male"
            />
            <span className="ml-2">Male</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              className="form-radio h-5 w-5 text-blue-600"
              {...register("gender")}
              value="female"
            />
            <span className="ml-2">Female</span>
          </label>
        </div>
        {errors.gender && <p className="text-red-500 text-sm">{errors.gender.message}</p>}
      </div>
    </div>
  );
};

const StepTwo = () => {
  const { register, formState: { errors } } = useFormContext<UserFormData>();

  return (
    <div>
      <h1 className="text-2xl font-bold">Step 2: Address Information</h1>
      <div className="mt-5">
        <label className="block text-md mb-2" htmlFor="address">Address</label>
        <input
          className={`px-4 w-full border-2 py-2 rounded-md text-sm outline-none ${errors.address ? "border-red-500" : ""}`}
          type="text"
          {...register("address")}
          placeholder="Enter your address"
        />
        {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
      </div>
      <div className="mt-5">
        <label className="block text-md mb-2" htmlFor="phone">Phone Number</label>
        <input
          className={`px-4 w-full border-2 py-2 rounded-md text-sm outline-none ${errors.phone ? "border-red-500" : ""}`}
          type="text"
          {...register("phone")}
          placeholder="Enter your phone number"
        />
        {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
      </div>
    </div>
  );
};

const StepThree = () => {
  const { register, formState: { errors } } = useFormContext<UserFormData>();

  return (
    <div>
      <h1 className="text-2xl font-bold">Step 3: Account Details</h1>
      <div className="mt-5">
        <label className="block text-md mb-2" htmlFor="email">Email</label>
        <input
          className={`px-4 w-full border-2 py-2 rounded-md text-sm outline-none ${errors.email ? "border-red-500" : ""}`}
          type="email"
          {...register("email")}
          placeholder="Enter your email"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      </div>
      <div className="my-3">
        <label className="block text-md mb-2" htmlFor="password">Password</label>
        <input
          className={`px-4 w-full border-2 py-2 rounded-md text-sm outline-none ${errors.password ? "border-red-500" : ""}`}
          type="password"
          {...register("password")}
          placeholder="Enter your password"
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
      </div>
      <div className="my-3">
        <label className="block text-md mb-2" htmlFor="retypePassword">Re-type Password</label>
        <input
          className={`px-4 w-full border-2 py-2 rounded-md text-sm outline-none ${errors.retypePassword ? "border-red-500" : ""}`}
          type="password"
          {...register("retypePassword")}
          placeholder="Re-type your password"
        />
        {errors.retypePassword && <p className="text-red-500 text-sm">{errors.retypePassword.message}</p>}
      </div>
    </div>
  );
};

const StepFour = () => {
  const { register, formState: { errors }, setValue, watch } = useFormContext<UserFormData>();

  const profilePicture = watch("profilePicture");
  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("profilePicture", file);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-center">Step 4: Upload Profile Picture</h1>
      <div className="mt-5 flex flex-col justify-center items-center w-full h-full">
        <label className="block text-md mb-2 text-center" htmlFor="profilePicture">Profile Picture</label>
        <input
          className="hidden"
          type="file"
          id="profilePictureInput"
          {...register("profilePicture")}
          onChange={handleProfilePictureChange}
        />
        <div className="flex items-center justify-center">
          {profilePicture ? (
            <Image
              src={URL.createObjectURL(profilePicture as File)}
              width={200}
              height={200}
              alt="Profile Preview"
              className="w-32 h-32 rounded-full object-cover cursor-pointer"
              onClick={() => document.getElementById("profilePictureInput")?.click()}
            />
          ) : (
            <Image
              src={defaultImage}
              width={200}
              height={200}
              alt="Default Profile"
              className="w-32 h-32 rounded-full object-cover cursor-pointer"
              onClick={() => document.getElementById("profilePictureInput")?.click()}
            />
          )}
        </div>
        {errors.profilePicture && <p className="text-red-500 text-sm mt-2">{errors.profilePicture.message}</p>}
      </div>
    </div>
  );
};

