import { log } from "console";
import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { jwtDecode} from 'jwt-decode'

export const nextAuthConfig: NextAuthOptions = {
  providers: [
    Credentials({
      name: "ElleStore",
      credentials: {
        email: {
          label: "Email",
          placeholder: "ex:Mahmoud@gmail.com",
          type: "email",
        },
        password: {
          label: "Password",
          placeholder: "******",
          type: "password",
        },
      },
      authorize: async function (credentials) {
        const resp = await fetch(
          `https://ecommerce.routemisr.com/api/v1/auth/signin`,
          {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" },
          },
        );
        const finalResult = await resp.json();
        console.log("from auth", finalResult);

        if (resp.ok) {
          const { name, email } = finalResult.user;
          const data:{id:string} = jwtDecode(finalResult.token)
          return {
            name,
            email,
            id: data.id,
            tokenCredentials: finalResult.token,
          };
        }

        return null;
      },
    }),
  ],
  
  callbacks: {
jwt: function (param) {
  if (param.user) {
    param.token.routetoken = param.user?.tokenCredentials;
    param.token.id = param.user.id;
  }

  return param.token;
},
session: function (param) {
  if (param.session.user) {
    param.session.user.id = param.token.id as string;
  }

  return param.session;
}
  },
  jwt: {
    maxAge: 60 * 60 * 3,
  },
  pages: {
    signIn: "/login",
  },
};
