import React, { useEffect } from 'react';
import { useState } from 'react';
import useCategories from '../../../Hooks/useCategories';
import Link from 'next/link';
import { MdGridView } from "react-icons/md";


const PopularCategory = () => {
  const [displayData] = useCategories();
  const [currentIndex, setCurrentIndex] = useState(0);

//   console.log("hahahahahah",displayData);

//   const slideInterval=3000;
      

//       useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentIndex((prevIndex) => (prevIndex + 1) % displayData.length);
//     }, slideInterval);

//     return () => clearInterval(interval); 
//   }, [displayData.length]);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => prevIndex === displayData.length - 1 ? 0 : prevIndex + 1);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => prevIndex === 0 ? displayData.length - 1 : prevIndex - 1);
    };

  return (
    <>
     
       <section className="popular-category py-8 ">
            <div className="container mx-auto">
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center">
                        {/* <i className="fa-solid fa-border-all text-warning mr-2"></i> */}
                        <MdGridView size={30} color='#fac309' className='mr-2'/>
                        <h4 className="text-center text-lg font-semibold ">জনপ্রিয় ক্যাটাগরী</h4>
                    </div>
                    <div className="flex items-center">
                        <span className="mr-1">
                            <Link href="/categories" className='text-white'>সবগুলো দেখুন</Link>
                        </span>
                        <i className="fa-solid fa-caret-right"></i>
                    </div>
                </div>
                <div className="relative overflow-hidden">
                    <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${currentIndex * (100 / 6)}%)` }}>
                        {displayData.map((category) => (
                            <div key={category.id} className="flex-shrink-0  p-2 md:max-w-[250px] md:min-w-[250px] max-h-[400px] min-h-[400px]">
                                <div className="bg-white border border-gray-300 rounded-lg shadow">
                                    <div className="relative">
                                        <a href={`/categories/${category.name}`}>
                                            <img
                                                className="w-full h-48 object-cover rounded-t-lg"
                                                src={category.image}
                                                alt=""
                                            />
                                        </a>
                                    </div>
                                    <div className="p-2">
                                        <p className="text-center">
                                            <Link href={`/categories/${category.name}`} className='font-medium text-gray-800'>
                                                {category.name}
                                            </Link>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* Navigation Buttons */}
                    <button 
                        onClick={prevSlide} 
                        className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 bg-gray-800 text-white rounded-full"
                        aria-label="Previous Slide"
                    >
                        &lt;
                    </button>
                    <button 
                        onClick={nextSlide} 
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 bg-gray-800 text-white rounded-full"
                        aria-label="Next Slide"
                    >
                        &gt;
                    </button>
                </div>
            </div>
        </section>

    </>
  );
};

export default PopularCategory;
