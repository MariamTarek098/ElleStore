"use client";

import React from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Search,
  Heart,
  ShoppingCart,
  Menu,
  Headphones,
  User,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import logo from "../../../../public/logo.png";
import { useSession } from "next-auth/react";
import { LuCircleUser } from "react-icons/lu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Package, LogOut, CircleUserRound } from "lucide-react"; 
import { signOut } from "next-auth/react"; 
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import {
  CartContextType,
  useCart,
  useWishlist,
  WishlistContextType,
} from "@/app/_context/cartContext";

export default function Navbar() {

const { setWishlistIds } = useWishlist();

  const session = useSession();
  const username = session.data?.user?.name;
  const isAuth = session.status === "authenticated";

  const [open, setOpen] = React.useState(false);
  const [categoriesOpen, setCategoriesOpen] = React.useState(false);
  const router = useRouter();

async function handleLogOut() {
    await signOut({ redirect: false });
    toast.success("You are logged out");
  
        setWishlistIds([]);
    router.push("/login");
  }

  const { numberOfCartItems } = useCart() as CartContextType;
  const { numberOfWishlistItems } = useWishlist() as WishlistContextType;

  return (
    <header className="w-full border-b border-slate-100 bg-white sticky top-0 z-50 shadow-xl">
      <div className="w-[95%] mx-auto flex items-center justify-between py-3 lg:py-5">
        {/*  LOGO */}
        <Link
          href="/"
          className="flex items-center gap-2 text-2xl font-black tracking-tight text-slate-900 transition-transform hover:scale-105"
        >
          <Image
            src={logo}
            alt="ElleStore Logo"
            width={50}
            height={50}
            className="rounded-lg"
          />
          <span className="hidden sm:block">
            Elle<span className="text-[#50829F]">Store</span>
          </span>
        </Link>

        {/* 2. DESKTOP SEARCH BAR */}
        {/* <div className="hidden flex-1 items-center px-10 lg:flex">
          <div className="relative flex w-full max-w-xl items-center group">
            <Search className="absolute left-4 h-4 w-4 text-slate-400 group-focus-within:text-[#50829F] transition-colors" />
            <Input
              type="text"
              placeholder="Search products..."
              className="h-11 w-full rounded-full border-slate-200 bg-slate-50 pl-11 pr-4 focus-visible:ring-[#50829F] focus-visible:bg-white transition-all outline-none"
            />
          </div>
        </div> */}

        {/*  DESKTOP NAVIGATION & ACTIONS */}
        <div className="hidden items-center gap-6 lg:flex">
          <NavigationMenu>
            <NavigationMenuList className="gap-1">
              <NavigationMenuItem>
                <Link href="/">
                  <NavigationMenuLink
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "rounded-full hover:text-[#50829F] focus:text-[#50829F]",
                    )}
                  >
                    Home
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/allCategories">
                  <NavigationMenuLink
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "rounded-full hover:text-[#50829F] focus:text-[#50829F]",
                    )}
                  >
                    Shop
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="rounded-full hover:text-[#50829F]">
                  Categories
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[220px] gap-2 p-4 bg-white rounded-2xl shadow-xl">
                    <li>
                      <Link
                        href="/allCategories"
                        className="block p-2 rounded-lg hover:bg-slate-50 hover:text-[#50829F] transition-colors"
                      >
                        All Categories
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/categories/electronics"
                        className="block p-2 rounded-lg hover:bg-slate-50 hover:text-[#50829F] transition-colors"
                      >
                        Electronics
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/categories/women's-fashion"
                        className="block p-2 rounded-lg hover:bg-slate-50 hover:text-[#50829F] transition-colors"
                      >
                        Women's Fashion
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/categories/men's-fashion"
                        className="block p-2 rounded-lg hover:bg-slate-50 hover:text-[#50829F] transition-colors"
                      >
                        Men's Fashion
                      </Link>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <Link href="/brands">
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "rounded-full hover:text-[#50829F] focus:text-[#50829F]",
                  )}
                >
                  Brands
                </NavigationMenuLink>
              </Link>
            </NavigationMenuList>
          </NavigationMenu>

          {/*  Wishlist and Cart */}
          <div className="flex items-center gap-5 border-l border-slate-100 pl-6">
            <Link href="/wishlist" className="relative group">
              <Heart className="h-6 w-6 text-slate-600 transition-colors group-hover:text-[#ff6b6b]" />
              {isAuth && !!numberOfWishlistItems && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#50829F] text-[10px] font-bold text-white shadow-lg shadow-red-100">
                  {numberOfWishlistItems}
                </span>
              )}
            </Link>
            <Link href="/cart" className="relative group">
              <ShoppingCart className="h-6 w-6 text-slate-600 group-hover:text-[#50829F] transition-colors" />
              {isAuth && !!numberOfCartItems && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#50829F] text-[10px] font-bold text-white shadow-lg shadow-red-100">
                  {numberOfCartItems}
                </span>
              )}
            </Link>
          </div>

          {/* Sign In Button */}

          {isAuth ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="outline-none">
                  <LuCircleUser className="h-7 w-7 text-slate-600 hover:text-[#50829F] transition-colors cursor-pointer" />
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                className="w-56 mt-2 rounded-2xl p-2 shadow-xl border-slate-100"
                align="end"
              >
                {/* Header with Username */}
                <DropdownMenuLabel className="flex items-center gap-3 p-3">
                  <div className="bg-slate-100 p-2 rounded-full">
                    <CircleUserRound className="h-5 w-5 text-[#50829F]" />
                  </div>
                  <span className="font-bold text-slate-700 truncate">
                    {username || "User"}
                  </span>
                </DropdownMenuLabel>

                <DropdownMenuSeparator className="bg-slate-50" />

                {/* Menu Items */}
                <DropdownMenuItem className="rounded-lg cursor-pointer py-3 focus:bg-slate-50">
                  <Link href="/profile" className="flex w-full items-center">
                    <User className="mr-3 h-4 w-4 text-slate-500" />
                    <span>My Profile</span>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem className="rounded-lg cursor-pointer py-3 focus:bg-slate-50">
                  <Link href="/allorders" className="flex w-full items-center">
                    <Package className="mr-3 h-4 w-4 text-slate-500" />
                    <span>My Orders</span>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem className="rounded-lg cursor-pointer py-3 focus:bg-slate-50">
                  <Link href="/wishlist" className="flex w-full items-center">
                    <Heart className="mr-3 h-4 w-4 text-slate-500" />
                    <span>My Wishlist</span>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator className="bg-slate-50" />

                {/* Sign Out Action */}
                <DropdownMenuItem
                  className="rounded-lg cursor-pointer py-3 text-red-500 focus:bg-red-50 focus:text-red-600 font-medium"
                  onClick={handleLogOut}
                >
                  <LogOut className="mr-3 h-4 w-4" />
                  <span>Sign Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/login">
              <Button className="cursor-pointer bg-[#50829F] hover:bg-[#426c85] text-white rounded-full px-6 shadow-md shadow-slate-100 transition-all">
                <User className="mr-2 h-4 w-4" />
                Sign In
              </Button>
            </Link>
          )}
        </div>

        {/* 4. MOBILE ACTIONS */}
        <div className="flex items-center gap-3 lg:hidden">
          <Link href="/wishlist" className="relative group">
            <Heart className="h-6 w-6 text-slate-600 transition-colors group-hover:text-[#ff6b6b]" />
            {isAuth && !!numberOfWishlistItems && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#50829F] text-[10px] font-bold text-white shadow-lg shadow-red-100">
                {numberOfWishlistItems}
              </span>
            )}
          </Link>
          <Link href="/cart" className="relative p-2">
            <ShoppingCart className="h-6 w-6 text-slate-700 hover:text-[#50829F] transition-colors" />
            {isAuth && !!numberOfCartItems && (
              <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#50829F] text-[10px] text-white">
                {numberOfCartItems}
              </span>
            )}
          </Link>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                className="cursor-pointer rounded-full hover:bg-[#264658]  bg-[#50829F]"
              >
                <Menu className="h-6 w-6 text-white" />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-full sm:w-[350px] border-l-0 p-0 flex flex-col h-full"
            >
              {/* 1. STATIC HEADER */}
              <div className="p-3 border-b border-slate-50">
                <span className="flex items-center gap-2 text-2xl font-black tracking-tight text-slate-900">
                  <Image
                    src={logo}
                    alt="ElleStore Logo"
                    width={50}
                    height={50}
                    className="rounded-lg"
                  />
                  <span className="hidden sm:block">
                    Elle<span className="text-[#50829F]">Store</span>
                  </span>
                </span>
              </div>
              {/* <Input
                type="text"
                placeholder="Search products..."
                className="h-11 w-[90%] m-auto rounded-full border-slate-200 bg-slate-50 pl-11 pr-4 focus-visible:ring-[#50829F] focus-visible:bg-white transition-all outline-none"
              /> */}
              {/* 2. SCROLLABLE CONTENT AREA */}
              <div className="flex-1 overflow-y-auto px-6 space-y-6 scrollbar-custom">
                <nav className="flex flex-col gap-4 text-lg font-medium text-slate-900">
                  <Link
                    onClick={() => setOpen(false)}
                    href="/"
                    className="hover:text-[#50829F] transition-colors"
                  >
                    Home
                  </Link>
                  <Link
                    onClick={() => setOpen(false)}
                    href="/allCategories"
                    className="hover:text-[#50829F] transition-colors"
                  >
                    Shop
                  </Link>
                  <div className="flex flex-col">
                    <button
                      onClick={() => setCategoriesOpen(!categoriesOpen)}
                      className="flex items-center justify-between py-2 text-lg font-medium text-slate-900 hover:text-[#50829F] transition-colors w-full text-left"
                    >
                      <span>Categories</span>
                      <ChevronDown
                        className={cn(
                          "h-5 w-5 transition-transform duration-200 text-slate-400",
                          categoriesOpen && "rotate-180 text-[#50829F]",
                        )}
                      />
                    </button>
                    <div
                      className={cn(
                        "overflow-hidden transition-all duration-300 ease-in-out bg-slate-50/50 rounded-xl",
                        categoriesOpen
                          ? "max-h-60 opacity-100 mt-2 mb-2"
                          : "max-h-0 opacity-0",
                      )}
                    >
                      <ul className="flex flex-col gap-1 p-2">
                        <li>
                          <Link
                            onClick={() => setOpen(false)}
                            href="/allCategories"
                            className="block p-3 rounded-lg text-base text-slate-600 hover:bg-white hover:text-[#50829F] transition-colors"
                          >
                            All Categories
                          </Link>
                        </li>
                        <li>
                          <Link
                            onClick={() => setOpen(false)}
                            href="/categories/electronics"
                            className="block p-3 rounded-lg text-base text-slate-600 hover:bg-white hover:text-[#50829F] transition-colors"
                          >
                            Electronics
                          </Link>
                        </li>
                        <li>
                          <Link
                            onClick={() => setOpen(false)}
                            href="/categories/women's-fashion"
                            className="block p-3 rounded-lg text-base text-slate-600 hover:bg-white hover:text-[#50829F] transition-colors"
                          >
                            Women's Fashion
                          </Link>
                        </li>
                        <li>
                          <Link
                            onClick={() => setOpen(false)}
                            href="/categories/men's-fashion"
                            className="block p-3 rounded-lg text-base text-slate-600 hover:bg-white hover:text-[#50829F] transition-colors"
                          >
                            Men's Fashion
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <Link
                    onClick={() => setOpen(false)}
                    href="/brands"
                    className="hover:text-[#50829F] transition-colors"
                  >
                    Brands
                  </Link>
                  <Link
                    onClick={() => setOpen(false)}
                    href="/allorders"
                    className="hover:text-[#50829F] transition-colors"
                  >
                    My Orders
                  </Link>
                </nav>

                <div className="flex flex-col gap-4 border-t py-3 border-slate-100">
                  <Link
                    onClick={() => setOpen(false)}
                    href="/wishlist"
                    className="flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <Heart className="h-8 w-8 text-[#50829F] bg-[#50829F]/10 p-2 rounded-full" />
                      <span className="font-medium text-slate-700 group-hover:text-[#50829F]">
                        Wishlist
                      </span>
                    </div>
                    {isAuth && !!numberOfWishlistItems && (
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#50829F] text-xs text-white">
                        {numberOfWishlistItems}
                      </span>
                    )}
                  </Link>
                  <Link
                    onClick={() => setOpen(false)}
                    href="/cart"
                    className="flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <ShoppingCart className="h-8 w-8 text-[#50829F] bg-[#50829F]/10 p-2 rounded-full" />
                      <span className="font-medium text-slate-700 group-hover:text-[#50829F]">
                        Cart
                      </span>
                    </div>
                    {isAuth && !!numberOfCartItems && (
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#50829F] text-xs text-white">
                        {numberOfCartItems}
                      </span>
                    )}
                  </Link>
                </div>
                <div className="pt-6 border-t border-slate-100">
                  <Button
                    asChild
                    onClick={() => setOpen(false)}
                    className="w-full bg-[#50829F] rounded-xl mb-3 h-12 text-white"
                  >
                    {isAuth ? (
                      <Link href="/profile">My Profile</Link>
                    ) : (
                      <Link href="/login">Sign In</Link>
                    )}
                  </Button>
                  <Button
                    asChild
                    onClick={() => setOpen(false)}
                    variant="outline"
                    className="w-full border-[#50829F] rounded-xl h-12 text-[#50829F] "
                  >
                    {isAuth ? (
                      <span onClick={handleLogOut}>Sign out </span>
                    ) : (
                      <Link href="/register">Create Account</Link>
                    )}
                  </Button>
                </div>
              </div>
              <Link
                href="/support"
                onClick={() => setOpen(false)}
                className="p-6 bg-white border-t border-slate-100"
              >
                <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="bg-white p-2 rounded-full shadow-sm">
                    <Headphones className="h-5 w-5 text-[#50829F]" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">
                      24/7 Support
                    </p>
                    <p className="text-xs text-[#50829F] font-medium">
                      Help Center
                    </p>
                  </div>
                </div>
              </Link>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
