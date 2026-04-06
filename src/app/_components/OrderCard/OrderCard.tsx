"use client";
import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  MapPin,
  Package,
  Calendar,
  CreditCard,
} from "lucide-react";
import { OrderType } from "@/interfaces/product.interface";

interface OrderCardProps {
  order: OrderType;
}

export default function OrderCard({ order }: OrderCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  // date
  const orderDate = new Date(order.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  // Calculate items count and first item image
  const itemsCount = order.cartItems.reduce((acc, item) => acc + item.count, 0);
  const firstItemImage = order.cartItems[0]?.product?.imageCover;
  const extraItemsCount = order.cartItems.length - 1;

  // Calc total price of items then add tax to it
  let total = 0;
  order.cartItems.forEach((item) => {
    total += item.price * item.count;
  });
  const subtotal = total + order.taxPrice;

  return (
    <div className="group bg-white border border-slate-200 rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 mb-4">

      <div className="p-4 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6">

        <div className="flex gap-4 md:gap-5 items-start md:items-center w-full md:w-auto flex-1 min-w-0">

          <div className="relative flex-shrink-0">
            <img
              src={firstItemImage}
              className="w-16 h-16 md:w-20 md:h-20 rounded-2xl object-cover border border-slate-100 shadow-sm"
              alt={order.cartItems[0]?.product?.title || "Product"}
            />
            {extraItemsCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-gradient-to-r from-slate-900 to-slate-700 text-white text-[10px] md:text-xs font-bold w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center border-2 border-white shadow">
                +{extraItemsCount}
              </span>
            )}
          </div>

          <div className="space-y-2 flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-sm ${
                  order.isPaid
                    ? "bg-blue-100 text-blue-700"
                    : "bg-amber-100 text-amber-700"
                }`}
              >
                {order.isPaid ? "On the way" : "Processing"}
              </span>
              <span className="text-slate-400 font-bold text-xs md:text-sm truncate">
                #{order.id}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2 md:gap-4 text-slate-500 text-xs font-medium">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3 shrink-0" /> {orderDate}
              </span>
              <span className="flex items-center gap-1">
                <Package className="w-3 h-3 shrink-0" /> {itemsCount} items
              </span>
              <span className="flex items-center gap-1 truncate">
                <MapPin className="w-3 h-3 shrink-0" /> {order.shippingAddress.city}
              </span>
            </div>

            <p className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight">
              {order.totalOrderPrice}{" "}
              <span className="text-xs text-slate-400">EGP</span>
            </p>
          </div>
        </div>

        <div className="flex flex-row md:flex-col items-center justify-between md:items-end w-full md:w-auto gap-3 pt-4 border-t border-slate-100 md:border-t-0 md:pt-0">
          <div className="hidden md:flex p-3 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border border-slate-200 shadow-sm">
            <CreditCard
              className={`w-5 h-5 ${order.isPaid ? "text-blue-500" : "text-slate-500"}`}
            />
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`flex items-center justify-center w-full md:w-auto gap-2 px-6 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 shadow-sm
              ${
                isOpen
                  ? "bg-gradient-to-r from-[#50829F] to-[#3e6d86] text-white shadow-md"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200 hover:shadow"
              }
            `}
          >
            {isOpen ? "Hide Details" : "View Details"}
            {isOpen ? (
              <ChevronUp className="w-4 h-4 shrink-0" />
            ) : (
              <ChevronDown className="w-4 h-4 shrink-0" />
            )}
          </button>
        </div>
      </div>

      <div
        className={`transition-all duration-500 ease-in-out ${isOpen ? "max-h-[1500px] opacity-100" : "max-h-0 opacity-0 overflow-hidden"}`}
      >
        <div className="border-t border-slate-100 bg-gradient-to-b from-slate-50/40 to-white p-4 md:p-6 space-y-6">
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Package className="w-4 h-4 text-[#50829F]" /> Order Items
            </h4>

            <div className="space-y-3">
              {order.cartItems.map((item) => (
                <div
                  key={item._id}
                  className="bg-white p-3 rounded-2xl border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:shadow-md transition"
                >
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <img
                      src={item.product.imageCover}
                      className="w-12 h-12 rounded-xl object-cover border flex-shrink-0"
                      alt={item.product.title}
                    />
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-800 truncate">
                        {item.product.title}
                      </p>
                      <p className="text-xs text-slate-500">
                        {item.count} × {item.price} EGP
                      </p>
                    </div>
                  </div>

                  <p className="font-bold text-slate-900 text-sm sm:text-right">
                    {item.price * item.count}{" "}
                    <span className="text-[10px]">EGP</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div className="bg-white p-4 md:p-5 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition">
              <h4 className="text-xs font-bold text-[#50829F] uppercase flex items-center gap-2 mb-3">
                <MapPin className="w-4 h-4" /> Delivery Address
              </h4>
              <p className="text-sm font-semibold text-slate-900">
                {order.shippingAddress.city}
              </p>
              <p className="text-xs text-slate-500 mt-1">
                {order.shippingAddress.details}
              </p>
              <p className="text-xs text-slate-500 mt-2 font-mono">
                {order.shippingAddress.phone}
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-amber-50 to-amber-100/40 p-4 md:p-5 rounded-3xl border border-amber-200 shadow-sm">
              <h4 className="text-xs font-bold text-amber-700 uppercase flex items-center gap-2 mb-3">
                <Calendar className="w-4 h-4" /> Order Summary
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-slate-600">
                  <span>Subtotal</span>
                  <span>{subtotal} EGP</span>
                </div>
                <div className="flex justify-between text-xs text-slate-600">
                  <span>Shipping</span>
                  <span>{order.shippingPrice} EGP</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-amber-300 font-bold text-slate-900">
                  <span>Total</span>
                  <span className="text-base md:text-lg">{order.totalOrderPrice} EGP</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}