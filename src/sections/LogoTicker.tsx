import logo1 from "@/assets/logo-acme.png"
import logo2 from "@/assets/logo-apex.png"
import logo3 from "@/assets/logo-celestial.png"

import Image from "next/image";

export const LogoTicker = () => {
  return (
    <div className="container mt-5 mb-5">
      <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black,transparent)]">
        <div className="flex gap-14 flex-none">
          <Image src={logo1} alt="logo1" className="logo-ticker-image"/>
          <Image src={logo1} alt="logo1" className="logo-ticker-image"/>
          <Image src={logo1} alt="logo1" className="logo-ticker-image"/>
          <Image src={logo1} alt="logo1" className="logo-ticker-image"/>
          <Image src={logo1} alt="logo1" className="logo-ticker-image"/>
          <Image src={logo1} alt="logo1" className="logo-ticker-image"/>
          <Image src={logo1} alt="logo1" className="logo-ticker-image"/>

        </div>
      </div>
    </div>
  );
};
