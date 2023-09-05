import React, { createContext, useContext, useReducer } from 'react';

const CartContext = createContext();

const initialState = {
  cart: [],
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const { product } = action.payload;
      const updatedCart = [...state.cart];
      const existingProductIndex = updatedCart.findIndex(
        (item) => item.product._id === product._id
      );

      if (existingProductIndex !== -1) {
        updatedCart[existingProductIndex].quantity += 1;
      } else {
        updatedCart.push({ product, quantity: 1 });
      }

      return { ...state, cart: updatedCart };

    case 'RESET_CART':
      return { ...state, cart: [] };

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: { product } });
  };

  const clearCart = () => {
    dispatch({ type: 'RESET_CART' });
  };

  return (
    <CartContext.Provider value={{ cart: state.cart, addToCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
