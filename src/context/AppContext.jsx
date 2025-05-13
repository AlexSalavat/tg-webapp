// ✅ AppContext.jsx (в src/context/AppContext.jsx)
import { createContext, useContext, useReducer } from 'react';

const AppContext = createContext();

const initialState = [];

function reducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const exists = state.find(item => item.id === action.payload.id);
      if (exists) {
        return state.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
      }
      return [...state, { ...action.payload }];
    }
    case 'UPDATE':
      return state.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
    case 'REMOVE':
      return state.filter(item => item.id !== action.payload);
    case 'CLEAR':
      return [];
    default:
      return state;
  }
}

export const AppProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(reducer, initialState);

  const addToCart = (product, quantity) =>
    dispatch({ type: 'ADD', payload: { ...product, quantity } });

  const updateQuantity = (id, quantity) =>
    dispatch({ type: 'UPDATE', payload: { id, quantity } });

  const removeFromCart = (id) =>
    dispatch({ type: 'REMOVE', payload: id });

  const clearCart = () => dispatch({ type: 'CLEAR' });

  return (
    <AppContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart }}>
      {children}
    </AppContext.Provider>
  );
};

export const useCart = () => useContext(AppContext);
