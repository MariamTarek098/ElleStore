"use client";

import { useState } from "react";

type ProductImagesProps = {
  thumbnails: string[];
  product?: {
    title?: string;
  };
};

export default function ProductImages({
  thumbnails,
  product,
}: ProductImagesProps) {
  const [mainImage, setMainImage] = useState<string>(thumbnails[0]);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-white border border-slate-100 rounded-2xl p-8 flex items-center justify-center h-[500px]">
        <img
          src={mainImage}
          alt={product?.title || "product image"}
          className="max-h-full object-contain mix-blend-multiply"
        />
      </div>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {thumbnails.slice(0, 4).map((img: string, index: number) => (
          <button
            key={index}
            onClick={() => {
              setMainImage(img);
              setActiveIndex(index);
            }}
            className={`flex-shrink-0 w-24 h-24 bg-white border-2 rounded-xl p-2 flex items-center justify-center transition-all ${
              index === activeIndex
                ? "border-[#50829F]"
                : "border-slate-100 hover:border-[#50829F]/50"
            }`}
          >
            <img
              src={img}
              alt={`Thumbnail ${index + 1}`}
              className="max-h-full object-contain mix-blend-multiply"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
