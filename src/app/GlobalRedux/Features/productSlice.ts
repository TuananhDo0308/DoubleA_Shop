import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type Product = {
    str_masp: string;
    str_tensp: string;
    i_so_luong: number;
    d_don_gia: number;
    strimg: string;
    txt_mo_ta: string;
    str_malh: string;
    str_mancc: string;
    Supplier: {
        str_mancc: string;
    };
};

type InitialState = {
    products: Product[];
};

const initialState: InitialState = {
    products: []
};

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        addProduct: (state, action: PayloadAction<Product>) => {
            state.products.push(action.payload);
        },
        updateProduct: (state, action: PayloadAction<Product>) => {
            const index = state.products.findIndex(p => p.str_masp === action.payload.str_masp);
            if (index !== -1) {
                state.products[index] = action.payload;
            }
        },
        deleteProduct: (state, action: PayloadAction<string>) => {
            state.products = state.products.filter(p => p.str_masp !== action.payload);
        }
    }
});

export const { addProduct, updateProduct, deleteProduct } = productSlice.actions;

export default productSlice.reducer;
