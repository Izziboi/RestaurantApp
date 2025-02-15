import React, { createContext, useState } from 'react';

/**
 * <ul>
 *  <li>Dies implementiert das Hinzufügen und Entfernen von Rezepten zur und von der Cart.js-Seite.</li>
 * <li>Es stellt seine Eigenschaften Cart.js zur Verfügung</li>
 * </ul>
 */

// Create context
export const CartContext = createContext();

// Create a provider component
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart((prevCart) => [...prevCart, item]);
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
