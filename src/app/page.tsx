"use client";
import React, { useState, useEffect } from "react";
import { Navbar } from "@/sections/Header";
import { ListProducts } from "@/sections/ListProducts";
import { Hero } from "@/sections/Hero";
import { LogoTicker } from "@/sections/LogoTicker";
import { SwipeCarousel } from "@/sections/Carousel";
import { TextParallaxContentExample } from "@/sections/AboutUs";
import { DragCloseDrawerExample } from "@/sections/Cart";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import SignIn from "@/pages/SignIn";
import UserInfo from "@/pages/UserInfo";
import CheckoutPage from "@/pages/Checkout";
import { Footer } from "@/sections/Footer";
import UserEditModal from "@/pages/UserEditModal"; // Import the modal

export default function Home() {
  const [showSignIn, setShowSignIn] = useState(false);
  const [showUserInfo, setShowUserInfo] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false); // Add state for edit modal


  const handleAvatarClick = () => {
    setShowUserInfo(true); // Show UserInfo overlay when avatar is clicked
  };

  const handleCheckoutClick = () => {
    setShowCheckout(true); // Show CheckoutPage overlay
  };

  const handleOpenEditModal = () => {
    setShowEditModal(true); // Show edit modal
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false); // Hide edit modal
  };


  return (
    <AuthProvider>
      <div>
        <Navbar
          onSignInClick={() => setShowSignIn(true)}
          onAvatarClick={handleAvatarClick} // Pass the handleAvatarClick function to Navbar
        />
        {showUserInfo || showCheckout ? (
          <>
            {showUserInfo && <UserInfo setShowUserInfo={setShowUserInfo} onOpenEditModal={handleOpenEditModal} />}
            {showCheckout && <CheckoutPage setShowCheckout={setShowCheckout} />}
          </>
        ) : (
          <>
            <section id="hero">
              <Hero />
              <LogoTicker />
            </section>
            <section id="about-us">
              <TextParallaxContentExample />
            </section>
            <section id="shop">
              <ListProducts />
            </section>
            <section id="carousel">
              <SwipeCarousel />
            </section>
            <section id="cart">
              <DragCloseDrawerExample onCheckoutClick={handleCheckoutClick} />
            </section>
            <Footer/>
          </>
        )}

        {showSignIn && <SignIn setShowSignIn={setShowSignIn} />}
        
        {/* Include the UserEditModal in the layout */}
        {showEditModal && (
          <UserEditModal onClose={handleCloseEditModal} />
        )}
      </div>
    </AuthProvider>
  );
}
