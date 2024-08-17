import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import Image from "next/image";
import Logo from "@/assets/logo.png";
import DefaultAvatar from "@/assets/avatar-2.png"; // Default avatar path
import SlideInNotifications from "@/components/Message"; // Import SlideInNotifications
import { IMG_URL } from "@/services/LinkAPI";

// Define the props types for the Navbar component
interface NavbarProps {
  onSignInClick: () => void;
  onAvatarClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onSignInClick, onAvatarClick }) => {
  const { user } = useAuth(); // Get the user from AuthContext
  const [notifications, setNotifications] = useState<{ id: number; message: string }[]>([]);

  // Function to scroll to a section with smooth behavior
  const handleScrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Function to handle Sign In click and create a new notification
  const handleSignInClick = () => {
    const newNotification = {
      id: Math.random(), // Generate a random ID for the notification
      message: "Signed In successfully!", // Notification message
    };
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur bg-white/5">
      <div className="py-5">
        <div className="container flex items-center justify-between">
          {/* Logo */}
          <Image src={Logo} alt="app_logo" height={30} width={30} />

          {/* Navbar */}
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

            {/* Conditional Rendering based on user's auth state */}
            {user ? (
              <div className="flex items-center space-x-2">
                <button onClick={onAvatarClick} className="focus:outline-none">
                  <Image
                    src={user?.strimg ? `${IMG_URL}/${user?.strimg}` : DefaultAvatar.src} // Use user avatar or default avatar
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
                onClick={onSignInClick} // Call onSignInClick when clicked
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
