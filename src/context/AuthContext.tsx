"use client";
import React, { createContext, useContext, useState, useEffect,ReactNode } from "react";
interface AuthProviderProps {
  children: ReactNode; // Định nghĩa kiểu cho children là ReactNode
}
// Xác định kiểu cho context
interface AuthContextType {
  user: any; // Bạn có thể tùy chỉnh kiểu cho user nếu có
  cart: any[];
  signIn: (userData: any) => void;
  signOut: () => void;
  setCart: React.Dispatch<React.SetStateAction<any[]>>;
  setUser: React.Dispatch<React.SetStateAction<any>>;
}

// Tạo AuthContext với kiểu dữ liệu chuẩn xác
const AuthContext = createContext<AuthContextType>({
  user: null,
  cart: [],
  signIn: () => {},
  signOut: () => {},
  setCart: () => {},
  setUser: () => {},
});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<any>(null); // Kiểu của user là any, bạn có thể tùy chỉnh
  const [cart, setCart] = useState<any[]>([]); // Giỏ hàng là mảng

  // Load user và cart từ localStorage lần đầu tiên khi render
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedCart = localStorage.getItem("cart");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    if (storedCart) {
      setCart(JSON.parse(storedCart) || []); // Nếu không có dữ liệu thì để mảng rỗng
    }
  }, []);

  // Hàm đăng nhập, thiết lập user và cart
  const signIn = (userData: any) => {
    setUser(userData);

    // Lưu trữ vào localStorage
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // Hàm đăng xuất, xóa bỏ dữ liệu user và cart
  const signOut = () => {
    setUser(null);
    setCart([]); // Xóa cart khi đăng xuất

    // Xóa dữ liệu khỏi localStorage
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
  };

  return (
    <AuthContext.Provider value={{ user, cart, setUser, setCart, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook để truy cập AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
