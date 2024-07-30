import { Navbar } from "@/sections/Header";
import { ListProducts } from "@/sections/ListProducts";
import { Hero } from "@/sections/Hero";
import { LogoTicker } from "@/sections/LogoTicker";
import { SwipeCarousel } from "@/sections/Carousel";
export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <LogoTicker />
      <SwipeCarousel/>
      <ListProducts />
    </>
  );
}
