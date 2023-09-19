import React, { createContext, useContext, useReducer, useState } from 'react';

const CartContext = createContext();

const initialState = {
    cart: [],
};

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            const { product } = action.payload;
            const updatedCart = [...state.cart];
            const existingProductIndex = updatedCart.findIndex((item) => item.product._id === product._id);

            if (existingProductIndex !== -1) {
                updatedCart[existingProductIndex].quantity += 1;
            } else {
                updatedCart.push({ product, quantity: 1 });
            }

            return { ...state, cart: updatedCart };

        case 'REMOVE_FROM_CART':
            const { productId } = action.payload;
            const updatedCart2 = [...state.cart];
            const existingProductIndex2 = updatedCart2.findIndex((item) => item.product._id === productId);

            if (existingProductIndex2 !== -1) {
                updatedCart2.splice(existingProductIndex2, 1);
            }

            return { ...state, cart: updatedCart2 };

        case 'RESET_CART':
            return { ...state, cart: [] };

        default:
            return state;
    }
};

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);
    const [cartID, setCartID] = useState(null);

    const addToCart = (product) => {
        dispatch({ type: 'ADD_TO_CART', payload: { product } });
    };

    const removeFromCart = (productId) => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: { productId } });
    };

    const clearCart = () => {
        dispatch({ type: 'RESET_CART' });
    };

    return (
        <CartContext.Provider value={{ cart: state.cart, addToCart, removeFromCart, clearCart, cartID, setCartID }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    return useContext(CartContext);
};
