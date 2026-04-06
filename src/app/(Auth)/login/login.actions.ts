"use server";

import { getUserCart } from "@/services/product.services";

// import { log } from "console";
// import { LoginObjectType } from "./page";
// import { cookies } from "next/headers";

// export async function LoginAction(data: LoginObjectType) {
//   try {
//     const res = await fetch(
//       "https://ecommerce.routemisr.com/api/v1/auth/signin",
//       {
//         method: "POST",
//         body: JSON.stringify(data),
//         headers: { "Content-Type": "application/json" },
//       },
//     );

//     const finalResult = await res.json();
//     console.log("from login", finalResult);
//     if (finalResult.message === "success") {
//       const cookie = await cookies();
//       cookie.set("tkn", finalResult.token, {
//         httpOnly: true,
//         maxAge: 60 * 60 * 24,
//         // secure:true,
//         sameSite: "lax",
//       });
//       return { success: true, message: "Welcome to ElleStore" };
//     } else {
//       return { success: false, message: finalResult.message };
//     }
//   } catch (error: any) {
//     return { success: false, message: "Network error" };
//   }
// }



export async function getCurrentLoggedIn(){
    return getUserCart()
}