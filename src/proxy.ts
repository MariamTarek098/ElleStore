import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";


export async function proxy(req:NextRequest){


    const token = await getToken({req,secret: process.env.NEXTAUTH_SECRET })
console.log("from proxy", token)

    if(!!token){

        return NextResponse.next();

    }
    return NextResponse.redirect(`http://localhost:3000/login`)


}


export const config = {
    matcher: ["/cart","/profile/:path*","/wishlist","/allorders","/order"]
}

