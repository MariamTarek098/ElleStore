import React from "react";
import {
  ArrowRight,
  Headphones,
  PackageOpen,
  RotateCcw,
  ShieldCheck,
  ShoppingBag,
  Truck,
} from "lucide-react";
import Link from "next/link";
import QuantityControls from "../_components/CartControls/QuantityControls";
import RemoveButton from "../_components/CartControls/RemoveButton";
import { getUserCart } from "@/services/product.services";
import { CartResponse } from "@/interfaces/product.interface";
import ClearCartButton from "../_components/CartControls/ClearCartButton";

export default async function Cart() {
  const cartItems = await getUserCart();

  if (!cartItems || (cartItems as CartResponse).products.length === 0) {
    return (
      <div className="container mx-auto px-4 min-h-[60vh] flex flex-col items-center justify-center text-center">
        <div className="bg-slate-50 p-8 rounded-full mb-6">
          <PackageOpen className="w-16 h-16 text-slate-300" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          Your cart is empty
        </h1>
        <p className="text-slate-500 max-w-md mb-8">
          Looks like you haven't added anything to your cart yet. Start
          exploring our products and find something you love!
        </p>
        <Link
          href="/allCategories"
          className="bg-[#50829F] text-white px-8 py-3 rounded-xl font-semibold flex items-center gap-2 hover:bg-[#406d87] transition-colors"
        >
          Start Shopping <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  const { totalCartPrice, products , _id } = cartItems as CartResponse;
  const totalCartItems = (cartItems as CartResponse).products.length;


  return (
    <>
      <div>
        <div className="container mx-auto px-4 pt-10 max-w-7xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-[#50829F] p-2 rounded-lg text-white">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900">Shopping Cart</h1>
            <span className="text-slate-500 font-medium ml-2">
              ({totalCartItems} items)
            </span>
          </div>
          {totalCartItems > 0 && <ClearCartButton />}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start mt-5">
            <div className="lg:col-span-2 space-y-4">
              {products.map((item) => (
                <div
                  key={item._id}
                  className="bg-white border border-slate-100 rounded-2xl p-4 flex gap-4 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-24 h-24 bg-slate-50 rounded-xl overflow-hidden flex-shrink-0">
                    <img
                      className="w-full h-full animate-pulse"
                      src={item.product.imageCover}
                      alt={item.product.title}
                    />{" "}
                    <div className="" />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-slate-900 text-lg">
                        {item.product.title}
                      </h3>
                      <p className="text-sm text-[#50829F] font-medium">
                        {item.product.category.name}
                      </p>
                      <p className="text-slate-500 text-sm mt-1">
                        {item.price} EGP
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      {/* Unified Quantity Selector */}
                      <div className="flex items-center border border-slate-200 rounded-lg bg-white overflow-hidden divide-x divide-slate-200">
                        <QuantityControls
                          itemId={item.product.id}
                          count={item.count - 1}
                        />

                        <span className="px-4 font-semibold text-slate-900 min-w-[3rem] text-center">
                          {item.count}
                        </span>

                        <QuantityControls
                          itemId={item.product.id}
                          count={item.count + 1}
                          isIncrement
                        />
                      </div>

                      {/* Remove Button stays separate */}
                      <RemoveButton itemId={item.product.id} />
                    </div>
                  </div>

                  <div className="text-right flex flex-col justify-end pb-2">
                    <p className="text-xs text-slate-400">Total</p>
                    <p className="font-bold text-slate-900">
                      {item.price * item.count} EGP
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <aside className="lg:sticky lg:top-24">
              <div className="bg-[#50829F] rounded-3xl p-6 text-white shadow-lg">
                <h2 className="text-xl font-bold mb-2">Order Summary</h2>
                <p className="text-slate-200 text-sm mt-1 mb-6">
                  {totalCartItems} items in your cart
                </p>

                <div className="space-y-4">
                  <div className="bg-white/10 rounded-xl p-4 border border-white/20">
                    <p className="text-sm font-medium mb-1">Free Shipping!</p>
                    <p className="text-xs text-white/70">
                      You qualify for free delivery
                    </p>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span className="font-semibold">{totalCartPrice} EGP</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span className="font-semibold">{totalCartPrice > 500 ?"free": "50 EGP"}</span>
                  </div>

                  <div className="h-px bg-white/20 my-4" />

                  <div className="flex justify-between items-center mb-6">
                    <span className="text-lg font-medium">Total</span>
                    <span className="text-2xl font-bold">
                      {totalCartPrice} EGP
                    </span>
                  </div>

                  <Link href={`/order/${_id}`} className="block w-full">
                    <button className="cursor-pointer w-full bg-white text-[#50829F] py-4 rounded-2xl font-bold text-lg hover:bg-slate-50">
                      Secure Checkout
                    </button>
                  </Link>

                  <Link
                    href="/"
                    className="block text-center text-sm text-white/70 mt-4"
                  >
                    ← Continue Shopping
                  </Link>
                </div>
              </div>
            </aside>
          </div>

          
        </div>

        <div className="w-full bg-[#50829F]/5 py-8 mt-8 border-y border-[#50829F]/10">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: <Truck className="w-6 h-6" />,
                  title: "Free Shipping",
                  description: "On orders over 500 EGP",
                },
                {
                  icon: <RotateCcw className="w-6 h-6" />,
                  title: "Easy Returns",
                  description: "14-day return policy",
                },
                {
                  icon: <ShieldCheck className="w-6 h-6" />,
                  title: "Secure Payment",
                  description: "100% secure checkout",
                },
                {
                  icon: <Headphones className="w-6 h-6" />,
                  title: "24/7 Support",
                  description: "Contact us anytime",
                },
              ].map(function (feature, index) {
                return (
                  <div
                    key={index}
                    className="flex items-center gap-4 group hover:translate-y-[-2px] transition-transform duration-300"
                  >
                    {/* Icon Container */}
                    <div className="flex-shrink-0 w-14 h-14 bg-[#50829F]/10 rounded-2xl flex items-center justify-center text-[#50829F] group-hover:bg-[#50829F] group-hover:text-white transition-colors duration-300">
                      {feature.icon}
                    </div>

                    {/* Text Content */}
                    <div>
                      <h4 className="text-base font-bold text-slate-900 leading-tight">
                        {feature.title}
                      </h4>
                      <p className="text-sm text-slate-500 font-medium mt-0.5">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
