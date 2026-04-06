"use server"
import { OrderPlaceType } from "@/interfaces/product.interface";
import { decodeToken } from "../utils";

export async function createCashOrder(cartId: string , bodyObject: OrderPlaceType) {
  const userToken = await decodeToken();

  if (!userToken) {
    throw new Error("Session Ended. Please Login Again");
  }

  const res = await fetch(`https://ecommerce.routemisr.com/api/v2/orders/${cartId}`, {
    method: "POST",
    body: JSON.stringify(bodyObject),
    headers: {
      token: userToken,
      "Content-Type": "application/json",
    },
  });

  const finalRes = await res.json();
  console.log("cashorder", finalRes)

  if (!res.ok) {
    
    throw new Error(finalRes.message || "Failed to create order");
  }


  return finalRes;
}


export async function createOnlineOrder(cartId: string , bodyObject: OrderPlaceType) {
  const userToken = await decodeToken();

  if (!userToken) {
    throw new Error("Session Ended. Please Login Again");
  }
  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`, {
    method: "POST",
    body: JSON.stringify(bodyObject),
    headers: {
      token: userToken,
      "Content-Type": "application/json",
    },
  });

  const finalRes = await res.json();
  console.log("onlineorder", finalRes)

  if (!res.ok) {
    
    throw new Error(finalRes.message || "Failed to create order");
  } 


  return finalRes;
}


