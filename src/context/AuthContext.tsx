"use client"
import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]); // Initialize cart state

  const signIn = (userData, cartData) => {
    setUser(userData);
    setCart(cartData?.CartDetails || []); // Set cart details from cartData
  };

  const signOut = () => {
    setUser(null);
    setCart([]); // Clear cart on sign out
  };

  return (
    <AuthContext.Provider value={{ user, cart,setUser, setCart, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
