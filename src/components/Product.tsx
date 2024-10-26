import React, { useRef, useState } from "react";
import { ProductType } from "@/types/Product";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import { addToCart } from "@/services/cartAPI";
import SlideInNotifications from "./Message";
import { IMG_URL } from "@/services/LinkAPI";
import ProductDetailModal from "./DetailProduct"; 
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, useAppSelector } from "@/app/GlobalRedux/store";
import { addProduct, setProductQuantity } from "@/app/GlobalRedux/Features/userCart"; // Import Redux actions

interface ProductProps {
  product: ProductType;
}

interface Notification {
  id: number;
  message: string;
}

export const Product: React.FC<ProductProps> = ({ product }) => {
  const dispatch = useDispatch<AppDispatch>(); // Use AppDispatch for typed dispatch
  const cart = useAppSelector((state) => state.cartSliceReducer.CartDetails); // Select cart from Redux
  const user = useAppSelector((state) => state.userReducer.value); // Select user info from Redux
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control the modal

  const handleAddToCart = async () => {
    try {
      const productInCart = cart.find(item => item.str_masp === product.str_masp);
      const desiredQuantity = productInCart ? productInCart.i_so_luong + 1 : 1;

      // Kiểm tra số lượng hàng tồn kho
      if (product.i_so_luong < desiredQuantity) {
        setNotifications(prev => [
          { id: Math.random(), message: `Not enough stock for ${product.str_tensp}` },
          ...prev
        ]);
        return;
      }

      // Chuyển đổi đối tượng `product` sang `CartDetails`
      const cartItem = {
        str_mactgh: productInCart ? productInCart.str_mactgh : Math.random().toString(36).substr(2, 9), // ID duy nhất cho mỗi mục trong giỏ hàng
        str_magh: cart.length > 0 ? cart[0].str_magh : "default-cart-id", // ID của giỏ hàng (tạm thời dùng "default-cart-id")
        str_masp: product.str_masp, // Mã sản phẩm
        str_tensp: product.str_tensp, // Tên sản phẩm
        d_don_gia: product.d_don_gia, // Đơn giá
        i_so_luong: 1, // Khởi tạo số lượng là 1 nếu thêm sản phẩm mới
        strimg: product.strimg || "", // Hình ảnh sản phẩm
      };

      // Thêm sản phẩm vào cơ sở dữ liệu
      await addProductToCartInDB();

      // Thêm sản phẩm vào giỏ hàng
      setNotifications(prev => [
        { id: Math.random(), message: `${product.str_tensp} added to cart` },
        ...prev
      ]);

      // Dispatch the action to add or update product in the cart
      dispatch(
        productInCart
          ? setProductQuantity({ str_mactgh: productInCart.str_mactgh, quantity: desiredQuantity })
          : addProduct(cartItem) // Sử dụng `cartItem` đã chuyển đổi
      );
    } catch (error) {
      setNotifications(prev => [
        { id: Math.random(), message: 'Error adding product to cart' },
        ...prev
      ]);
    }
  };


  // Function to handle adding product to DB
  const addProductToCartInDB = async () => {
    try {
      await addToCart(user.str_mand, product.str_masp);
    } catch (error) {
      setNotifications(prev => [
        { id: Math.random(), message: "Failed to add product to cart." },
        ...prev
      ]);
    }
  };

  // Remove notification after display
  const removeNotif = (id: number) => {
    setNotifications(prevNotifs => prevNotifs.filter(n => n.id !== id));
  };

  // Open product detail modal
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // Close product detail modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="p-4">
      <SlideInNotifications notifications={notifications} removeNotif={removeNotif} />
      <div className="w-full" onClick={handleOpenModal}> {/* Click to open the modal */}
        <TiltCard imageSrc={`${IMG_URL}/${product.strimg}`} altText={product.str_tensp} />
      </div>
      <h3 className="mt-2 text-lg font-extrabold uppercase px-4">{product.str_tensp}</h3>
      
      <div className='flex flex-wrap justify-between px-4'>
        <div>
          <div className='flex'>
            <p className='text-sm'>Stock: {product.i_so_luong}</p>
          </div>
          <p className="mt-1 font-bold text-lg text-blue-600">${product.d_don_gia.toFixed(2)}</p>
        </div>
        <button
          onClick={handleAddToCart}
          className="rounded-2xl mt-2 border-black bg-white px-4 py-2 font-semibold text-black transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none"
        >
          Add
        </button>
      </div>

      {isModalOpen && (
        <ProductDetailModal product={product} onClose={handleCloseModal} onAddToCart={handleAddToCart} />
      )}
    </div>
  );
};

interface TiltCardProps {
  imageSrc: string;
  altText: string;
}

const ROTATION_RANGE = 32.5;
const HALF_ROTATION_RANGE = ROTATION_RANGE / 2;

const TiltCard: React.FC<TiltCardProps> = ({ imageSrc, altText }) => {
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

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        transform,
        width: "100%",
        height: "300px",
      }}
      className="relative rounded-xl bg-gradient-to-br from-blue-500 to-[#183ec2]"
    >
      <div
        style={{
          transform: "translateZ(75px)",
          transformStyle: "preserve-3d",
        }}
        className="absolute inset-4 grid place-content-center rounded-xl bg-white shadow-lg overflow-hidden"
      >
        <Image
          src={imageSrc}
          alt={altText}
          layout="fill"
          objectFit="cover"
          quality={100}
          className="rounded-xl"
        />
      </div>
    </motion.div>
  );
};
