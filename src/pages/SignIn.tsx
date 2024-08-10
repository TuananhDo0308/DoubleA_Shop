import "@/app/globals.css";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const SignIn = () => {
  // Define validation schema using yup
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

  // Set up useForm with validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  // Handle form submission
  const onSubmit = (data) => {
    console.log("Form Data:", data);
    // Handle login logic here
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-cover bg-center" 
    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1486520299386-6d106b22014b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80')" }}>
    
      <div className="relative w-[650px] bg-white flex justify-center items-center shadow-lg h-[550px] rounded-lg">
        <div className="w-full max-w-md">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <span className="text-sm text-gray-900">Welcome back</span>
              <h1 className="text-2xl font-bold">Login to your account</h1>
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
            <div className="flex justify-between">
              <div>
                <input className="cursor-pointer" type="radio" name="rememberme" />
                <span className="text-sm">Remember Me</span>
              </div>
              <span className="text-sm text-blue-700 hover:underline cursor-pointer">Forgot password?</span>
            </div>
            <div>
              <button className="mt-4 mb-3 w-full bg-blue-500 hover:bg-blue-400 text-white py-2 rounded-md transition duration-100">Login now</button>
              <div className="flex space-x-2 justify-center items-center bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-md transition duration-100">
                <img className="h-5 cursor-pointer" src="https://i.imgur.com/arC60SB.png" alt="Google" />
                <button type="button">Or sign-in with Google</button>
              </div>
            </div>
            <p className="mt-8">Don't have an account? <span className="cursor-pointer text-sm text-blue-600" onClick={() => window.location.href='/SignUp'}>Join free today</span></p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
