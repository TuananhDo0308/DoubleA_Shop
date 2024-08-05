import Image from "next/image";
import Logo from "@/assets/logo.png";
import { AnimatedHamburgerButton } from "../components/MenuButton";
import Link from 'next/link';
import SignIn from "./SignIn";

export const Navbar = () => {
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
            <Link href="/src/assets/SignIn">
              <p className="bg-black text-white px-4 py-2 rounded-lg font-medium inline-flex justify-center tracking-tight">Sign In</p>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};
