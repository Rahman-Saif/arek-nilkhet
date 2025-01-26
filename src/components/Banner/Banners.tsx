'use client'
import React from "react";
import { useEffect, useState } from "react";
import useBanners from "../../Hooks/useBanners";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Image from "next/image";



const Banners=()=> {
     const [currentSlide, setCurrentSlide] = useState(0);
         const [currentIndex, setCurrentIndex] = useState(0);


  // Sample banners array as provided
//   const banners = [
//     { id: 1, image: "/images/SlideCard/slide-2.jpg", alt_text: "Banner 2", url: "" },
//     { id: 2, image: "/images/SlideCard/slide-3.jpg", alt_text: "Banner 3", url: "" },
//     { id: 3, image: "/images/SlideCard/slide-4.jpg", alt_text: "Banner 3", url: "" },
//   ];
    const [banners] = useBanners();
    console.log('bannnerrrrr',banners);



  const nextBanner = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    };

    const prevBanner = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + banners.length) % banners.length);
    };
   
    return (
        <>
       <section className="container relative ">
    <div className="relative w-3/4 mx-auto">
        <button 
            onClick={prevBanner} 
            className="absolute top-1/2 -left-20 transform -translate-y-1/2 z-10 p-2 text-blue-800  text-6xl"
            aria-label="Previous Banner"
        >
            <IoIosArrowBack />
        </button>
        <button 
            onClick={nextBanner} 
            className="absolute top-1/2 -right-20 transform -translate-y-1/2 z-10 p-2 text-blue-800  text-6xl"
            aria-label="Next Banner"
        >
            <IoIosArrowForward />

        </button>

        <div className="overflow-hidden w-full">
            <div 
                className="flex transition-transform duration-500" 
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {banners.map((banner) => (
                    <div key={banner.id} className="flex-shrink-0 w-full">
                        {banner.url ? (
                            <a href={banner.url}>
                                <Image
                                width={1000}
                                height={1000}
                                    className="h-[295px] w-full object-cover sm:h-[200px] md:h-[200px] lg:h-[295px]"
                                    src={banner.image}
                                    alt={banner.alt_text}
                                />
                            </a>
                        ) : (
                            <Image
                            width={1000}
                            height={1000}
                                className="h-[295px] w-full object-cover sm:h-[180px] md:h-[200px] lg:h-[295px]"
                                src={banner.image}
                                alt={banner.alt_text}
                            />
                        )}
                    </div>
                    
                ))}
            </div>
        </div>
    </div>
</section>

        </>
    );
}

export default Banners;