import React from 'react';
import { BrandCardPrpos } from './BrandCard.types';


export default function BrandCard({ brand }: BrandCardPrpos) {
  return (
    <div className="group bg-white rounded-2xl border border-slate-100 p-4 shadow-sm hover:shadow-xl hover:border-[#50829F]/30 transition-all duration-300 flex flex-col items-center">
  
      <div className="relative w-full aspect-square bg-slate-50 rounded-xl overflow-hidden flex items-center justify-center p-6 group-hover:bg-white transition-colors">
        <img
          src={brand.image}
          alt={brand.name}
          className="max-w-full max-h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-300"
        />
      </div>

      <div className="mt-4 text-center">
        <h3 className="text-slate-800 font-bold text-sm tracking-tight group-hover:text-[#50829F] transition-colors">
          {brand.name}
        </h3>
      </div>
      
    </div>
  );
}