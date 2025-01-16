import React, { createContext } from "react";
import { useState } from "react";
import all_product from '../Components/Assets/all_product';
export const ShopContext = createContext(null);
const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index < all_product.length+1; index++) {
        cart[index] = 0;
    }
    return cart;
}
const ShopContextProvider = (props) => { // wrap the app component in shopContextProvider in main.jsx
    const [cartItems, setCartItems] = useState(getDefaultCart());
    // console.log(cartItems);
    const addToCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]:prev[itemId]+1}))
    }
    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]:prev[itemId]-1}))
    }
    const contextValue = {all_product, cartItems, addToCart, removeFromCart};
    
    return (
        <ShopContext.Provider value = {contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}
export default ShopContextProvider;