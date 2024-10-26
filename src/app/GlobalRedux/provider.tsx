"use client"
import { Provider, ProviderProps } from "react-redux"
import { store } from "./store"

export default function Providers ({children}:{ children: React.ReactNode;}) {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )

}