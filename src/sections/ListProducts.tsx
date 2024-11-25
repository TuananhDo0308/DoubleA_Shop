import { Product } from "@/components/Product";
import { getCategories } from "@/services/categoryAPI";
import { getProducts } from "@/services/productAPI";
import { Category } from "@/types/Category";
import { ProductType } from "@/types/Product";
import { useState } from "react";
import {ChipTabs} from "@/components/Chiptabs";
import ClientSideComponent from "./client";
// Server-side function to fetch data from APIs
export default async function ListProductsPage() {
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
