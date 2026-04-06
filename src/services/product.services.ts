import { decodeToken } from "@/app/utils";
import {  UserAddress, BrandType, CartResponse, CategoryType, ProductType } from "@/interfaces/product.interface";
import { Address } from "cluster";


 export async function getAllProducts() : Promise<ProductType[] | undefined>{
    try {
      const resp = await fetch(
        "https://ecommerce.routemisr.com/api/v1/products" , {cache: "force-cache"},
      );
      const FinalRes = await resp.json();
      //  console.log("gggg",FinalRes)
      return FinalRes.data;
    } catch (error) {
      console.log(error);
    }
  }


   export async function getProductDetails(id : string) : Promise<ProductType | undefined> {
    try {
      const resp = await fetch(
        `https://ecommerce.routemisr.com/api/v1/products/${id}`,
      );
      const FinalRes = await resp.json();
      return FinalRes.data;
    } catch (error) {
      console.log(error);
    }
  }

  
   export async function getCategories(id : string) : Promise<CategoryType[] | undefined> {
    // const cookie = await cookies()
    // const mytoken = cookie.get("tkn")?.value
    try {
      const resp = await fetch(
        `https://ecommerce.routemisr.com/api/v1/categories`, 
      );
      const FinalRes = await resp.json();
      return FinalRes.data;
    } catch (error) {
      console.log(error);
    }
  }



   export async function getUserCart() : Promise<CartResponse | undefined > {
    
   const userToken = await decodeToken()
   if(userToken){

     try {
       const resp = await fetch(
         `https://ecommerce.routemisr.com/api/v2/cart`,  {
           headers: {token:userToken},
         }
       );
       const FinalRes = await resp.json();
      //  console.log("from cart",FinalRes.data);
       
       return FinalRes.data;
     } catch (error) {
       console.log(error);
     }
   }else{
    return undefined;
   }
  }


   export async function getBrands() : Promise<BrandType[] | undefined> {
    try {
      const resp = await fetch(
        `https://ecommerce.routemisr.com/api/v1/brands`, 
      );
      const FinalRes = await resp.json();
      return FinalRes.data;
    } catch (error) {
      console.log(error);
    }
  }


 

export async function getUserAddresses(): Promise<UserAddress [] | undefined> {
  const userToken = await decodeToken();

  if (!userToken) return;

  try {
    const resp = await fetch(
      `https://ecommerce.routemisr.com/api/v1/addresses`,
      {
        headers: { token: userToken },
      }
    );

    const finalRes=  await resp.json();

    return finalRes.data; 
  } catch (error) {
    console.log(error);
  }
}