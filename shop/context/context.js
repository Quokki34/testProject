"use client";
import TheHeader from "@/components/TheHeader/TheHeader";
import { createContext, useContext, useEffect, useState } from "react";

export const Token = createContext('');

const getInitialState = () => {
  
  if (typeof localStorage !== 'undefined') {
      const token = localStorage.getItem('token');
        return token ? token : ''
  }
}

const Context = ({ children }) => {
    const [token, setToken] = useState(getInitialState);
    return (
      <Token.Provider value={{ token, setToken }}>
        {children}
      </Token.Provider>
    );
}

export const tokenGlobal = () => useContext(Context);

export default Context;
