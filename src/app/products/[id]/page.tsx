import { getAllProducts, getProductDetails } from "@/services/product.services";
import React from "react";
import { RotateCcw, Headphones } from "lucide-react";
import {
  Home,
  ChevronRight,
  Star,
  Minus,
  Plus,
  Share2,
  Truck,
  RefreshCcw,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import ProductTabs from "@/app/_components/ProductTabs/ProductTabs";
import ProductCard from "@/app/_components/ProductCard/ProductCard";
import ProductImages from "@/app/_components/ProductImages/ProductImages";
import AddToCartButton2 from "@/app/_components/AddToCartButton/AddToCartButton2";
import AddToWishlistButton2 from "./../../_components/AddToWishlistButton/AddToWishlistButton2";
import ProductDetailsQuantity from "@/app/_components/ProductDetailsQuantity/ProductDetailsQuantity";

export default async function ProductDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const product = await getProductDetails(id);
  const selectedSlug = product?.category?.slug;
  const mainImage = product?.imageCover ;
  const thumbnails = product?.images?.length
    ? product.images
    : [mainImage, mainImage, mainImage, mainImage];

  const allProducts = await getAllProducts();
  console.log("Products Loaded:", allProducts?.length);



  return (
    <div>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Breadcrumbs */}
        <nav className="flex items-center text-sm text-slate-500 mb-8 gap-2">
          <Link
            href="/"
            className="flex items-center hover:text-[#50829F] transition-colors"
          >
            <Home className="w-4 h-4 mr-1" /> Home
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link
           href={`/categories/${product?.category?.slug}`}
            className="hover:text-[#50829F] transition-colors"
          >
            {product?.category?.name}
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-slate-800 font-medium">{product?.title}</span>
        </nav>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <ProductImages thumbnails={product?.images || []} product={product} />
          <div className="bg-white border border-slate-100 rounded-2xl p-8 flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-[#50829F]/10 text-[#50829F] px-3 py-1 rounded-full text-xs font-semibold">
                {product?.category?.name || "Women's Fashion"}
              </span>
              <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-semibold">
                {product?.brand?.name || "DeFacto"}
              </span>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              {product?.title || "Woman Shawl"}
            </h1>
            <div className="flex items-center gap-2 mb-6">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < (product?.ratingsAverage || 4) ? "fill-current" : "text-slate-200 fill-slate-200"}`}
                  />
                ))}
              </div>
              <span className="text-sm font-medium text-slate-700">
                {product?.ratingsAverage || 4.2}{" "}
                <span className="text-slate-400 font-normal">
                  ({product?.ratingsQuantity || 12} reviews)
                </span>
              </span>
            </div>
            <div className="mb-6">
              <div className="text-3xl font-bold text-slate-900 mb-3">
                {product?.price || 191} EGP
              </div>
              <div className="inline-flex items-center gap-1.5 bg-[#50829F]/10 text-[#50829F] px-3 py-1 rounded-full text-sm font-medium">
                <span className="w-2 h-2 rounded-full bg-[#50829F]"></span>
                In Stock
              </div>
            </div>
            <hr className="border-slate-100 mb-6" />
            <p className="text-slate-600 mb-8 leading-relaxed">
              {product?.description ||
                "Material Polyester Blend Colour Name Multicolour Department Women"}
            </p>
         <ProductDetailsQuantity product={product!}/>


{/* I wanted to pass the quantity here, but the API only accepts the product ID.  */}
            {product?._id && <AddToCartButton2 id={product._id} />}

            <div className="flex gap-4 mb-8">
              {product?._id && <AddToWishlistButton2 id={product._id} />}
              <button className="flex items-center justify-center border border-slate-200 hover:border-[#50829F] hover:text-[#50829F] text-slate-700 w-12 rounded-xl transition-colors">
                <Share2 className="w-4 h-4" />
              </button>
            </div>

            <hr className="border-slate-100 mb-6" />

            <div className="grid grid-cols-3 gap-4">
              <div className="flex items-center gap-3">
                <div className="bg-[#50829F]/10 p-2 rounded-full text-[#50829F]">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-900">
                    Free Delivery
                  </p>
                  <p className="text-[10px] text-slate-500">Orders over $50</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-[#50829F]/10 p-2 rounded-full text-[#50829F]">
                  <RefreshCcw className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-900">
                    30 Days Return
                  </p>
                  <p className="text-[10px] text-slate-500">Money back</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-[#50829F]/10 p-2 rounded-full text-[#50829F]">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-900">
                    Secure Payment
                  </p>
                  <p className="text-[10px] text-slate-500">100% Protected</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <ProductTabs />

        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <div className="w-2 h-10 bg-[#50829F] rounded-full"></div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              You May Also  <span className="text-[#50829F]">Like</span>
            </h2>
          </div>
          
        </div>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {allProducts
            ?.filter((product) => product.category?.slug === selectedSlug)
            .slice(0, 5)
            .map((product) => (
              <Link key={product._id} href={`/products/${product._id}`}>
                <ProductCard product={product} />
              </Link>
            ))}
        </div>
      </div>
      <div className="w-full bg-[#50829F]/5 py-8 border-y border-[#50829F]/10">
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
                  <div className="flex-shrink-0 w-14 h-14 bg-[#50829F]/10 rounded-2xl flex items-center justify-center text-[#50829F] group-hover:bg-[#50829F] group-hover:text-white transition-colors duration-300">
                    {feature.icon}
                  </div>
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
  );
}
