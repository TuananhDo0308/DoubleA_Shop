import "@/app/globals.css";
import React, { useState } from "react";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import defaultImage from "@/assets/Farm/Fruit Farm Chaikulngamdee.jpg"; // Import the default image
import { registerUser } from "@/services/signUpAPI";
import Logo from "@/assets/logo.png";
import { useRouter } from "next/router"; // Import useRouter


const SignUp = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const router = useRouter(); // Initialize the router

  const stepOneSchema = yup.object().shape({
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
    dob: yup.date().required("Date of Birth is required").nullable(),
    gender: yup.string().required("Gender is required"),
  });

  const stepTwoSchema = yup.object().shape({
    address: yup.string().required("Address is required"),
    phone: yup.string().required("Phone number is required").length(10, "Phone number must be 10 digits"),
  });

  const stepThreeSchema = yup.object().shape({
    email: yup.string().email("Invalid email address").required("Email is required"),
    password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    retypePassword: yup
      .string()
      .oneOf([yup.ref('password'), null], "Passwords must match")
      .required("Please retype your password"),
  });

  const stepFourSchema = yup.object().shape({
    profilePicture: yup.mixed().required("Profile Picture is required"),
  });

  const methods = useForm({
    resolver: yupResolver(
      currentStep === 0 ? stepOneSchema :
      currentStep === 1 ? stepTwoSchema :
      currentStep === 2 ? stepThreeSchema : stepFourSchema
    ),
    mode: "onTouched",
  });

  const { handleSubmit, trigger } = methods;

  const onSubmit = async (data) => {
    try{
      const formData = new FormData();
      formData.append("firstName", data.firstName);
      formData.append("lastName", data.lastName);
      formData.append("dob", data.dob);
      formData.append("gender", data.gender);
      formData.append("address", data.address);
      formData.append("phone", data.phone);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("profilePicture", data.profilePicture); // Thêm file ảnh vào form

      const response = await registerUser(formData); // Gửi FormData
      console.log("Final Data:", response);
      window.location.href='/';
    }catch (error) {
      console.error(error);
      alert(error.message || "Đã xảy ra lỗi khi tạo tài khoản");
    }
  };

  const nextStep = async () => {
    const isValid = await trigger(); // Validate current step fields only
    if (isValid) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => setCurrentStep((prev) => prev - 1);
  return (
    <div className="relative min-h-screen flex justify-center items-center">
      {/* Blurred Background */}
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-md"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1614738149154-d6c9f6668b34?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          zIndex: -1,
        }}
      ></div>

      {/* Content Container */}
      <div className="w-[650px] bg-white flex justify-center items-center shadow-lg h-auto py-10 rounded-2xl z-10">
        <div className="w-full max-w-md">
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              {currentStep === 0 && <StepOne />}
              {currentStep === 1 && <StepTwo />}
              {currentStep === 2 && <StepThree />}
              {currentStep === 3 && <StepFour />}
              <div className="flex justify-between mt-6">
                {/* Back button appears only on step 1 */}
                  
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
                      onClick={() => router.push('/')}
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

      {/* Logo in the bottom-right corner */}
      <div className="absolute top-10 left-10">
        <Image src={Logo} alt="Logo" className="w-10 h-auto" />
      </div>
    </div>
  );
};

const StepOne = () => {
  const { register, formState: { errors } } = useFormContext();

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
  const { register, formState: { errors } } = useFormContext();

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
  const { register, formState: { errors } } = useFormContext();

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
    const { register, formState: { errors }, setValue, watch } = useFormContext();
  
    const profilePicture = watch("profilePicture");
    const handleProfilePictureChange = (e) => {
      const file = e.target.files[0];
      console.log("Selected File: ", file); // Kiểm tra định dạng file
      setValue("profilePicture", file);
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
              <img
                src={URL.createObjectURL(profilePicture)}
                alt="Profile Preview"
                className="w-32 h-32 rounded-full object-cover cursor-pointer"
                onClick={() => document.getElementById('profilePictureInput').click()}
              />
            ) : (
              <Image
                src={defaultImage}
                alt="Default Profile"
                className="w-32 h-32 rounded-full object-cover cursor-pointer"
                onClick={() => document.getElementById('profilePictureInput').click()}
              />
            )}
          </div>
          {errors.profilePicture && <p className="text-red-500 text-sm mt-2">{errors.profilePicture.message}</p>}
        </div>
      </div>
    );
  };
  
export default SignUp;
