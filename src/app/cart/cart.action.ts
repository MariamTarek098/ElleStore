"use server";
import { revalidatePath } from "next/cache";
import { decodeToken } from "../utils";

export async function addProuductToCart(id: string) {
  const userToken = await decodeToken();

  if (!userToken) {
    throw new Error("Session Ended. Please Login Again");
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
    throw new Error(finalRes.message || "Failed to add product");
  }

  return finalRes;
}


export async function RemoveProduct({itemId}: {itemId: string}) {
  const userToken = await decodeToken();
  if (userToken) {
    try {
      const res = await fetch(
        `https://ecommerce.routemisr.com/api/v2/cart/${itemId}`,
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