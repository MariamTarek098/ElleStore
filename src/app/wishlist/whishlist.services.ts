'use server'
import { WishlistResponse } from "@/interfaces/product.interface";
import { decodeToken } from "../utils";

    export async function getUserWishlist() : Promise<WishlistResponse | undefined > {
      
     const userToken = await decodeToken()
     if(userToken){
  
       try {
         const resp = await fetch(
           `https://ecommerce.routemisr.com/api/v1/wishlist`,  {
             headers: {token:userToken},
           }
         );
         const finalRes = await resp.json();
        //  console.log("from cart",FinalRes.data);
         
         return finalRes;
       } catch (error) {
         console.log(error);
       }
     }else{
      return undefined;
     }
    }
  