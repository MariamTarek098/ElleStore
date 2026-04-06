'use server'
import { decodeToken } from "../utils";
import { revalidatePath } from "next/cache";

export async function addProuductToWishlist(id: string) {
  const userToken = await decodeToken();
  if (!userToken) throw new Error("Please Login Again");

  const res = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
    method: "POST",
    body: JSON.stringify({ productId: id }),
    headers: {
      token: userToken,
      "Content-Type": "application/json",
    },
  });

  const finalRes = await res.json();
  if (!res.ok) throw new Error(finalRes.message || "Failed to add");
  
  revalidatePath("/wishlist");
  return finalRes; 
}

export async function removeProductFromWishlist({ itemId }: { itemId: string }) {
  const userToken = await decodeToken();
  if (!userToken) throw new Error("Session Error");

  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist/${itemId}`, {
    method: "DELETE",
    headers: { token: userToken },
  });

  const finalRes = await res.json();
  if (!res.ok) throw new Error("Failed to remove");
  
  revalidatePath("/wishlist");
  return finalRes; 
}