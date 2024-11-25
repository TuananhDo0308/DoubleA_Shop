"use client";
import Image from "next/image";
import Logo from "@/assets/logo.png";
import { AppDispatch } from "@/app/GlobalRedux/store";
import { useDispatch } from "react-redux";
import { FaArrowLeft,FaSignOutAlt } from "react-icons/fa";
import Link from "next/link";
import { logOut } from "@/app/GlobalRedux/Features/userSlice";
import { useRouter } from "next/navigation";
export default function UserProfileNavbar() {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    const handleLogout = () => {
        dispatch(logOut());
        router.push("/");
      };
    
  return (
    <header className="relative top-0 left-0 w-full z-50 border-b-2">
      <div className="px-10 py-4">
        <div className="flex justify-between ">
          <div className="flex gap-3 items-center ">
            <Link href="/">
              <button className="flex items-center space-x-2 h-10 text-gray-700 text-base font-semibold border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100">
                <FaArrowLeft className="text-blue-700" />
              </button>
            </Link>
            <div className="h-6 border-l border-gray-300"></div>

            <Link href="/">
              <button className="flex items-center space-x-2 text-gray-700 text-base font-semibold border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100">
                <Image src={Logo} alt="app_logo" height={10} width={15} />

                <span>DoubleA</span>
              </button>
            </Link>
          </div>
              <button onClick={handleLogout} className="flex items-center space-x-2 h-10 text-gray-700 text-base font-semibold border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100">
                <FaSignOutAlt className="text-blue-700" />
              </button>
          {/* Logo */}
        </div>
      </div>
    </header>
  );
}
