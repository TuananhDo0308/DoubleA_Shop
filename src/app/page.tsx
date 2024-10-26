import React, { useState, useEffect } from "react";
import Navbar from "@/sections/Header";
import ListProductsPage from "@/sections/ListProducts"; // Import ListProductsPage
import { Hero } from "@/sections/Hero";
import { LogoTicker } from "@/sections/LogoTicker";
import { SwipeCarousel } from "@/sections/Carousel";
import { TextParallaxContentExample } from "@/sections/AboutUs";
import Cartbutton from "@/sections/Cart/Cart";
import SignIn from "@/components/SignIn";
import CheckoutPage from "@/app/Checkout/page";
import { Footer } from "@/sections/Footer";

export default function Home() {
  return (
    <div>
      <Navbar />
      <SignIn />
      <section id="hero">
        <Hero />
        <LogoTicker />
      </section>
      <section id="about-us">
        <TextParallaxContentExample />
      </section>
      <section id="shop">
        <ListProductsPage />
      </section>
      <Footer />
      <section id="cart">
        <Cartbutton />
      </section>
    </div>
  );
}
