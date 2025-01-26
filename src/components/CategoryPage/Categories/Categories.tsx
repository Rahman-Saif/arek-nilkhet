'use client'
import React from 'react';
import useCategories from '../../../Hooks/useCategories';
import Footer from '../../common/footer/Footer';
import Header from '../../common/header/Header';
import MegaMenu from '../../common/MegaMenu/MegaMenu';
import Pagination from '../../Shared/Pagination/Pagination';
import Category from './Category';

const Categories = () => {
    const [categories, pageCount, handlePageClick, offset, displayData] = useCategories();

    return (
        <>
        <Header />
        <MegaMenu/>
        <div className="container mx-auto my-3 mb-5 bg-gray-100">
  <h4 className="text-center font-bold text-lg">বইয়ের ক্যাটাগরী</h4>
  <hr className="bg-green-500 w-1/4 mx-auto" />
  {Array.isArray(categories) && categories.length === 0 && <div className="min-h-screen"></div>}
  {Array.isArray(categories) && categories.length !== 0 && (
    <>
      {Array.isArray(displayData) && displayData.length <= 5 ? (
        <div style={{ minHeight: "1000px", maxHeight: "2500px" }}>
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4 container mx-auto">
            {Array.isArray(displayData) && displayData.map((category) => (
              <Category key={category?.id} category={category}></Category>
            ))}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4 container mx-auto">
          {Array.isArray(displayData) && displayData.map((category) => (
            <Category key={category?.id} category={category}></Category>
          ))}
        </div>
      )}
      <div className="container w-3/4 mx-auto mt-5">
        <Pagination
          pageCount={pageCount}
          handlePageClick={handlePageClick}
          offset={offset}
        ></Pagination>
      </div>
    </>
  )}
</div>

        <Footer></Footer>
      </>
    );
}

export default Categories;