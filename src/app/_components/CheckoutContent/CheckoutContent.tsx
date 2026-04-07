"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  MapPin,
  Phone,
  CreditCard,
  Banknote,
  Building2,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { FiShoppingBag } from "react-icons/fi";
import { CartResponse, OrderPlaceType } from "@/interfaces/product.interface";
import toast from "react-hot-toast";
import { createCashOrder, createOnlineOrder } from "@/app/order/order.action";
import { useParams, useRouter } from "next/navigation";
import { CartContextType, useCart } from "@/app/_context/cartContext";

//  Schema
const checkoutSchema = z.object({
  city: z.string().min(1, "City is required"),
  postalCode: z.string().optional(), // Fully optional
  details: z.string().min(1, "Address details are required"),
  phone: z
    .string()
    .regex(/^01[0125][0-9]{8}$/, "Invalid Egyptian phone number"),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

export default function CheckoutContent({
  cartItems,
}: {
  cartItems: CartResponse;
}) {
  const { updateNumberOfCart } = useCart() as CartContextType;
  const { id } = useParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "card">("cash");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
  });

  const onSubmit = async (values: CheckoutFormData) => {
    setIsLoading(true);
    const cartId = id?.toString() || "";
    const orderData: OrderPlaceType = {
      shippingAddress: {
        details: values.details,
        phone: values.phone,
        city: values.city,
        postalCode: values.postalCode || "",
      },
    };

    try {
      if (paymentMethod === "cash") {
        const data = await createCashOrder(cartId, orderData);
        if (data.status === "success") {
          updateNumberOfCart(0);
          toast.success(data.message || "Order placed successfully!");
          router.push("/allorders");
        }
      } else {
        const onlineData = await createOnlineOrder(cartId, orderData);
        if (onlineData.status === "success") {
          if (onlineData.session?.url) {
            window.location.href = onlineData.session.url;
          }
        }
      }
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
            <div className="bg-[#50829F] p-4 text-white font-bold flex items-center gap-2">
              <MapPin className="w-5 h-5" /> Shipping Address
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* City */}
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-slate-700 flex justify-between">
                    City *
                    {errors.city && (
                      <span className="text-red-500 text-[10px]">
                        {errors.city.message}
                      </span>
                    )}
                  </label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                    <input
                      {...register("city")}
                      type="text"
                      placeholder="Cairo"
                      className={`w-full p-3.5 pl-10 rounded-xl border ${errors.city ? "border-red-400" : "border-slate-200"} bg-slate-50/50 outline-none transition-colors`}
                    />
                  </div>
                </div>

                {/* Postal Code */}
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-slate-700 flex justify-between">
                    Postal Code (Optional)
                    {errors.postalCode && (
                      <span className="text-red-500 text-[10px]">
                        {errors.postalCode.message}
                      </span>
                    )}
                  </label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                    <input
                      {...register("postalCode")}
                      type="text"
                      placeholder="12345"
                      className={`w-full p-3.5 pl-10 rounded-xl border ${errors.postalCode ? "border-red-400" : "border-slate-200"} bg-slate-50/50 outline-none transition-colors`}
                    />
                  </div>
                </div>
              </div>

              {/*  Address */}
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-slate-700 flex justify-between">
                  Street Address *
                  {errors.details && (
                    <span className="text-red-500 text-[10px]">
                      {errors.details.message}
                    </span>
                  )}
                </label>
                <textarea
                  {...register("details")}
                  placeholder="Building, Street..."
                  className={`w-full p-3.5 rounded-xl border ${errors.details ? "border-red-400" : "border-slate-200"} bg-slate-50/50 h-20 resize-none outline-none transition-colors`}
                />
              </div>

              {/* Phone */}
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-slate-700 flex justify-between">
                  Phone Number *
                  {errors.phone && (
                    <span className="text-red-500 text-[10px]">
                      {errors.phone.message}
                    </span>
                  )}
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                  <input
                    {...register("phone")}
                    type="tel"
                    placeholder="01xxxxxxxxx"
                    className={`w-full p-3.5 pl-10 rounded-xl border ${errors.phone ? "border-red-400" : "border-slate-200"} bg-slate-50/50 outline-none transition-colors`}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Payment Section */}
          <section className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
            <div className="bg-[#50829F] p-4 text-white font-bold flex items-center gap-2">
              <CreditCard className="w-5 h-5" /> Payment Method
            </div>

            <div className="p-6 space-y-4">
              {/* Cash */}
              <div
                onClick={() => setPaymentMethod("cash")}
                className={`flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all ${paymentMethod === "cash" ? "border-[#50829F] bg-blue-50/50" : "border-slate-100"}`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`p-3 rounded-xl ${paymentMethod === "cash" ? "bg-[#50829F] text-white" : "bg-slate-100 text-slate-400"}`}
                  >
                    <Banknote className="w-6 h-6" />
                  </div>
                  <p className="font-bold text-slate-900 text-sm">
                    Cash on Delivery
                  </p>
                </div>
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === "cash" ? "border-[#50829F] bg-[#50829F]" : "border-slate-300"}`}
                >
                  {paymentMethod === "cash" && (
                    <div className="w-2 h-2 bg-white rounded-full" />
                  )}
                </div>
              </div>

              {/* Online */}
              <div
                onClick={() => setPaymentMethod("card")}
                className={`flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all ${paymentMethod === "card" ? "border-[#50829F] bg-blue-50/50" : "border-slate-100"}`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`p-3 rounded-xl ${paymentMethod === "card" ? "bg-[#50829F] text-white" : "bg-slate-100 text-slate-400"}`}
                  >
                    <CreditCard className="w-6 h-6" />
                  </div>
                  <p className="font-bold text-slate-900 text-sm">
                    Pay Online (Stripe/Card)
                  </p>
                </div>
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === "card" ? "border-[#50829F] bg-[#50829F]" : "border-slate-300"}`}
                >
                  {paymentMethod === "card" && (
                    <div className="w-2 h-2 bg-white rounded-full" />
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>
        <aside>
          <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm lg:sticky lg:top-24">
            <h2 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <FiShoppingBag /> Order Summary
            </h2>
            <div className="space-y-3 mb-6 max-h-48 overflow-y-auto pr-1">
              {cartItems?.products?.map((item) => (
                <div
                  key={item._id}
                  className="flex gap-3 bg-slate-50 p-2 rounded-xl border border-slate-100 items-center"
                >
                  <img
                    src={item.product.imageCover}
                    className="w-10 h-10 rounded-lg object-cover"
                    alt=""
                  />
                  <div className="flex-1 min-w-0 text-[11px]">
                    <p className="font-bold text-slate-900 truncate">
                      {item.product.title}
                    </p>
                    <p className="text-slate-500">
                      {item.count} × {item.price} EGP
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-100 pt-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Subtotal</span>
                <span className=" text-[#50829F] text-l">
                  {cartItems?.totalCartPrice || 0} EGP
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Shipping</span>
                <span className=" text-[#50829F] text-l">
                  {(cartItems?.totalCartPrice || 0) < 500 ? "50" : "free"} EGP
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Total Amount</span>
                <span className="font-bold text-[#50829F] text-xl">
                  {(cartItems?.totalCartPrice || 0) < 500
                    ? (cartItems?.totalCartPrice || 0) + 50
                    : cartItems?.totalCartPrice || 0}{" "}
                  EGP
                </span>
              </div>

              <button
                type="submit"
                disabled={isLoading || !cartItems?.products?.length}
                className="w-full bg-[#50829F] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg hover:brightness-95 disabled:opacity-50"
              >
                {isLoading ? (
                  <Loader2 className="animate-spin w-5 h-5" />
                ) : (
                  <CheckCircle2 className="w-5 h-5" />
                )}
                {isLoading ? "Processing..." : "Place Order"}
              </button>
            </div>
          </div>
        </aside>
      </div>
    </form>
  );
}
