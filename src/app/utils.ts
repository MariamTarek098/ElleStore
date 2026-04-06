"use server";

import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function decodeToken() {
  const cookieStore = await cookies();

  const isProduction = process.env.NODE_ENV === "production";
  
  
  const cookieName = isProduction
    ? "__Secure-next-auth.session-token"
    : "next-auth.session-token";

  const token = cookieStore.get(cookieName)?.value;

  if (!token) return null;

  
  const decodedToken = await decode({
    token,
    secret: process.env.NEXTAUTH_SECRET as string,
    salt: cookieName, 
  });

  return decodedToken?.routetoken as string;
}