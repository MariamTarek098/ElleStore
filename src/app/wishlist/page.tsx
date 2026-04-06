import React from 'react';
import { Heart } from 'lucide-react';
import Link from 'next/link';
import { getUserWishlist } from './whishlist.services';
import RemoveFromWishlist from '../_components/RemoveFromWishlist/RemoveFromWishlist';

export default async function MyWishlistPage() {
  const wishlist = await getUserWishlist();

  if (!wishlist || wishlist.data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-500">
        <Heart className="w-16 h-16 mb-4 text-slate-200" />
        <h2 className="text-xl font-bold">Your wishlist is empty</h2>
        <p>Start adding items you love!</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-slate-800 mb-6">My Wishlist</h1>
      
      <div className="bg-white border border-slate-100 rounded-[2rem] overflow-hidden shadow-sm">
        <div className="divide-y divide-slate-100">
          {wishlist.data.map((product) => (
            <div 
              key={product._id} 
              className="group hover:bg-slate-50/50 transition-colors p-4 md:p-6"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">

                <Link href={`/products/${product._id}`} className="flex items-center gap-4 flex-1">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden border border-slate-100 flex-shrink-0">
                    <img 
                      src={product.imageCover} 
                      alt={product.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-slate-800 text-sm md:text-base line-clamp-2 group-hover:text-[#50829F] transition-colors">
                      {product.title}
                    </h3>
                    <p className="text-xs text-[#50829F] font-semibold mt-1">
                      {product.category?.name}
                    </p>
                    <p className="md:hidden font-bold text-slate-900 mt-1">
                      {product.priceAfterDiscount || product.price} EGP
                    </p>
                  </div>
                </Link>

                <div className="hidden md:block font-bold text-slate-900 min-w-[120px] text-center">
                  {product.priceAfterDiscount || product.price} EGP
                </div>

                <div className="hidden md:block text-center">
                   <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-50 text-green-600 text-[10px] font-bold">
                    In Stock
                  </span>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-2 pt-3 md:pt-0 border-t md:border-t-0 border-slate-50">
                  <span className="md:hidden inline-flex items-center px-2 py-1 rounded-full bg-green-50 text-green-600 text-[10px] font-bold">
                    In Stock
                  </span>
                  
                  <div className="flex items-center gap-2">
                    <Link 
                      href={`/products/${product._id}`}
                      className="flex items-center gap-2 px-3 py-2 md:px-4 bg-white border border-slate-200 text-slate-700 rounded-xl text-xs font-bold hover:bg-[#50829F] hover:text-white hover:border-[#50829F] transition-all shadow-sm"
                    >
                      View
                    </Link>
                    <RemoveFromWishlist itemId={product._id}/>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}