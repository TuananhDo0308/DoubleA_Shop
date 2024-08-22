// src/types/Product.ts

export interface ProductType {
  str_masp: string;      // Product ID
  str_tensp: string;     // Product Name
  i_so_luong: number;    // Quantity in Stock
  d_don_gia: number;     // Price
  strimg?: string;       // Image URL (optional)
  str_malh: string;      // Category ID
  str_mancc: string;   
  txt_mo_ta:string  // Supplier ID
}

export interface Supplier {
  str_mancc: string;
  str_tenncc: string;
}

export interface Category {
  str_malh: string;
  str_tenlh: string;
}
