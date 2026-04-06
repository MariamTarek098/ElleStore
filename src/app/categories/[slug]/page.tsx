import React from 'react'
import { getAllProducts } from '@/services/product.services';
import ProductCard from '../../_components/ProductCard/ProductCard';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

export default async function categories({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
    await new Promise((res) => setTimeout(res, 1000));
  const allProducts = await getAllProducts();
  
  const filteredProducts = allProducts?.filter((product) => {
    return product.category.slug === slug;
  });

  return (
    <div className="w-[80%] m-auto pt-10">
      <nav className="flex items-center text-sm text-slate-500 mb-8 gap-2">
        <Link
          href="/"
          className="flex items-center hover:text-[#50829F] transition-colors"
        >
          <Home className="w-4 h-4 mr-1" /> Home
        </Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-[#50829F] font-bold capitalize">
          {slug.replace(/-/g, ' ')} 
        </span>
      </nav>

    
      {filteredProducts?.length === 0 ? (
        <div className="text-center py-20 text-slate-500">
          No products found in this category.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8">
         
          {filteredProducts?.map(function (product) {
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
      )}
    </div>
  )
}
