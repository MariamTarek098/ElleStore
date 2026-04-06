'use server'
export async function forgotPasswords(Data: {email:string}) {

  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,
      {
        method: "POST",
        headers:   {"Content-Type": "application/json"} , 
        body: JSON.stringify(Data),
      }
    );

    const finalRes = await res.json();
    console.log("finalxxxxRes",finalRes);
    
    
    if (res.ok) {
      return finalRes; 
    }

   
    return { 
      statusMsg: "fail", 
      message: finalRes.message, 
    };
    
  } catch (error) {
    return { status: "error", message: "Fetch Error" };
  }
}


export async function resetPassword(Data: {email:string , newPassword :string}  ) {

  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,
      {
        method: "PUT",
        headers:   {"Content-Type": "application/json"} , 
        body: JSON.stringify(Data),
      }
    );

    const finalRes = await res.json();
    console.log("finalxxxxRes",finalRes);
    
    
    if (res.ok) {
      return finalRes; 
    }

   
    return { 
    statusMsg: "fail", 
      message: finalRes.message, 
    };
    
  } catch (error) {
    return { status: "error", message: "Fetch Error" };
  }
}



export async function verifyResetCode(Data: {resetCode:string}) {

  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,
      {
        method: "POST",
        headers:   {"Content-Type": "application/json"} , 
        body: JSON.stringify(Data),
      }
    );

    const finalRes = await res.json();
    console.log("finalxxxxRes",finalRes);
    
    
    if (res.ok) {
      return finalRes; 
    }

   
    return { 
      message: finalRes.message, 
    };
    
  } catch (error) {
    return { status: "error", message: "Fetch Error" };
  }
}