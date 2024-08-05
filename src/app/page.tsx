import { Navbar } from "@/sections/Header";
import { ListProducts } from "@/sections/ListProducts";
import { Hero } from "@/sections/Hero";
import { LogoTicker } from "@/sections/LogoTicker";
import { SwipeCarousel } from "@/sections/Carousel";
import { TextParallaxContentExample } from "@/sections/AboutUs";
import { DragCloseDrawerExample } from "@/sections/Cart";

export default function Home() {
  return (
    <>
      <Navbar/>
      <section id="hero">
        <Hero />
      </section>
      <section id="shop">
        <LogoTicker />
      </section>
      <section id="about-us">
        <TextParallaxContentExample />
      </section>
      <section id="list-products">
        <ListProducts />
      </section>
      <section id="carousel">
        <SwipeCarousel />
      </section>
      <section id="cart">
        <DragCloseDrawerExample />
      </section>
    </>
  );
}
