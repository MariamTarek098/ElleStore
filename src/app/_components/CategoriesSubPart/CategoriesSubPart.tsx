import Link from "next/link";
import React from "react";
import { ArrowRight } from "lucide-react";
import { GiMicrophone, GiClothes, GiShoppingBag, GiBookshelf, GiBearFace } from "react-icons/gi";
import { 
  MdOutlineWoman, 
  MdOutlineHomeWork, 
  MdOutlineHealthAndSafety, 
  MdOutlinePhonelinkSetup, 
  MdOutlineDevicesOther 
} from "react-icons/md";
import { getCategories } from "@/services/product.services";

export default async function CategoriesSubPart() {
  const allCategories = await getCategories("");

  const iconMap: { [key: string]: React.ReactNode } = {
    "Music": <GiMicrophone />,
    "Men's Fashion": <GiClothes />,
    "Women's Fashion": <MdOutlineWoman />,
    "SuperMarket": <GiShoppingBag />,
    "Baby & Toys": <GiBearFace />,
    "Home": <MdOutlineHomeWork />,
    "Books": <GiBookshelf />,
    "Beauty & Health": <MdOutlineHealthAndSafety />,
    "Mobiles": <MdOutlinePhonelinkSetup />,
    "Electronics": <MdOutlineDevicesOther />,
  };

  return (
    <div>
      <div className="flex justify-between items-end mb-12">
        <div className="flex items-center gap-4">
          <div className="w-2 h-10 bg-[#50829F] rounded-full"></div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Shop By <span className="text-[#50829F]">Category</span>
          </h2>
        </div>
        
        <Link 
          href="/categories" 
          className="group flex items-center gap-2 text-[#50829F] font-bold hover:text-[#3d657d] transition-all hidden sm:flex"
        >
          View All 
          <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-12 gap-x-6">
        {allCategories?.map(function (cat) {
          return (
            <Link 
              href={`/categories/${cat.slug}`} 
              key={cat._id}
              className="group flex flex-col items-center text-center gap-5 outline-none"
            >
              <div className="relative">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-3xl bg-slate-100 border border-slate-100 overflow-hidden flex items-center justify-center group-hover:rounded-full group-hover:rotate-3 group-hover:shadow-2xl group-hover:shadow-[#50829F]/30 transition-all duration-500 ease-out">
                  <img 
                    src={cat.image} 
                    alt={cat.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 group-hover:opacity-40"
                  />

                  <div className="absolute inset-0 flex items-center justify-center text-4xl md:text-5xl text-white opacity-0 group-hover:opacity-100 group-hover:bg-[#50829F]/60 transition-all duration-500">
                    {iconMap[cat.name] || <ArrowRight />}
                  </div>
                </div>

              </div>
              
              <div className="space-y-1">
                <h3 className="font-bold text-slate-800 group-hover:text-[#50829F] transition-colors text-sm md:text-base tracking-tight leading-tight">
                  {cat.name}
                </h3>
                <div className="w-0 h-0.5 bg-[#50829F] mx-auto group-hover:w-full transition-all duration-300"></div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}