"use client";
import { Product } from "@/components/Product";
import { motion } from "framer-motion";
import { getCategories } from "@/services/categoryAPI";
import { getProducts } from "@/services/productAPI";
import { Category } from "@/types/Category";
import { ProductType } from "@/types/Product";
import { useEffect, useState } from "react";

// Main component
export const ListProducts: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  // Fetch Products from API
  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      console.log("Fetched products:", data.list);
      setProducts(data.list);  
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // Fetch Categories from API
  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      console.log('Fetched categories:', data.list);
      setCategories([{ str_malh: 'All', str_tenlh: 'All' }, ...data.list]);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  // Filter products based on selected category
  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter(product => product.str_malh === selectedCategory);

  return (
    <div>
      {/* Chip Tabs for Category selection */}
      <ChipTabs 
        categories={categories} 
        selectedCategory={selectedCategory} 
        setSelectedCategory={setSelectedCategory} 
      />
      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-4 gap-4 px-32">
        {filteredProducts.map((product) => (
          <Product key={product.str_masp} product={product} />
        ))}
      </div>
    </div>
  );
};

// Component for Category Tabs
interface ChipTabsProps {
  categories: Category[];
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
}

const ChipTabs: React.FC<ChipTabsProps> = ({ categories, selectedCategory, setSelectedCategory }) => {
  return (
    <div className="px-36 py-6 flex items-center flex-wrap gap-2">
      {categories.map((category: Category) => (
        <Chip
          key={category.str_malh}
          text={category.str_tenlh}  
          value={category.str_malh}  
          selected={selectedCategory === category.str_malh}
          setSelectedCategory={setSelectedCategory}
        />
      ))}
    </div>
  );
};

// Component for individual Chip (Tab)
interface ChipProps {
  text: string;
  value: string;
  selected: boolean;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
}

const Chip: React.FC<ChipProps> = ({ text, value, selected, setSelectedCategory }) => {
  return (
    <button
      onClick={() => setSelectedCategory(value)}
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
          className="absolute inset-0 z-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-md"
        />
      )}
    </button>
  );
};
