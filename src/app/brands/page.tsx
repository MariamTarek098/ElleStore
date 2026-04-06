import React from 'react';
import { getBrands } from '@/services/product.services';
import Link from 'next/link';
import { ChevronRight, Home, LayoutGrid } from 'lucide-react';
import BrandCard from '../_components/BrandCard/BrandCard';

export default async function BrandsPage() {
  const allBrands = await getBrands();

  return (
    <div className="w-[90%] lg:w-[80%] m-auto pt-10 pb-20">
      <nav className="flex items-center text-sm text-slate-500 mb-8 gap-2">
        <Link
          href="/"
          className="flex items-center hover:text-[#50829F] transition-colors"
        >
          <Home className="w-4 h-4 mr-1" /> Home
        </Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-[#50829F] font-bold capitalize">
           Brands
        </span>
      </nav>

      <div className="flex items-center gap-3 mb-10 border-b border-slate-100 pb-6">
        <div className="bg-[#50829F]/10 p-2 rounded-lg">
          <LayoutGrid className="w-6 h-6 text-[#50829F]" />
        </div>
        <div>
          <h1 className="text-3xl font-black text-slate-900">Official Brands</h1>
          <p className="text-slate-500 text-sm">Browse products by your favorite manufacturers</p>
        </div>
      </div>

      {!allBrands || allBrands.length === 0 ? (
        <div className="text-center py-20 text-slate-500 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
          No brands found.
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {allBrands.map((brand) => (
            <Link
              key={brand._id}
              href={`/brand/${brand.slug}`}
              className="block transition-transform duration-300 hover:-translate-y-2"
            >
              <BrandCard brand={brand} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}