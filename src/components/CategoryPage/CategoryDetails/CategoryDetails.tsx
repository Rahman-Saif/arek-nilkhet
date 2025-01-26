'use client'

import React, { useState, useEffect } from 'react';
import useLocalCart from '../../../Hooks/useLocalCart';
import { addToDb } from '../../../Utilities/LocalStorage';
import Footer from '../../common/footer/Footer';
import Header from '../../common/header/Header';
import MegaMenu from '../../common/MegaMenu/MegaMenu';
import CategoryDetail from './CategoryDetail';
// import {useParams} from 'react-router';
import useCategoryBooksSortByNew from '../../../Hooks/Sorting/SortingCategoryBooks/useCategoryBooksSortByNew';
import useCategoryBooksSortByStock from '../../../Hooks/Sorting/SortingCategoryBooks/useCategoryBooksSortByStock';
import useCategoryBooksSortByHighPrice from '../../../Hooks/Sorting/SortingCategoryBooks/useCategoryBooksSortByHighPrice';
import useCategoryBooksSortByLowPrice from '../../../Hooks/Sorting/SortingCategoryBooks/useCategoryBooksSortByLowPrice';
import Pagination from '../../Shared/Pagination/Pagination';
// import { url } from '../../../App';
import useCategoryAllBooks from '../../../Hooks/useCategoryAllBooks';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function CategoryDetails({categoryName, authors, publishers}) {
  // const {categoryName} = useRouter();
  const [sorted_books, setSortedBooks] = useState([]);
  const [filteredAuthorBooks, setFilterAuthorBooks] = useState([]);
  const [filteredPublisherBooks, setFilterPublisherBooks] = useState([]);
  const [books, pageCount, handlePageClick, offset, displayBooks] = useCategoryAllBooks(categoryName);
  const [CartItem, setCartItem]= useLocalCart(books);
  const [sortedNewBooks] = useCategoryBooksSortByNew(categoryName);
  const [sortedStockBooks] = useCategoryBooksSortByStock(categoryName);
  const [sortedHighBooks] = useCategoryBooksSortByHighPrice(categoryName);
  const [sortedLowBooks] = useCategoryBooksSortByLowPrice(categoryName);
  const [sortingValue, setSortingValue] = useState('');
  const [filterAuthorValue, setFilterAuthorValue] = useState(0);
  const [filterPublisherValue, setFilterPublisherValue] = useState(0);
  const [totalPageCount, setTotalPageCount] = useState(0);
  const [displayTotalBooks, setDisplayTotalBooks] = useState([]);
  const [offsetBooks, setOffsetBooks] = useState(0);

  
  console.log("displayBooks",books);

  //pagination page click function
  const handleTotalPageClick=(e)=>{
    const selectedPage = e.selected;
    setOffsetBooks(selectedPage*20);
  }

  //default filter function
  const selectDefaultFilter = () =>{
    setFilterAuthorValue(0);
    setFilterPublisherValue(0);
    setSortingValue('');
  }

  //filter by author function
  const selectFilterByAuthor = (authorId) =>{
    setFilterAuthorValue(authorId);
    setFilterPublisherValue(0);
    setSortingValue('');
  }

  //filter by publisher function
  const selectFilterByPublisher = (publisherId) =>{
    setFilterPublisherValue(publisherId);
    setFilterAuthorValue(0);
    setSortingValue('');
  }

  //sorting function
  const selectSort = (e) =>{
    setSortingValue(e.target.value);
    setFilterPublisherValue(0);
    setFilterAuthorValue(0);
  }

  useEffect(() => {
    let data =[];

   
    
    if(filterAuthorValue!==0){
      data = books.filter(book => book.author == filterAuthorValue);
      setFilterAuthorBooks(data);
      setFilterPublisherBooks([]);
    }
    if(filterPublisherValue!==0){
      data = books.filter(book => book.publisher == filterPublisherValue);
      setFilterAuthorBooks([]);
      setFilterPublisherBooks(data);
    }  
    if(sortingValue === "highest"){
      data = sortedHighBooks;
      setSortedBooks(data);
    }
    if(sortingValue === "lowest"){
      data = sortedLowBooks;
      setSortedBooks(data);
    }
    if(sortingValue === "inStock"){
      data = sortedStockBooks;
      setSortedBooks(data);
    }
    if(sortingValue === "new"){
      data=sortedNewBooks;
      setSortedBooks(data);
    }
    
    const pageNumber = (Math.floor(data.length/20))+1;
    setTotalPageCount(pageNumber);
    setDisplayTotalBooks(data?.slice(offsetBooks, (offsetBooks+(20*1))));

  }, [books, filterAuthorValue, filterPublisherValue, sortingValue, offsetBooks]);


  // cart function
  const handleAddToCart=(book)=>{
    const newCart=[...CartItem, book];
    setCartItem(newCart);
    addToDb(book?.id);
    alert('Successfully added!');
  }

  return (
    <>
      <Header ></Header>
      <MegaMenu></MegaMenu>
      <div className="w-11/12 mx-auto my-3 mb-5">
        <h4 className="text-center font-bold">{categoryName}</h4>
        <hr className="bg-green-500 w-1/4 mx-auto" />
        <div className="w-11/12 mx-auto my-3 grid grid-cols-1 md:grid-cols-4 gap-4">
          {(displayBooks?.length === 0 && displayTotalBooks?.length === 0) && 
            <div className="h-screen"></div>
          }
          {(displayBooks?.length !== 0 || displayTotalBooks?.length !== 0) && 
          <>



          {/* <section className="filter lg:col-span-3 col-span-12 mt-5">
            <button
              className="text-center bg-gray-100 p-2 rounded border mb-3 mx-auto block"
              onClick={selectDefaultFilter}
            >
              Default Filter
            </button>
            <select
              className="form-select border mb-2 w-full"
              size="5"
              aria-label="size 3 select example"
              onChange={(e) => selectFilterByAuthor(e)}
            >
              <option
                className="text-center text-lg font-bold text-white bg-gray-800 p-3"
                disabled
                selected
              >
                Filter By Author's
              </option>
              {authors?.map((author) => (
                <option
                  value={author?.id}
                  key={author?.id}
                  className="text-base font-medium p-2 text-left break-words border-b"
                >
                  {author?.name}
                </option>
              ))}
            </select>
            <select
              className="form-select border w-full"
              size="5"
              aria-label="size 3 select example"
              onChange={(e) => selectFilterByPublisher(e)}
            >
              <option
                className="text-center text-lg font-bold text-white bg-gray-800 p-3"
                disabled
                selected
              >
                Filter By Publisher's
              </option>
              {publishers?.map((publisher) => (
                <option
                  value={publisher?.id}
                  key={publisher?.id}
                  className="text-base font-medium p-2 text-left break-words border-b"
                >
                  {publisher?.name}
                </option>
              ))}
            </select>
          </section> */}
   <section className="filter col-span-1 mt-5 w-11/12 md:w-9/12  items-center">
  <button 
    className="text-center  p-2 rounded border border-gray-300 text-gray-700 mb-3 mx-auto" 
    onClick={selectDefaultFilter}
  >
    Default Filter
  </button>


  <div className="grid lg:grid-cols-1 md:grid-cols-2 grid-cols-1 gap-4 ">
    <div className="col-span-1 ">
  <div className="border border-gray-300 rounded-md shadow-lg p-4 overflow-y-auto h-64">
    {/* Filter Header */}
    <div className="text-white bg-gray-700 text-lg font-bold text-center py-2 rounded mb-3">
      Filter By Author's
    </div>

    {/* Author List */}
    <ul className="space-y-2 text-gray-700 text-sm">
      {authors?.map((author) => (
        <li
          key={author.id}>
            <button
          className="p-2 hover:bg-gray-200 cursor-pointer"
          onClick={() => selectFilterByAuthor(author.id)}
          title={author.name}
        >
          {author.name}
        </button>
        </li>
      ))}
    </ul>
  </div>
</div>

    <div className="col-span-1">
  <div className="border border-gray-300 rounded-md shadow-lg p-4 overflow-y-auto h-64">
    {/* Filter Header */}
    <div className="text-white bg-gray-700 text-lg font-bold text-center py-2 rounded mb-3">
      Filter By Publisher's
    </div>

    {/* Publisher List */}
    <ul className="space-y-2 text-gray-700 text-sm">
      {publishers.map((publisher) => (
        <li
          key={publisher.id}
          className="p-2 hover:bg-gray-200 cursor-pointer"
          onClick={() => selectFilterByPublisher(publisher.id)}
          title={publisher.name}
        >
          {publisher.name}
        </li>
      ))}
    </ul>
  </div>
</div>

  </div>
</section>


            
            <section className=" col-span-3">


              <div className="sort-filter m-3 flex justify-end">
                <div className="sort">
                  <form action="#" className="">
                    <label htmlFor="sort" className="sr-only">Sort</label>
                    <select
                      name="sort"
                      id="sort"
                      className="bg-gray-100 p-2 rounded border text-base font-medium"
                      onChange={(e) => selectSort(e)}
                    >
                      <option value="default" onClick={selectDefaultFilter}>
                        Default Sorting
                      </option>
                      <option value="lowest">Price low to high</option>
                      <option value="highest">Price high to low</option>
                      <option value="inStock">In stock</option>
                      <option value="new">New arrivals</option>
                    </select>
                  </form>
                </div>
              </div>


              
              <div className="container mx-auto">
                {(sortingValue === '' && filterAuthorValue === 0 && filterPublisherValue === 0 && displayBooks?.length !== 0) && (
                  <>
                    {displayBooks?.length <= 4 ? (
                      <div style={{ height: '1000px' }}>
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-auto">
                          {displayBooks?.map((book) => (
                            <CategoryDetail key={book?.id} book={book} handleAddToCart={handleAddToCart}></CategoryDetail>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-auto">
                        {displayBooks?.map((book) => (
                          <CategoryDetail key={book?.id} book={book} handleAddToCart={handleAddToCart}></CategoryDetail>
                        ))}
                      </div>
                    )}
                    <div className="container mx-auto mt-5">
                      <Pagination pageCount={pageCount} handlePageClick={handlePageClick} offset={offset}></Pagination>
                    </div>
                  </>
                )}
                {(filterAuthorValue !== 0 && filteredAuthorBooks?.length !== 0) && (
                  <>
                    {(filteredAuthorBooks?.length <= 4) ? (
                      <div style={{ height: '1000px' }}>
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-auto">
                          {displayTotalBooks?.map((book) => (
                            <CategoryDetail key={book?.id} book={book} handleAddToCart={handleAddToCart}></CategoryDetail>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-auto">
                        {displayTotalBooks?.map((book) => (
                          <CategoryDetail key={book?.id} book={book} handleAddToCart={handleAddToCart}></CategoryDetail>
                        ))}
                      </div>
                    )}
                    <div className="container mx-auto mt-5">
                      <Pagination pageCount={totalPageCount} handlePageClick={handleTotalPageClick} offset={offsetBooks}></Pagination>
                    </div>
                  </>
                )}
                {(filterPublisherValue !== 0 && filteredPublisherBooks?.length !== 0) && (
                  <>
                    {(filteredPublisherBooks?.length <= 4) ? (
                      <div style={{ height: '1000px' }}>
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-auto">
                          {displayTotalBooks?.map((book) => (
                            <CategoryDetail key={book?.id} book={book} handleAddToCart={handleAddToCart}></CategoryDetail>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-auto">
                        {displayTotalBooks?.map((book) => (
                          <CategoryDetail key={book?.id} book={book} handleAddToCart={handleAddToCart}></CategoryDetail>
                        ))}
                      </div>
                    )}
                    <div className="container mx-auto mt-5">
                      <Pagination pageCount={totalPageCount} handlePageClick={handleTotalPageClick} offset={offsetBooks}></Pagination>
                    </div>
                  </>
                )}
                {(sortingValue !== '' && sorted_books?.length !== 0) && (
                  <>
                    {(sorted_books?.length <= 4) ? (
                      <div style={{ minHeight: '1000px', maxHeight: '2500px' }}>
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-auto">
                          {displayTotalBooks?.map((book) => (
                            <CategoryDetail key={book?.id} book={book} handleAddToCart={handleAddToCart}></CategoryDetail>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-auto">
                        {displayTotalBooks?.map((book) => (
                          <CategoryDetail key={book?.id} book={book} handleAddToCart={handleAddToCart}></CategoryDetail>
                        ))}
                      </div>
                    )}
                    <div className="container mx-auto mt-5">
                      <Pagination pageCount={totalPageCount} handlePageClick={handleTotalPageClick} offset={offsetBooks}></Pagination>
                    </div>
                  </>
                )}
              </div>      
            </section>
          </>
          }
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}
