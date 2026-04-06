import { getAllProducts } from "@/services/product.services";
import ProductCard from "./_components/ProductCard/ProductCard";
import Link from "next/link";
import MySwiper from "./_components/MySwiper/MySwiper";
import image1 from "@/assets/imgs/img1.png";
import image2 from "@/assets/imgs/img2.png";
import image3 from "@/assets/imgs/img3.png";
import {
  ArrowRight,
  Headphones,
  RotateCcw,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { lazy ,Suspense } from "react";
import Loading from "./loading";

 const LazyLoadedComp = lazy(()=> import ("./_components/CategoriesSubPart/CategoriesSubPart"))

export default async function Home() {

  const allProducts = await getAllProducts();
  console.log("Products Loaded:", allProducts?.length);

  return (
    <div>
    
   
<div className="relative pb-20 pt-10 sm:pt-20 overflow-hidden bg-white">
  <div className="absolute top-0 right-0 w-1/2 h-full bg-[#50829F]/5 -skew-x-12 translate-x-20 z-0" />
  <div className="absolute top-40 left-10 w-72 h-72 bg-[#50829F]/10 rounded-full blur-[120px] animate-pulse" />

  <div className="container mx-auto px-16 relative z-10">
    <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-4">

      <div className="w-full lg:w-1/2 flex flex-col gap-8">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-[#50829F] animate-pulse" />
            <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-slate-500">
              New Collection 2026
            </span>
          </div>

          <h1 className="text-6xl md:text-8xl font-black text-slate-900 leading-[0.9] tracking-tighter">
            Find What <br />
            <span className="relative inline-block">
              <span className="relative z-10 text-[#50829F] italic">You Love</span>
              <svg className="absolute -bottom-2 left-0 w-full h-3 text-[#50829F]/20" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 25 0, 50 5 T 100 5" stroke="currentColor" strokeWidth="8" fill="transparent" />
              </svg>
            </span>
          </h1>

          <p className="text-slate-500 text-lg md:text-xl max-w-md leading-relaxed font-medium">
            Curated items that blend <span className="text-slate-900">function</span> and <span className="text-slate-900">aesthetic</span>, delivered to your door.
          </p>
        </div>

<div className="flex flex-wrap items-center gap-5">
  
  <Link
    href="/allCategories"
    className="group bg-slate-900 text-white px-10 py-5 rounded-2xl font-bold text-lg transition-all hover:bg-[#50829F] hover:shadow-2xl hover:shadow-[#50829F]/30 active:scale-95 inline-flex items-center gap-2"
  >
    Shop Now
    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
  </Link>


</div>
      </div>

      <div className="w-full lg:w-1/2 relative flex justify-center lg:justify-end">
        
        <div className="relative w-full max-w-[500px] z-20">
    
          <div className="absolute -right-6 -top-6 w-full h-full border-2 border-[#50829F]/20 rounded-[3.5rem] -z-10 rotate-3" />
          
          <div className="relative p-3 bg-white rounded-[3.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] overflow-hidden">
            <div className="rounded-[2.8rem] overflow-hidden">
               <MySwiper imagesList={[image1.src, image2.src, image3.src]} />
            </div>
          </div>
          <div className="absolute -left-12 top-1/2 -translate-y-1/2 bg-[#50829F] text-white p-6 rounded-3xl shadow-2xl z-30 hidden md:block rotate-[-5deg]">
            <div className="flex flex-col items-center leading-none">
              <span className="text-3xl font-black italic mb-1">4.9</span>
              <div className="flex gap-0.5 mb-1 text-yellow-400">
                {"★".repeat(5)}
              </div>
              <span className="text-[10px] uppercase font-bold opacity-60 tracking-widest">
                Rating
              </span>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</div>

      {/* CATEGORIES SECTION */}
      <div className="container mx-auto px-4 py-16">
        <Suspense fallback={<Loading/>}>

        <LazyLoadedComp/>
        </Suspense>
      </div>

      {/* PRODUCTS SECTION */}
      <div className="container mx-auto px-4 py-16">

        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <div className="w-2 h-10 bg-[#50829F] rounded-full"></div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Featured <span className="text-[#50829F]">Products</span>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8">
          {allProducts?.map(function (product) {
            return (
              <Link
                key={product._id}
                href={`/products/${product._id}`}
                className="group"
              >
                <div className="transition-transform duration-300 group-hover:-translate-y-2">
                  <ProductCard product={product} />
                </div>
              </Link>
            );
          })}
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
