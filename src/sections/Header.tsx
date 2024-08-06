"use client"
import Image from "next/image";
import Logo from "@/assets/logo.png";
import { AnimatedHamburgerButton } from "../components/MenuButton";
import { useRouter } from 'next/navigation';
export const Navbar = () => {
  const router = useRouter();

  const handleSignInClick = () => {
    router.push('/SignIn');
  };

  return (
    <header className="sticky top-0 backdrop-blur-sm z-20">
      <div className="py-5">
        <div className="container flex items-center justify-between">
          <Image src={Logo} alt="app_logo" height={30} width={30} />
          <span className="md:hidden">
            <AnimatedHamburgerButton />
          </span>
          <nav className="hidden md:flex gap-6 text-black/60 items-center">
            <button className="topNav">Home</button>
            <button className="topNav">Shop</button>
            <button className="topNav">About</button>
            <button className="bg-black text-white px-4 py-2 rounded-lg font-medium inline-block" onClick={handleSignInClick}>
              Sign In
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};
