import React, { createContext } from "react";
import all_product from '../Components/Assets/all_product';
export const ShopContext = createContext(null);
const ShopContextProvider = (props) => { // wrap the app component in shopContextProvider in main.jsx
    const contextValue = {all_product}
    return (
        <ShopContext.Provider value = {contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}
export default ShopContextProvider;