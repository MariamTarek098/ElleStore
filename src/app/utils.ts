"use server";

import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function decodeToken() {
  const cookieStore = await cookies();

  const token =
    cookieStore.get("__Secure-next-auth.session-token")?.value ||
    cookieStore.get("next-auth.session-token")?.value;

  if (!token) return null;

  const decodedToken = await decode({
    token,
    secret: process.env.NEXTAUTH_SECRET as string,
  });

  return decodedToken?.routetoken;
}