"use server";
import { decodeToken } from "@/app/utils";
import { PassInputs, ProfileInputs } from "@/interfaces/product.interface";
import { revalidatePath } from "next/cache";


export async function updateProfile(formData: ProfileInputs) {
  const userToken = await decodeToken();
  if (!userToken) return { status: "error", message: "Session Error" };

  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/users/updateMe/`,
      {
        method: "PUT",
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
      return { status: "success", message: "Success", data: finalRes };
    }

    return { 
      status: finalRes.statusMsg || "fail", 
      message: finalRes.message || "An unexpected error occurred", 
      errors: finalRes.errors 
    };

  } catch (error) {
    return { status: "error", message: "Network or Server Error" };
  }
}

export async function updatePassword(formData: PassInputs) {
  const userToken = await decodeToken();
  if (!userToken) return { status: "error", message: "Session Error" };

  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/users/changeMyPassword`,
      {
        method: "PUT",
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

    return { 
      status: "fail", 
      message: finalRes.message, 
      errors: finalRes.errors 
    };
    
  } catch (error) {
    return { status: "error", message: "Fetch Error" };
  }
}