import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
import { setCookie, parseCookies, destroyCookie } from 'nookies';
import Router from 'next/router';
import { api } from '../services/api';
import { User } from '../@types';

type AuthContextType = {
  isAuthenticated: boolean;
  user: User;
  signIn: (data: SignInData) => Promise<boolean>;
  signOut: () => Promise<void>;
};

type SignInData = {
  login: string;
  password: string;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }) {
  const [user, setUser] = useState<User | null>(null);

  const isAuthenticated = !!user;

  useEffect(() => {
    const { 'sgdoc.token': access_token } = parseCookies();

    if (access_token) {
      api.get('/user/auth').then((res) => {
        const { data } = res;
        const { email, permission, staff } = data;
        const { rank, person } = staff;
        const { cpf, fullName, identity, warName } = person;

        const user: User = {
          email,
          rank,
          cpf,
          fullName,
          identity,
          warName,
          permission,
        };

        setUser(user);
      });
    }
  }, []);

  async function signIn({ login, password }: SignInData) {
    try {
      const result = await api.post('auth', { login, password });
      const { access_token, user } = result.data;

      api.defaults.headers['Authorization'] = `Bearer ${access_token}`;
      setUser(user);
      setCookie(undefined, 'sgdoc.token', access_token, {
        maxAge: 60 * 60 * 24, //24 hours
      });

      return result.status == 201;
    } catch (error) {}
    return false;
  }

  async function signOut() {
    api.defaults.headers['Authorization'] = undefined;
    destroyCookie(undefined, 'sgdoc.token');
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
