import { createContext, useContext, useReducer } from "react";

const SEARCH = "SEARCH";
const ADDTOCART = "ADDTOCART";
const initialState = {
  products: null,
  cartedProducts: {
    id: null,
    count: null
  },
  isSearching: false
}

const authReducer = (state, action) => {
  switch (action.type) {
    case SEARCH:
      return { ...state, products: action.payload.products, isSearching: action.payload.isSearching };
    case ADDTOCART:
      let storedItems = JSON.parse(localStorage.getItem('CartedProducts')) || [];
        storedItems.push({
          id: action.payload.cartedProducts.id,
          count: action.payload.count
        });

      localStorage.setItem('CartedProducts', JSON.stringify(storedItems));
      return { ...state, cartedProducts: action.payload.cartedProducts };
    default:
      return state;
  }
};

const AuthContext = createContext();

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }

  return context;
}

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }} >
      {children}
    </ AuthContext.Provider>
  )
}
