'use server'

import { RegisterObjectType } from "./page";

export async function RegisterAction(data: RegisterObjectType){
  try {
    const res = await fetch(
      "https://ecommerce.routemisr.com/api/v1/auth/signup",
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      }
    );

    const finalResult = await res.json();

    if (finalResult.message === "success") {
     
      return { success: true, message: "Account created successfully!" };
    } else {
      return { success: false, message: finalResult.message };
    }

  } catch (error: any) {
    return { success: false, message: "Network error" };
  }
}