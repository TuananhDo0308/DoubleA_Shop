import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import { ProductType, Supplier, Category } from "@/types/Product";
import { IMG_URL } from "@/services/LinkAPI";
import { getSupplier, getCategories } from "@/services/categoryAPI";
import { getCart } from "@/services/cartAPI";
interface ProductDetailModalProps {
  product: ProductType;
  onClose: () => void;
  onAddToCart: () => void; // New prop for the Add to Cart function
}

const ROTATION_RANGE = 32.5;
const HALF_ROTATION_RANGE = ROTATION_RANGE / 2;

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose, onAddToCart }) => {
  const [supplierName, setSupplierName] = useState<string | null>(null);
  const [categoryName, setCategoryName] = useState<string | null>(null);

  const ref = useRef<HTMLDivElement | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x);
  const ySpring = useSpring(y);

  const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = (e.clientX - rect.left) * ROTATION_RANGE;
    const mouseY = (e.clientY - rect.top) * ROTATION_RANGE;

    const rX = (mouseY / height - HALF_ROTATION_RANGE) * -1;
    const rY = mouseX / width - HALF_ROTATION_RANGE;

    x.set(rX);
    y.set(rY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  useEffect(() => {
    const fetchSupplierName = async () => {
      try {
        const supplierData = await getSupplier();
        const supplier = supplierData.listSup.find((sup: Supplier) => sup.str_mancc === product.str_mancc);
        setSupplierName(supplier ? supplier.str_tenncc : "Unknown Supplier");
      } catch (error) {
        console.error("Error fetching supplier name:", error);
      }
    };

    const fetchCategoryName = async () => {
      try {
        const categoryData = await getCategories();
        const category = categoryData.list.find((cat: Category) => cat.str_malh === product.str_malh);
        setCategoryName(category ? category.str_tenlh : "Unknown Category");
      } catch (error) {
        console.error("Error fetching category name:", error);
      }
    };

    fetchSupplierName();
    fetchCategoryName();

  }, [product.str_mancc, product.str_malh, product.i_so_luong]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg flex flex-col md:flex-row">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          ✕
        </button>
        <motion.div
          ref={ref}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            transformStyle: "preserve-3d",
            transform,
            width: "350px",
            height: "500px",
          }}
          className="relative md:w-1/2 rounded-xl bg-gradient-to-br from-blue-500 to-[#183ec2] overflow-hidden"
        >
          <div
            style={{
              transform: "translateZ(75px)",
              transformStyle: "preserve-3d",
            }}
            className="absolute inset-4 grid place-content-center rounded-xl bg-white shadow-lg overflow-hidden"
          >
            <Image
              src={`${IMG_URL}/${product.strimg}`}
              alt={product.str_tensp}
              layout="fill"
              objectFit="cover"
              quality={100}
              className="rounded-xl"
            />
          </div>
        </motion.div>

        <div className="md:w-1/2 mt-4 md:mt-0 md:ml-4">
          <h2 className="text-2xl font-bold mb-4">{product.str_tensp}</h2>
          <p className="text-lg text-gray-600 mb-2"><strong>Category:</strong> {categoryName}</p>
          <p className="text-lg text-gray-600 mb-2"><strong>Price:</strong> ${product.d_don_gia.toFixed(2)}</p>
          <p className="text-lg text-gray-600 mb-2"><strong>Supplier:</strong> {supplierName}</p>
          <p className="text-lg text-gray-600 mb-2"><strong>Stock:</strong> {product.i_so_luong}</p>


          <div className="flex space-x-4">
            <button
              className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-md"
              onClick={onAddToCart} // Trigger the Add to Cart function
            >
              Add to Cart
            </button>
           
          </div>

          <p className="text-lg text-gray-600 mt-4"><strong>Description:</strong></p>
          <p className="text-lg text-gray-600 mb-4">{product.txt_mo_ta || "No description available."}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;
