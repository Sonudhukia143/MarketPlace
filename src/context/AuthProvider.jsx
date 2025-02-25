import {  createContext,useContext,useReducer } from "react";

const SEARCH = "SEARCH";
const ADDTOCART = "ADDTOCART";
const initialState = {
    products:null,
    cartedProducts:null,
    isSearching:false
}

const authReducer = (state, action) => {
  switch (action.type) {
    case SEARCH:
      return { ...state, products: action.payload.products ,isSearching:action.payload.isSearching };
    case ADDTOCART:
      const storedItems = localStorage.getItem('CartedProducts');
      let cartedItems = [];
      if(storedItems){
        cartedItems.push(storedItems);
      }
      cartedItems.push(action.payload.cartedProducts.id);
      localStorage.setItem('CartedProducts',cartedItems);
      return { ...state, cartedProducts: action.payload.cartedProducts};
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

export const AuthProvider = ({children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ state , dispatch }} >
      {children}
    </ AuthContext.Provider>
  )
}
