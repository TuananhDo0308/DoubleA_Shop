import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import Image from "next/image";
import Logo from "@/assets/logo.png";
import DefaultAvatar from "@/assets/avatar-2.png"; // Đường dẫn đến ảnh avatar mặc định
import SlideInNotifications from "@/components/Message"; // Import SlideInNotifications
import { IMG_URL } from "@/services/LinkAPI";
export const Navbar = ({onSignInClick, onAvatarClick }) => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);

  const handleScrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSignInClick = () => {
    const newNotification = {
      id: Math.random(), // Tạo ID ngẫu nhiên cho thông báo
      message: "ok", // Nội dung thông báo
    };
    setNotifications((prevNotifs) => [newNotification, ...prevNotifs]); // Thêm thông báo mới vào đầu mảng
  };

  const removeNotif = (id) => {
    setNotifications((prevNotifs) => prevNotifs.filter((n) => n.id !== id));
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur bg-white/5">
      
      <div className="py-5">
        <div className="container flex items-center justify-between">
          <Image src={Logo} alt="app_logo" height={30} width={30} />
          <nav className="flex gap-6 text-black/60 items-center">
            
            <button className="topNav" onClick={() => handleScrollToSection("hero")}>
              Home
            </button>
            <button className="topNav" onClick={() => handleScrollToSection("about-us")}>
              About Us
            </button>
            <button className="topNav" onClick={() => handleScrollToSection("shop")}>
              Shop
            </button>
            {user ? (
              <div className="flex items-center space-x-2">
                <button onClick={onAvatarClick} className="focus:outline-none">
                  <Image
                    src={`${IMG_URL}/${user?.strimg}` } // Dùng avatar của user hoặc avatar mặc định
                    alt="User Avatar"
                    width={40}
                    height={40}
                    className="rounded-full cursor-pointer"
                  />
                </button>
              </div>
            ) : (
              <button
                className="bg-black text-white px-4 py-2 rounded-lg font-medium inline-block"
                onClick={onSignInClick} // Gọi hàm khi nhấn Sign In
              >
                Sign In
              </button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};
