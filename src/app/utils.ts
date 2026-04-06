import { decode } from 'next-auth/jwt';
import { cookies } from 'next/headers';



export async function decodeToken():Promise<string  | null>{
    const cookie = await cookies()
    const nextAuthToken = cookie.get("next-auth.session-token")?.value

    const jwt = await decode({secret: process.env.NEXTAUTH_SECRET! , token: nextAuthToken})
 if (jwt){

     return jwt.routetoken as string
 }else{
    return null
 }
}