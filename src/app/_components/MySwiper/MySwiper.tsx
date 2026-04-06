'use client'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function MySwiper({ imagesList, slidePerView = 1, spaceBetween = 50 }: { imagesList: string[]; slidePerView?: number; spaceBetween?: number }) {
  return (
    <Swiper  
      modules={[Navigation, Pagination]}
      spaceBetween={spaceBetween}
      slidesPerView={slidePerView}
      loop
      navigation
      pagination={{
        clickable: true,
      }}
      className="mySwiper w-full"
    >
      {imagesList.map((imgsrc) => (
        <SwiperSlide key={imgsrc}>
          <img 
            src={imgsrc} 
            alt="Product" 
            className='w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover' 
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};