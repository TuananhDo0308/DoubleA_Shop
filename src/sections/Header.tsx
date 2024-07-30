import Image from "next/image";
import Logo from "@/assets/logo.png"
import MenuIcon from "@/assets/menu.svg"
import { AnimatedHamburgerButton } from "../components/MenuButton";
export const Navbar = () => {
  return(  
    <header className="sticky top-0 backdrop-blur-sm z-20">
      <div className="py-5 ">
        <div className="container flex items-center justify-between">
          <Image src={Logo} alt="app_logo" height={30} width={30}></Image>
          <span className=" md:hidden">
            <AnimatedHamburgerButton/>
          </span>
          <nav className="hidden md:flex gap-6 text-black/60 items-center">
            <a href="" className="topNav">Home</a>
            <a href="" className="topNav">Shop</a>
            <a href="" className="topNav">About</a>
            <button className="bg-black text-white px-4 py-2 rounded-lg font-medium inline-flex justify-center tracking-tight">Sign In</button>
            
          </nav>
        </div>
      </div>
    </header>
  );
};
 