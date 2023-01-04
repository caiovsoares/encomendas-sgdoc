import axios from 'axios';
import { createContext, useState } from 'react';
import { setCookie } from 'nookies';
import Router from 'next/router';

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
    ediReceiver: boolean;
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

  async function signIn({ login, password }: SignInData) {
    const { access_token, user } = (
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth`, {
        login,
        password,
      })
    ).data;

    setCookie(undefined, 'sgdoc.token', access_token, {
      maxAge: 60 * 60 * 24, //24 hours
    });

    setUser(user);

    Router.push('/');
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}
