"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]); // Initialize cart state

  // Load user and cart from localStorage on first render
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedCart = localStorage.getItem("cart");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  const signIn = (userData, cartData) => {
    setUser(userData);
    setCart(cartData?.CartDetails || []); // Set cart details from cartData

    // Save user and cart to localStorage for persistence
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("cart", JSON.stringify(cartData?.CartDetails || []));
  };

  const signOut = () => {
    setUser(null);
    setCart([]); // Clear cart on sign out

    // Clear localStorage on sign out
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
  };

  return (
    <AuthContext.Provider value={{ user, cart, setUser, setCart, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
