import React from 'react';
import { ProductCardPrpos } from './ProductCard.types';
import { Star } from 'lucide-react';
import AddToCartButton from '../AddToCartButton/AddToCartButton';
import AddToWishlistButton from '../AddToWishlistButton/AddToWishlistButton';

export default function ProductCard({ product }: ProductCardPrpos) {
  // Check if product has discount 
  const hasDiscount = product.priceAfterDiscount && product.priceAfterDiscount < product.price;
  
  // Calc discount percentage
  const discountPercentage = hasDiscount 
    ? Math.round(((product.price - product.priceAfterDiscount!) / product.price) * 100)
    : 0;

  return (
    <div className="group border border-slate-200 hover:border-[#50829F]/50 rounded-xl overflow-hidden bg-white hover:shadow-lg transition-all duration-300 relative flex flex-col h-full">

      {hasDiscount && (
        <div className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded z-10">
          -{discountPercentage}%
        </div>
      )}

      <div className="absolute top-3 right-3 flex flex-col gap-2 z-10 opacity-100 xl:opacity-0 xl:group-hover:opacity-100 transition-opacity">
       <AddToWishlistButton id={product._id}/>

      </div>

      <div className="w-full h-56 bg-slate-50 p-4 flex items-center justify-center overflow-hidden">
        <img 
          src={product.imageCover} 
          alt={product.title} 
          className="max-h-full object-contain group-hover:scale-105 transition-transform duration-500 mix-blend-multiply"
        />
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <span className="text-[11px] text-slate-400 uppercase tracking-wider mb-1">
          {product.category?.name || "Category"}
        </span>
        
        <h3 className="text-sm font-medium text-slate-800 line-clamp-2 leading-tight min-h-[40px] mb-2 group-hover:text-[#50829F] transition-colors">
          {product.title}
        </h3>

        <div className="flex items-center gap-1 mb-4">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`w-3 h-3 ${i < Math.floor(product.ratingsAverage) ? 'fill-current' : 'text-slate-200 fill-slate-200'}`} 
              />
            ))}
          </div>
          <span className="text-[11px] text-slate-500 ml-1 font-medium">
            {product.ratingsAverage} <span className="text-slate-400">({product.ratingsQuantity})</span>
          </span>
        </div>

        <div className="mt-auto flex items-end justify-between">
          <div className="flex flex-col">
            {hasDiscount ? (
              <>
                <span className="text-sm font-bold text-[#50829F]">{product.priceAfterDiscount} EGP</span>
                <span className="text-[11px] text-slate-400 line-through">{product.price} EGP</span>
              </>
            ) : (
              <span className="text-sm font-bold text-[#50829F]">{product.price} EGP</span>
            )}
          </div>
          
         <AddToCartButton id={product._id}/>
         
        </div>
      </div>

    </div>
  );
}