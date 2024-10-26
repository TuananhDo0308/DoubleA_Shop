"use client"
import { Product } from "@/components/Product";
import { getCategories } from "@/services/categoryAPI";
import { getProducts } from "@/services/productAPI";
import { Category } from "@/types/Category";
import { ProductType } from "@/types/Product";
import { useState } from "react";
import {ChipTabs} from "@/components/Chiptabs";
// Server-side function to fetch data from APIs
export default async function ListProductsPage() {
  // Fetch categories and products on the server
  const categoryData = await getCategories();
  const productData = await getProducts();

  const initialCategories = [{ str_malh: 'All', str_tenlh: 'All' }, ...categoryData.list];
  const initialProducts = productData.list;

  return (
    <ClientSideComponent 
      initialCategories={initialCategories} 
      initialProducts={initialProducts} 
    />
  );
}

function ClientSideComponent({ initialCategories, initialProducts }: { initialCategories: Category[], initialProducts: ProductType[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const categories = initialCategories;
  const products = initialProducts
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredProducts = products?.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.str_malh === selectedCategory;
    const matchesSearch = product.str_tensp.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div>
      {/* Search Input */}
      <div className="flex justify-between">
        {/* Chip Tabs for Category selection */}
        <ChipTabs 
          categories={categories} 
          selectedCategory={selectedCategory} 
          setSelectedCategory={setSelectedCategory} 
        />
        <div className="px-36 py-6 flex justify-between items-center">
          <input 
            type="text"
            placeholder="Search for products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 border rounded-md w-96"
          />
        </div>
      </div>
      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-4 gap-4 px-32">
        {filteredProducts?.map((product) => (
          <Product key={product.str_masp} product={product} />
        ))}
      </div>
    </div>
  );
}
