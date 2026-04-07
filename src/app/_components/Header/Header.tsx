"use client";
import React from "react";
import Link from "next/link";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaRegUser } from "react-icons/fa6";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { CartContextType, useCart, useWishlist, WishlistContextType } from "@/app/_context/cartContext";

export default function Header() {

      const { updateNumberOfCart } = useCart() as CartContextType;
      const { updateNumberOfWishlist , setWishlistIds } = useWishlist() as WishlistContextType;

  const router = useRouter();

  const session = useSession();
  const username = session.data?.user?.name;
  const isAuth = session.status === "authenticated";

  async function handleLogOut() {
    await signOut({ redirect: false });
    toast.success("You are logged out");
          updateNumberOfCart(0);
          updateNumberOfWishlist(0);
           setWishlistIds([]);
    router.push("/login");
  }

  return (
    <div>
      <div className="hidden lg:flex justify-between items-center py-2.5 px-6 bg-[#50829F] text-white text-sm">
        <div className="flex gap-6 items-center font-medium">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-200 animate-pulse" />
            <h6>Free Shipping on Orders 500 EGP</h6>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-200 animate-pulse" />
            <h6>New Arrivals Daily</h6>
          </div>
        </div>
        {/*  Contact and Auth */}
        <div className="flex items-center gap-6">
          {/* Contact Info */}
          <div className="flex items-center gap-4 border-r border-white/20 pr-6">
            <a
              href="tel:+18001234567"
              className="flex items-center gap-2 hover:text-blue-100 transition-colors"
            >
              <FaPhoneAlt className="text-xs" />
              <span>+1 (800) 123-4567</span>
            </a>
            <a
              href="mailto:support@freshcart.com"
              className="flex items-center gap-2 hover:text-blue-100 transition-colors"
            >
              <MdEmail className="text-sm" />
              <span>support@freshcart.com</span>
            </a>
          </div>
          {/* Auth Links */}
          <div className="flex items-center gap-4">
            {isAuth ? (
              <Link
                href="/profile"
                className="flex items-center gap-2 hover:text-blue-100 transition-colors font-semibold"
              >
                <FaRegUser className="text-xs" />
                {username}
              </Link>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-2 hover:text-blue-100 transition-colors font-semibold"
              >
                <FaRegUser className="text-xs" />
                Sign In
              </Link>
            )}
            {isAuth ? (
              <span
                onClick={handleLogOut}
                className="cursor-pointer bg-white text-[#50829F] px-4 py-1 rounded-full text-xs font-bold hover:bg-blue-50 transition-colors"
              >
                Sign out
              </span>
            ) : (
              <Link
                href="/register"
                className="bg-white text-[#50829F] px-4 py-1 rounded-full text-xs font-bold hover:bg-blue-50 transition-colors"
              >
                Sign Up
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
