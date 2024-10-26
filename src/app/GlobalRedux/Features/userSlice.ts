import { createSlice, PayloadAction } from "@reduxjs/toolkit"
type userInterface = {
    str_mand: string;
    str_ho_ten: string;
    ld_ngay_sinh: string; // Date or string depending on how you handle date
    str_dia_chi: string;
    str_tai_khoan: string;
    str_mat_khau: string;
    strsdt: string;
    str_gioi_tinh: string;
    strimg: string;
    str_email: string;
    b_xoa: boolean;
    str_mapq: string;
  };

// Define the user state interface
type UserState = {
  isAuth: boolean,
  str_ho_ten: string,
  str_mand: string,
  strimg: string,
  ld_ngay_sinh: string,
  str_dia_chi: string,
  str_tai_khoan: string,
  str_mat_khau: string,
  strsdt: string,
  str_gioi_tinh: string,
  str_email: string,
  b_xoa: boolean,
  str_mapq: string
};

// Define the initial state
const initialState = {
  value: {
    isAuth: false,
    str_ho_ten: "",
    str_mand: "",
    strimg: "",
    ld_ngay_sinh: "2000-01-01",
    str_dia_chi: "",
    str_tai_khoan: "",
    str_mat_khau: "",
    strsdt: "",
    str_gioi_tinh: "",
    str_email: "",
    b_xoa: false,
    str_mapq: ""
  } as UserState
};

// Create the Redux slice
export const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    logOut: (state) => {
      return initialState;
    },
    logIn: (state, action: PayloadAction<userInterface>) => {
      return {
        value: {
          isAuth: true,    // Set `isAuth` to true when the user logs in
          ...action.payload // Copy all properties from the user object passed in the action
        }
      };
    }
  }
});

// Export actions and reducer
export const { logIn, logOut } = user.actions;
export default user.reducer;
