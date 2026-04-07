"use server";
import { revalidatePath } from "next/cache";
import { decodeToken } from "../utils";

export async function addProuductToCart(id: string) {
  const userToken = await decodeToken();

  
  if (!userToken) {
    return { success: false, message: "Please Login First to add items." };
  }

  const res = await fetch("https://ecommerce.routemisr.com/api/v2/cart", {
    method: "POST",
    body: JSON.stringify({ productId: id }),
    headers: {
      token: userToken,
      "Content-Type": "application/json",
    },
  });

  const finalRes = await res.json();

  if (!res.ok) {
    return { success: false, message: finalRes.message || "Failed to add product" };
  }

  return { success: true, data: finalRes };
}


export async function RemoveProduct({ itemId }: { itemId: string }) {
  const userToken = await decodeToken();

  if (!userToken) {
    return { success: false, message: "Please log in to manage your cart." };
  }

  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v2/cart/${itemId}`,
      {
        method: "DELETE",
        headers: { token: userToken },
      }
    );

    const finalRes = await res.json();

    if (!res.ok) {
      return { success: false, message: finalRes.message || "Failed to remove item." };
    }

    revalidatePath("/cart");

    return { success: true, data: finalRes };
    
  } catch (error) {

    console.error("Remove Product Error:", error);
    return { success: false, message: "A network error occurred. Please try again." };
  }
}



export async function updateProduct(itemId: string , countitem :number) {
  const userToken = await decodeToken();
  if (userToken) {
    try {
      const res = await fetch(
        `https://ecommerce.routemisr.com/api/v2/cart/${itemId}`,
        {
          method: "PUT",
          headers: { token: userToken , "content-type":"application/json" },
          body:JSON.stringify({count :countitem})
        },
      );
      if (res.ok) {
        const finalRes = await res.json();
         revalidatePath("/cart")
        //  console.log("from dele",finalRes);

         return finalRes;
      }else{
         return null

      }
    } catch (error) {
      console.log(error);
    }
  } else {
    return new Error("Session Error");
  }
}


export async function ClearAllCart() {
  const userToken = await decodeToken();
  if (userToken) {
    try {
      const res = await fetch(
        `https://ecommerce.routemisr.com/api/v2/cart`,
        {
          method: "DELETE",
          headers: { token: userToken },
        },
      );
      if (res.ok) {
        const finalRes = await res.json();
         revalidatePath("/cart")
        //  console.log("from dele",finalRes);

         return finalRes;
      }else{
         return null

      }
    } catch (error) {
      console.log(error);
    }
  } else {
    return new Error("Session Error");
  }
}