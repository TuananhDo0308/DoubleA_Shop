"use client"
import {configureStore} from '@reduxjs/toolkit'
import userRecuder from './Features/userSlice'
import loginStatusReducer from './Features/loginUiSlice'
import productSliceReducer from './Features/productSlice'
import cartUiStatusSliceReducer from './Features/cartUiSlice'
import cartSliceReducer from './Features/userCart'
import userEditUiReducer from './Features/userEditUiSlice'



import { TypedUseSelectorHook, useSelector } from 'react-redux'

export const store=configureStore({
    reducer:{
        userRecuder,
        loginStatusReducer,
        productSliceReducer,
        cartUiStatusSliceReducer,
        cartSliceReducer,
        userEditUiReducer,

    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppSelector:TypedUseSelectorHook<RootState> = useSelector