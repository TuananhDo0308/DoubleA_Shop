"use client";
import appleImg from "@/assets/products/Fruits/apple.jpg";
import kiwiImg from "@/assets/products/Fruits/kiwi.jpg";
import orangeImg from "@/assets/products/Fruits/orange.jpg";
import strawberryImg from "@/assets/products/Fruits/Straw.jpg";
import watermelonImg from "@/assets/products/Fruits/watermelom.jpg";
import matchaImg from "@/assets/products/Tea/MATCHA.jpg";
import { Product } from "@/components/Product";
import { motion } from "framer-motion";
import { useState } from "react";
export const ListProducts = () => {
  const products = [
    {
      id: 1,
      name: 'Apple Juice',
      image: appleImg,
      price: '5.00$',
      category: 'Juice',
    },
    {
      id: 2,
      name: 'Kiwi Juice',
      image: kiwiImg,
      price: '6.00$',
      category: 'Juice',
    },
    {
      id: 3,
      name: 'Orange Juice',
      image: orangeImg,
      price: '4.00$',
      category: 'Juice',
    },
    {
      id: 4,
      name: 'Strawberry Smoothie',
      image: strawberryImg,
      price: '8.00$',
      category: 'Smoothie',
    },
    {
      id: 5,
      name: 'Watermelon Juice',
      image: watermelonImg,
      price: '3.00$',
      category: 'Juice',
    },
    {
      id: 6,
      name: 'Matcha Latte',
      image: matchaImg,
      price: '5.00$',
      category: 'Tea',
    },
  ];

  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter(product => product.category === selectedCategory);

  return (
    <div>
      <ChipTabs selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
      <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-4 gap-4 px-32">
        {filteredProducts.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

const tabs = ["All", "Juice", "Smoothie", "Tea"];

const ChipTabs = ({ selectedCategory, setSelectedCategory }) => {
  return (
    <div className="px-36 py-6   flex items-center flex-wrap gap-2">
      {tabs.map((tab) => (
        <Chip
          text={tab}
          selected={selectedCategory === tab}
          setSelectedCategory={setSelectedCategory}
          key={tab}
        />
      ))}
    </div>
  );
};

const Chip = ({ text, selected, setSelectedCategory }) => {
  return (
    <button
      onClick={() => setSelectedCategory(text)}
      className={`${
        selected
          ? "text-white font-black"
          : "text-slate-800 hover:text-slate-900 hover:bg-slate-300"
      } text-base transition-colors px-5 py-2 rounded-md relative`}
    >
      <span className="relative z-10">{text}</span>
      {selected && (
        <motion.span
          layoutId="pill-tab"
          transition={{ type: "spring", duration: 0.5 }}
          className="absolute inset-0 z-0 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-md"
        ></motion.span>
      )}
    </button>
  );
};
