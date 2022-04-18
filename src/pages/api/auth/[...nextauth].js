import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import axios from 'axios';

export default NextAuth({
    // Configure one or more authentication providers
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: 'Credentials',
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            credentials: {
                login: { label: "Login", type: "text", placeholder: "login" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {

                try {
                    const user = await axios.post('http://localhost:3333/auth', credentials);

                    if (user?.data.name)
                        return user.data
                    else
                        return false

                } catch (e) {
                    console.log(e);
                    return false
                }

            },

        })
    ],
    callbacks: {
        jwt: async ({ token, user, account, profile, isNewUser }) => {
            //  "user" parameter is the object received from "authorize"
            //  "token" is being send below to "session" callback...
            //  ...so we set "user" param of "token" to object from "authorize"...
            //  ...and return it...
            user && (token.user = user);
            return Promise.resolve(token)   // ...here
        },
        session: async ({ session, user, token }) => {

            //  "session" is current session object
            //  below we set "user" param of "session" to value received from "jwt" callback
            session.user = token.user;
            return Promise.resolve(session)
        }
    }
})