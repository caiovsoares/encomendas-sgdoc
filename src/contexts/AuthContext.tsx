import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
import { setCookie, parseCookies } from 'nookies';
import Router from 'next/router';
import { api } from '../services/api';

type User = {
  fullName: string;
  warName: string;
  cpf: string;
  identity: string;
  rank: string;
  email: string;
  permission: {
    name: string;
    editPermission: boolean;
    editUser: boolean;
    editReceiver: boolean;
    editExpedition: boolean;
    editMail: boolean;
  };
};

type AuthContextType = {
  isAuthenticated: boolean;
  user: User;
  signIn: (data: SignInData) => Promise<void>;
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
    const { access_token, user } = (
      await api.post(`/auth`, {
        login,
        password,
      })
    ).data;

    setCookie(undefined, 'sgdoc.token', access_token, {
      maxAge: 60 * 60 * 24, //24 hours
    });

    api.defaults.headers['Authorization'] = `Bearer ${access_token}`;

    setUser(user);

    Router.push('/');
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}
