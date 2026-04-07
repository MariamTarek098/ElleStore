"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import {
  MdEmail,
  MdLock,
  MdLogin,
  MdVisibility,
  MdVisibilityOff,
} from "react-icons/md";
import * as zod from "zod";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { loginSchema } from "./login.schema";
import { signIn } from "next-auth/react";
import { getCurrentLoggedIn } from "./login.actions";
import { CartContextType, useCart, useWishlist, WishlistContextType } from "@/app/_context/cartContext";
import { getUserWishlist } from "@/app/wishlist/whishlist.services";

export type LoginObjectType = zod.infer<typeof loginSchema>;

export default function LoginPage() {
  const { updateNumberOfCart } = useCart() as CartContextType;
  const { updateNumberOfWishlist , setWishlistIds , wishlistIds} = useWishlist() as WishlistContextType;

  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginObjectType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

async function onSubmit(data: LoginObjectType) {
  const res = await signIn("credentials", {
    redirect: false,
    ...data,
  });

  if (res?.ok) {
    toast.success("Login successful");

    try {
      // Fetch data form user who just logged in
      const [cartData, wishlistData] = await Promise.all([
        getCurrentLoggedIn(),
        getUserWishlist()
      ]);

      // Update Cart Context
      if (cartData?.products) {
        updateNumberOfCart(cartData.products.length);
      }

      // Update Wishlist Context
      if (wishlistData) {
        updateNumberOfWishlist(wishlistData.count || 0);
        
        // extract IDs into array 
        const ids = wishlistData.data?.map((prod: any) => prod._id) || [];
        setWishlistIds(ids);
      }
    } catch (error) {
      console.error("Error fetching user data after login:", error);
    }

    setTimeout(() => {
      router.push("/");
      router.refresh(); 
    }, 1000);

  } else {
    toast.error("Incorrect email or password");
  }
}

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-[#50829f]/5">
      <Card className="w-full max-w-md rounded-2xl shadow-xl border-t-4 border-t-[#50829f]">
        <CardContent className="p-6 md:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-[#50829f]">
              Welcome Back
            </h1>
            <p className="text-muted-foreground mt-2 text-sm">
              Please enter your details to sign in
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email */}
            <Controller
              name="email"
              control={control}
              render={({ field, fieldState }) => (
                <div className="space-y-2">
                  <Label>Email</Label>
                  <div className="relative">
                    <MdEmail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#50829f]" />
                    <Input
                      {...field}
                      type="email"
                      placeholder="name@example.com"
                      className={`pl-10 focus-visible:ring-[#50829f] ${fieldState.invalid ? "border-red-500" : ""}`}
                    />
                  </div>
                  {fieldState.error && (
                    <p className="text-xs text-red-500">
                      {fieldState.error.message}
                    </p>
                  )}
                </div>
              )}
            />

            {/* Password */}
            <Controller
              name="password"
              control={control}
              render={({ field, fieldState }) => (
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label>Password</Label>
                    <Link
                      href="/forgetPassword"
                      className="text-xs text-[#50829f] hover:underline"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                  <div className="relative">
                    <MdLock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#50829f]" />

                    <Input
                      {...field}
                      type={showPassword ? "text" : "password"} // تغيير النوع بناءً على الحالة
                      placeholder="••••••••"
                      className={`pl-10 pr-10 focus-visible:ring-[#50829f] ${fieldState.invalid ? "border-red-500" : ""}`}
                    />

                    {/* زر العين */}
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#50829f] transition-colors"
                    >
                      {showPassword ? (
                        <MdVisibilityOff size={20} />
                      ) : (
                        <MdVisibility size={20} />
                      )}
                    </button>
                  </div>
                  {fieldState.error && (
                    <p className="text-xs text-red-500">
                      {fieldState.error.message}
                    </p>
                  )}
                </div>
              )}
            />

            {/* Submit */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex gap-2 bg-[#50829f] hover:bg-[#3d637a] text-white py-6"
            >
              {isSubmitting ? (
                "Signing in..."
              ) : (
                <>
                  <MdLogin size={20} /> Sign In
                </>
              )}
            </Button>
          </form>

          {/* Footer */}
          <p className="text-center mt-8 text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="text-[#50829f] font-semibold hover:underline"
            >
              Create one
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
