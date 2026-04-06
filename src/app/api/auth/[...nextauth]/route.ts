
import { nextAuthConfig } from "@/next-auth/nextAuth.config";

import NextAuth from "next-auth";


const routeHandler = NextAuth(nextAuthConfig)
export {routeHandler as GET ,routeHandler as POST}