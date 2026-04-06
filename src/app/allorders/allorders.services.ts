'use server'
import { OrderType } from "@/interfaces/product.interface";
import { decodeToken } from "../utils";

   export async function getUserOrders(id :string)  : Promise<OrderType[] | undefined>{
    
   const userToken = await decodeToken()
   if(userToken){

     try {
       const resp = await fetch(
         `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`,  {
           headers: {token:userToken},
         }
       );
       const finalRes = await resp.json();
       console.log("finalRes",finalRes);
       

       return finalRes;
       
     } catch (error) {
       console.log(error);
     }
   }
  }