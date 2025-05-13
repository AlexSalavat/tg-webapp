// ✅ AppContext.jsx — глобальный контекст корзины с useReducer
import { createContext, useContext, useReducer } from 'react';

export const AppContext = createContext();

const initialState = [];

function reducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const existing = state.find(i => i.id === action.payload.id);
      if (existing) {
        return state.map(i =>
          i.id === action.payload.id
            ? { ...i, quantity: i.quantity + action.payload.quantity }
            : i
        );
      } else {
        return [...state, { ...action.payload }];
      }
    }
    case 'UPDATE':
      return state.map(i =>
        i.id === action.payload.id
          ? { ...i, quantity: action.payload.quantity }
          : i
      );
    case 'REMOVE':
      return state.filter(i => i.id !== action.payload);
    case 'CLEAR':
      return [];
    default:
      return state;
  }
}

export const AppProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(reducer, initialState);

  const addToCart = (item, quantity) =>
    dispatch({ type: 'ADD', payload: { ...item, quantity } });

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
