"use client";
import React, { useState } from "react";
import {
  Package,
  Star,
  Truck,
  Check,
  RotateCcw,
  ShieldCheck,
} from "lucide-react";

export default function ProductTabs({ product }: { product?: any }) {
  const [activeTab, setActiveTab] = useState("details");

  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden my-10">
      <div className="flex overflow-x-auto border-b border-slate-200 no-scrollbar">
        <button
          onClick={() => setActiveTab("details")}
          className={`flex items-center gap-2 px-6 py-4 font-medium text-sm whitespace-nowrap transition-colors border-b-2 ${
            activeTab === "details"
              ? "border-[#50829F] text-[#50829F]"
              : "border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50"
          }`}
        >
          <Package className="w-4 h-4" /> Product Details
        </button>

        <button
          onClick={() => setActiveTab("reviews")}
          className={`flex items-center gap-2 px-6 py-4 font-medium text-sm whitespace-nowrap transition-colors border-b-2 ${
            activeTab === "reviews"
              ? "border-[#50829F] text-[#50829F]"
              : "border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50"
          }`}
        >
          <Star className="w-4 h-4 fill-current" /> Reviews (
          {product?.ratingsQuantity || 12})
        </button>

        <button
          onClick={() => setActiveTab("shipping")}
          className={`flex items-center gap-2 px-6 py-4 font-medium text-sm whitespace-nowrap transition-colors border-b-2 ${
            activeTab === "shipping"
              ? "border-[#50829F] text-[#50829F]"
              : "border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50"
          }`}
        >
          <Truck className="w-4 h-4" /> Shipping & Returns
        </button>
      </div>
      <div className="p-6 md:p-8">
        {/* PRODUCT DETAILS */}
        {activeTab === "details" && (
          <div className="animate-in fade-in duration-300">
            <h3 className="text-lg font-bold text-slate-900 mb-4">
              About this Product
            </h3>
            <p className="text-slate-600 mb-8 leading-relaxed">
              {product?.description ||
                "Material Polyester Blend Colour Name Multicolour Department Women"}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Product Information Table */}
              <div className="bg-slate-50 rounded-xl p-6">
                <h4 className="text-base font-semibold text-slate-900 mb-4">
                  Product Information
                </h4>
                <div className="flex flex-col gap-3 text-sm">
                  <div className="flex justify-between border-b border-slate-200 pb-2">
                    <span className="text-slate-500">Category</span>
                    <span className="font-medium text-slate-900">
                      {product?.category?.name || "Women's Fashion"}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200 pb-2">
                    <span className="text-slate-500">Subcategory</span>
                    <span className="font-medium text-slate-900">
                      Women's Clothing
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200 pb-2">
                    <span className="text-slate-500">Brand</span>
                    <span className="font-medium text-slate-900">
                      {product?.brand?.name || "DeFacto"}
                    </span>
                  </div>
                  <div className="flex justify-between pb-1">
                    <span className="text-slate-500">Items Sold</span>
                    <span className="font-medium text-slate-900">
                      {product?.sold || "25255+"} sold
                    </span>
                  </div>
                </div>
              </div>
              <div className="bg-slate-50 rounded-xl p-6">
                <h4 className="text-base font-semibold text-slate-900 mb-4">
                  Key Features
                </h4>
                <ul className="flex flex-col gap-3 text-sm text-slate-700">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#50829F]" /> Premium Quality
                    Product
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#50829F]" /> 100% Authentic
                    Guarantee
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#50829F]" /> Fast & Secure
                    Packaging
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#50829F]" /> Quality Tested
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
        {activeTab === "reviews" && (
          <div className="animate-in fade-in duration-300">
            <div className="flex flex-col md:flex-row gap-8 md:gap-16 mb-10">
              {/*  Rating Score */}
              <div className="w-full md:w-1/3 flex flex-col items-center justify-center text-center">
                <div className="text-5xl font-bold text-slate-900 mb-2">
                  {product?.ratingsAverage || 4.2}
                </div>
                <div className="flex text-yellow-400 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(product?.ratingsAverage || 4) ? "fill-current" : "text-slate-200 fill-slate-200"}`}
                    />
                  ))}
                </div>
                <p className="text-sm text-slate-500">
                  Based on {product?.ratingsQuantity || 12} reviews
                </p>
              </div>

              {/* Progress Bars */}
              <div className="w-full md:w-2/3 flex flex-col gap-3 justify-center text-sm text-slate-600">
                {[
                  { stars: 5, pct: 25 },
                  { stars: 4, pct: 60 },
                  { stars: 3, pct: 25 },
                  { stars: 2, pct: 5 },
                  { stars: 1, pct: 5 },
                ].map((bar) => (
                  <div key={bar.stars} className="flex items-center gap-4">
                    <span className="w-12 text-right">{bar.stars} star</span>
                    <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-yellow-400 rounded-full"
                        style={{ width: `${bar.pct}%` }}
                      ></div>
                    </div>
                    <span className="w-10 text-right">{bar.pct}%</span>
                  </div>
                ))}
              </div>
            </div>

            <hr className="border-slate-100 mb-10" />

            <div className="flex flex-col items-center justify-center text-center py-6">
              <Star className="w-12 h-12 text-slate-200 fill-slate-200 mb-4" />
              <p className="text-slate-500 mb-4">
                Customer reviews will be displayed here.
              </p>
              <button className="text-[#50829F] font-semibold hover:underline transition-all">
                Write a Review
              </button>
            </div>
          </div>
        )}
        {activeTab === "shipping" && (
          <div className="animate-in fade-in duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-[#50829F]/5 border border-[#50829F]/10 rounded-2xl p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-[#50829F] text-white p-3 rounded-full shadow-sm">
                    <Truck className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900">
                    Shipping Information
                  </h4>
                </div>
                <ul className="flex flex-col gap-3 text-sm text-slate-700">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#50829F]" /> Free shipping
                    on orders over $50
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#50829F]" /> Standard
                    delivery: 3-5 business days
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#50829F]" /> Express
                    delivery available (1-2 business days)
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#50829F]" /> Track your
                    order in real-time
                  </li>
                </ul>
              </div>
              <div className="bg-[#50829F]/5 border border-[#50829F]/10 rounded-2xl p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-[#50829F] text-white p-3 rounded-full shadow-sm">
                    <RotateCcw className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900">
                    Returns & Refunds
                  </h4>
                </div>
                <ul className="flex flex-col gap-3 text-sm text-slate-700">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#50829F]" /> 30-day
                    hassle-free returns
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#50829F]" /> Full refund or
                    exchange available
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#50829F]" /> Free return
                    shipping on defective items
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#50829F]" /> Easy online
                    return process
                  </li>
                </ul>
              </div>
            </div>
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center gap-4">
              <div className="bg-slate-200 text-slate-700 p-3 rounded-full">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-1">
                  Buyer Protection Guarantee
                </h4>
                <p className="text-sm text-slate-600">
                  Get a full refund if your order doesn't arrive or isn't as
                  described. We ensure your shopping experience is safe and
                  secure.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
