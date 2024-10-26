import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the CartDetails type for individual items in the cart
type CartDetails = {
  str_mactgh: string;
  str_magh: string;
  str_masp: string;
  d_don_gia: number;
  i_so_luong: number;
  str_tensp: string;
  strimg: string;
};

// Define the CartState type for the cart itself
type CartState = {
  str_magh: string;
  str_mand: string;
  CartDetails: CartDetails[];
};

// Define the initial state of the cart
const initialState: CartState = {
  str_magh: "",
  str_mand: "",
  CartDetails: []
};

// Create the Redux slice for cart management
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Action to add a product to the cart
    addProduct: (state, action: PayloadAction<CartDetails>) => {
      state.CartDetails.push(action.payload);
    },

    // Action to remove a product from the cart based on `str_mactgh`
    removeProduct: (state, action: PayloadAction<string>) => {
      state.CartDetails = state.CartDetails.filter(
        (product) => product.str_mactgh !== action.payload
      );
    },

    // Set the entire cart with new data
    setCart: (state, action: PayloadAction<CartState>) => {
      return {
        ...state,
        ...action.payload
      };
    },

    // Set the quantity of a specific item in the cart
    setProductQuantity: (
      state,
      action: PayloadAction<{ str_mactgh: string; quantity: number }>
    ) => {
      const product = state.CartDetails.find(
        (item) => item.str_mactgh === action.payload.str_mactgh
      );
      if (product) {
        product.i_so_luong = action.payload.quantity;
      }
    },

    // Increase the quantity of a specific item in the cart
    incrementProductQuantity: (state, action: PayloadAction<string>) => {
      const product = state.CartDetails.find(
        (product) => product.str_mactgh === action.payload
      );
      if (product) {
        product.i_so_luong += 1;
      }
    },

    // Decrease the quantity of a specific item in the cart
    decrementProductQuantity: (state, action: PayloadAction<string>) => {
      const product = state.CartDetails.find(
        (product) => product.str_mactgh === action.payload
      );
      if (product && product.i_so_luong > 1) {
        product.i_so_luong -= 1;
      }
    },

    // Clear the cart
    clearCart: () => initialState
  }
});

// Export actions and reducer
export const {
  addProduct,
  removeProduct,
  setCart,
  setProductQuantity,
  incrementProductQuantity,
  decrementProductQuantity,
  clearCart
} = cartSlice.actions;
export default cartSlice.reducer;
