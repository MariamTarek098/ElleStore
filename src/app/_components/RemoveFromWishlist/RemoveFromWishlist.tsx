"use client";
import React, { useState } from "react";

import { Trash2, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import {  useWishlist, WishlistContextType } from "@/app/_context/cartContext";
import { removeProductFromWishlist } from "@/app/wishlist/whishlist.action";
import { getUserWishlist } from "@/app/wishlist/whishlist.services";


export default function RemoveFromWishlist({ itemId }: { itemId: string }) {
  const { updateNumberOfWishlist } = (useWishlist() as WishlistContextType);
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    setLoading(true);
    const toastId = toast.loading("Removing item ...");

    const data = await removeProductFromWishlist({ itemId });
     const data2 = await getUserWishlist();

    if (data?.status === "success") {
      updateNumberOfWishlist(data2?.count || 0);

      toast.success(data.message, { id: toastId });
     
    } else {
      toast.error(data?.message || "Error", { id: toastId });
    }
    
    setLoading(false);
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
     className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all">
    
      {loading ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : (
       <Trash2 className="w-5 h-5" />
      )}
    </button>

  );
}