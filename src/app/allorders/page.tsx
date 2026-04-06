import React from "react";
import OrderCard from "../_components/OrderCard/OrderCard";
import { getUserOrders } from "./allorders.services";
import { getServerSession } from "next-auth";
import { nextAuthConfig } from "@/next-auth/nextAuth.config";
import Link from "next/link"; 

export default async function AllOrders() {
  const session = await getServerSession(nextAuthConfig);
  const id = session?.user?.id;
  const orders = await getUserOrders(id!);

  return (
    <div className="min-h-screen bg-slate-50 py-6 md:py-10">
      <div className="container mx-auto px-4 max-w-5xl">

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="space-y-1">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 flex items-center gap-3">
              <span className="bg-[#50829F] p-2 rounded-xl text-white shrink-0">
                <svg
                  className="w-5 h-5 md:w-6 md:h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
              </span>
              My Orders
            </h1>
            <p className="text-slate-500 text-sm md:text-base ml-1">
              Track and manage your recent orders
            </p>
          </div>

          <Link 
            href="/products" 
            className="text-[#50829F] text-sm font-semibold flex items-center gap-2 hover:underline w-fit"
          >
            Continue Shopping 
          </Link>
        </div>

        <div className="space-y-4 md:space-y-6">
          {orders?.length ? (
            orders.map((order) => <OrderCard key={order._id} order={order} />)
          ) : (
            <div className="bg-white border border-dashed border-slate-300 rounded-[2rem] py-20 text-center">
               <p className="text-slate-500 font-medium">No orders found yet</p>
               <Link href="/products" className="text-[#50829F] text-sm mt-2 inline-block hover:underline">
                 Browse our store
               </Link>
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
}
