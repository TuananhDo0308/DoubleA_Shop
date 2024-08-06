import "@/app/globals.css"
import React, { useState } from 'react';

const SignIn = () => {
  const [isLogin, setIsLogin] = useState(true);

  const LoginForm = () => (
    <div>
      <div>
        <span className="text-sm text-gray-900">Welcome back</span>
        <h1 className="text-2xl font-bold">Login to your account</h1>
      </div>
      <div className="mt-5">
        <label className="block text-md mb-2" htmlFor="email">Email</label>
        <input
          className="px-4 w-full border-2 py-2 rounded-md text-sm outline-none"
          type="email"
          name="email"
          placeholder="Enter your email"
        />
      </div>
      <div className="my-3">
        <label className="block text-md mb-2" htmlFor="password">Password</label>
        <input
          className="px-4 w-full border-2 py-2 rounded-md text-sm outline-none"
          type="password"
          name="password"
          placeholder="Enter your password"
        />
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
          <button>Or sign-in with Google</button>
        </div>
      </div>
      <p className="mt-8">Don't have an account? <span className="cursor-pointer text-sm text-blue-600" onClick={() => setIsLogin(false)}>Join free today</span></p>
    </div>
  );

  const SignUpForm = () => (
    <div>
      <div>
        <h1 className="text-2xl font-bold">Create your account</h1>
        <p className="text-sm text-gray-700">Try it free for 30 days, no CC required</p>
      </div>
      <div className="mt-5">
        <label className="block text-md mb-2" htmlFor="email">Email</label>
        <input
          className="px-4 w-full border-2 py-2 rounded-md text-sm outline-none"
          type="email"
          name="email"
          placeholder="Enter your email"
        />
      </div>
      <div className="my-3">
        <label className="block text-md mb-2" htmlFor="password">Password</label>
        <input
          className="px-4 w-full border-2 py-2 rounded-md text-sm outline-none"
          type="password"
          name="password"
          placeholder="Enter your password"
        />
      </div>
      <div className="my-3">
        <label className="block text-md mb-2" htmlFor="retype-password">Re-type Password</label>
        <input
          className="px-4 w-full border-2 py-2 rounded-md text-sm outline-none"
          type="password"
          name="retype-password"
          placeholder="Re-type your password"
        />
      </div>
      <div className="flex items-center">
        <input className="cursor-pointer mr-2" type="checkbox" name="terms" />
        <span className="text-sm">By signing up, I agree to the terms and conditions, privacy policy, and cookie policy</span>
      </div>
      <div>
        <button className="mt-4 mb-3 w-full bg-blue-500 hover:bg-blue-400 text-white py-2 rounded-md transition duration-100">Sign up</button>
      </div>
      <p className="mt-8">Already have an account? <span className="cursor-pointer text-sm text-blue-600" onClick={() => setIsLogin(true)}>Sign in</span></p>
    </div>
  );

  return (
    <div className="min-h-screen flex">
      <div className="w-1/2 bg-white flex justify-center items-center">
        <div className="w-full max-w-md">
          {isLogin ? <LoginForm /> : <SignUpForm />}
        </div>
      </div>
      <div className="w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1486520299386-6d106b22014b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80')" }}>      </div>
    </div>
  );
};

export default SignIn;
