"use client";
import "@/app/globals.css";
import React, { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginUser } from "@/services/signUpAPI";
import { useAuth } from "@/context/AuthContext";

// Define the form data interface
interface SignInFormData {
  email: string;
  password: string;
}

interface SignInProps {
  setShowSignIn: Dispatch<SetStateAction<boolean>>;
}

const SignIn: React.FC<SignInProps> = ({ setShowSignIn }) => {
  const { signIn } = useAuth();

  // Validation schema using Yup
  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Please enter a valid email address")
      .required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters long")
      .required("Password is required"),
  });

  // Setup react-hook-form with Yup resolver
  const { register, handleSubmit, formState: { errors } } = useForm<SignInFormData>({
    resolver: yupResolver(validationSchema),
  });

  // Handle form submission
  const onSubmit = async (data: SignInFormData) => {
    try {
      const response = await loginUser(data);
      console.log("User:", response.user);
      console.log("Image URL:", response.user.strimg);
      
      // Use signIn function from context
      signIn(response.user, response.cart);

      // Close the SignIn form after successful login
      setShowSignIn(false);
      
      // Store userId in localStorage
      localStorage.setItem("userId", response.user.str_mand);
    } catch (error: any) {
      console.error(error);
      alert(error.message || "Login failed!");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative w-[650px] bg-white flex justify-center items-center shadow-lg h-[550px] rounded-2xl">
        <div className="absolute top-0 right-2">
          <button onClick={() => setShowSignIn(false)} className="text-5xl font-normal px-4 py-2">
            &times;
          </button>
        </div>
        <div className="w-full max-w-md">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <span className="text-xl text-gray-900">Welcome back</span>
              <h1 className="text-3xl font-bold">Login to your account</h1>
            </div>
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
            <div className="flex justify-between items-center">
              <div className="items-center flex justify-center gap-2">
                <input className="cursor-pointer" type="checkbox" name="rememberme" />
                <span className="text-sm">Remember Me</span>
              </div>
              <span className="text-sm text-blue-700 hover:underline cursor-pointer">Forgot password?</span>
            </div>
            <div>
              <button className="mt-4 mb-3 w-full bg-[#183ec2] hover:bg-blue-400 text-white py-2 rounded-md transition duration-100">Login now</button>
            </div>
            <p className="mt-8">
              Don&apos;t have an account?{" "}
              <span className="cursor-pointer text-sm text-blue-600" onClick={() => window.location.href = '/SignUp'}>
                Join free today
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
