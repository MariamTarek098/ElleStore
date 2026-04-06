"use server";
import { decodeToken } from "@/app/utils";
import { revalidatePath } from "next/cache";


export type AddressInput = {
  name: string;
  details: string;
  phone: string;
  city: string;
};

export async function addAddress(formData: AddressInput) {
  const userToken = await decodeToken();
  if (!userToken) return { status: "error", message: "Session Error" };

  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/addresses`,
      {
        method: "POST",
        headers: { 
          "token": userToken,
          "Content-Type": "application/json" 
        },
        body: JSON.stringify(formData),
      }
    );

    const finalRes = await res.json();
    if (res.ok) {
      revalidatePath("/profile");
      return finalRes;
    }
    return { status: "error", message: finalRes.message };
  } catch (error) {
    return { status: "error", message: "Fetch Error" };
  }
}


export async function removeAddress({ addressId }: { addressId: string }) {
  const userToken = await decodeToken();
  if (!userToken) return null;
  try {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/addresses/${addressId}`, {
      method: "DELETE",
      headers: { token: userToken },
    });
    if (res.ok) {
      revalidatePath("/profile");
      return await res.json();
    }
    return null;
  } catch (error) {
    return null;
  }
}