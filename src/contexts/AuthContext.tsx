import axios from 'axios';
import { createContext } from 'react';

type AuthContextType = {
  isAuthenticated: boolean;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }) {
  const isAuthenticated = false;

  async function signIn(data) {
    const res = await axios.post(`${process.env.API_URL}/auth`, data);
    console.log(res);
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}
