import React from "react";
import { 
  ArrowLeft,
  ClipboardList,
} from "lucide-react";
import Link from "next/link";
import { getUserCart } from "@/services/product.services";
import { CartResponse } from "@/interfaces/product.interface";
import CheckoutContent from "@/app/_components/CheckoutContent/CheckoutContent";

export default async function CheckoutPage() {
  const cartItems = (await getUserCart()) as CartResponse;

  if (!cartItems) return null;

  return (
    <div className="bg-slate-50/50 min-h-screen">
      <div className="container mx-auto px-4 py-10 max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <nav className="flex items-center gap-2 text-xs text-slate-500 mb-2">
              <Link href="/">Home</Link> <span>/</span>
              <Link href="/cart">Cart</Link> <span>/</span>
              <span className="text-[#50829F] font-medium">Checkout</span>
            </nav>
            <div className="flex items-center gap-3">
              <div className="bg-[#50829F] p-2 rounded-lg text-white">
                <ClipboardList className="w-6 h-6" />
              </div>
              <h1 className="text-3xl font-bold text-slate-900">Complete Your Order</h1>
            </div>
            <p className="text-slate-500 text-sm mt-1 ml-11">Review your items and complete your purchase</p>
          </div>
          <Link href="/cart" className="flex items-center gap-2 text-slate-600 hover:text-[#50829F] font-medium transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Cart
          </Link>
        </div>

    <CheckoutContent cartItems={cartItems}/>
    
      </div>
    </div>
  );
}

