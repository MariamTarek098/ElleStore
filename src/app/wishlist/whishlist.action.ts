'use server'
import { decodeToken } from "../utils";
import { revalidatePath } from "next/cache";

export async function addProuductToWishlist(id: string) {
  const userToken = await decodeToken();
  
  if (!userToken) {
    return { success: false, message: "Please log in first to use the wishlist." };
  }

  const res = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
    method: "POST",
    body: JSON.stringify({ productId: id }),
    headers: {
      token: userToken,
      "Content-Type": "application/json",
    },
  });

  const finalRes = await res.json();
  
  if (!res.ok) {
    return { success: false, message: finalRes.message || "Failed to add to wishlist" };
  }
  
  revalidatePath("/wishlist");

  return { success: true, data: finalRes }; 
}

export async function removeProductFromWishlist({ itemId }: { itemId: string }) {
  const userToken = await decodeToken();
  
  if (!userToken) {
    return { success: false, message: "Please log in to manage your wishlist." };
  }

  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist/${itemId}`, {
    method: "DELETE",
    headers: { token: userToken },
  });

  const finalRes = await res.json();
  
  if (!res.ok) {
    return { success: false, message: finalRes.message || "Failed to remove item" };
  }
  
  revalidatePath("/wishlist");
 
  return { success: true, data: finalRes }; 
}