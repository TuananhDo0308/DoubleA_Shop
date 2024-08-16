import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa"; // Social media icons

export const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-200 py-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        
        {/* Footer Logo or Brand Name */}
        <div className="mb-6 md:mb-0">
          <h1 className="text-2xl font-bold text-white">DoubleA Shop</h1>
        </div>

        {/* Footer Links */}
        <div className="flex flex-col md:flex-row md:space-x-10 space-y-4 md:space-y-0">

        </div>

        {/* Social Media Links */}
        <div className="flex space-x-6 mt-6 md:mt-0">
          <a href="#" className="text-gray-400 hover:text-white">
            <FaFacebookF />
          </a>
          <a href="#" className="text-gray-400 hover:text-white">
            <FaTwitter />
          </a>
          <a href="#" className="text-gray-400 hover:text-white">
            <FaInstagram />
          </a>
          <a href="#" className="text-gray-400 hover:text-white">
            <FaLinkedinIn />
          </a>
        </div>
      </div>

      {/* Copyright Notice */}
      <div className="mt-8 text-center text-gray-500">
        <p>&copy; 2024 DoubleA Shop. All Rights Reserved.</p>
      </div>
    </footer>
  );
};
