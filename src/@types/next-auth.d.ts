import NextAuth from 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name: string;
      warName: string;
      rank: string;
      email: string;
      login: string;
      permission: {
        id: string;
        name: string;
        editPermission: boolean;
        editUser: boolean;
        editReceiver: boolean;
        editMail: boolean;
      };
    };
  }
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    user: {
      id: string;
      name: string;
      warName: string;
      rank: string;
      email: string;
      login: string;
      permission: {
        id: string;
        name: string;
        editPermission: boolean;
        editUser: boolean;
        editReceiver: boolean;
        editMail: boolean;
      };
    };
  }
}
