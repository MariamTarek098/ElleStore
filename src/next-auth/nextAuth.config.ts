import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";

export const nextAuthConfig: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,

  providers: [
    Credentials({
      name: "ElleStore",
      credentials: {
        email: { label: "Email", placeholder: "ex:Mahmoud@gmail.com", type: "email" },
        password: { label: "Password", placeholder: "******", type: "password" },
      },
      authorize: async function (credentials) {
        try {
          const resp = await fetch(
            `https://ecommerce.routemisr.com/api/v1/auth/signin`,
            {
              method: "POST",
              body: JSON.stringify(credentials),
              headers: { "Content-Type": "application/json" },
            }
          );
          
          const finalResult = await resp.json();
          console.log("from auth", finalResult);

          if (resp.ok) {
            const { name, email } = finalResult.user;
            
            // التأكد من وجود التوكن عشان الـ Decode ميضربش
            if (!finalResult.token) throw new Error("No token returned from API");

            const data: { id: string } = jwtDecode(finalResult.token);
            return {
              name,
              email,
              id: data.id,
              tokenCredentials: finalResult.token,
            };
          }

          // لو الداتا غلط
          return null;
        } catch (error) {
          // السطر ده هو اللي هيصطاد المشكلة الحقيقية في Vercel Logs
          console.error("Auth Fetch Error:", error);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    jwt: async function ({ token, user }) {
      if (user) {
        token.routetoken = user.tokenCredentials;
        token.id = user.id;
      }
      return token;
    },
    session: async function ({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    }
  },
  jwt: {
    maxAge: 60 * 60 * 3,
  },
  pages: {
    signIn: "/login",
    error: "/login", // السطر ده هيمنع الموقع يروح لصفحة api/auth/error
  },
};