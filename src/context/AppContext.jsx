import { createContext, useContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => setCart([...cart, item]);
  const removeFromCart = (id) => setCart(cart.filter(it => it.id !== id));
  const clearCart = () => setCart([]);

  return (
    <AppContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </AppContext.Provider>
  );
};

export const useCart = () => useContext(AppContext);
