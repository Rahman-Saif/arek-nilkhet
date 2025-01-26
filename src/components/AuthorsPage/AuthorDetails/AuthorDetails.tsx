'use client'

// import { url } from '@/app/page';
import React, { useState, useEffect } from 'react';
import useLocalCart from '../../../Hooks/useLocalCart';
import { addToDb } from '../../../Utilities/LocalStorage';
import Footer from '../../common/footer/Footer';
import Header from '../../common/header/Header';
import MegaMenu from '../../common/MegaMenu/MegaMenu';
import AuthorDetail from './AuthorDetail';
// import {useParams} from 'react-router';
import useAuthorBooksSortByNew from '../../../Hooks/Sorting/SortingAuthorBooks/useAuthorBooksSortByNew';
import useAuthorBooksSortByStock from '../../../Hooks/Sorting/SortingAuthorBooks/useAuthorBooksSortByStock';
import useAuthorBooksSortByHighPrice from '../../../Hooks/Sorting/SortingAuthorBooks/useAuthorBooksSortByHighPrice';
import useAuthorBooksSortByLowPrice from '../../../Hooks/Sorting/SortingAuthorBooks/useAuthorBooksSortByLowPrice';
import Pagination from '../../Shared/Pagination/Pagination';
import { useRouter } from 'next/navigation';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal } from "lucide-react";
// import { useRouter } from 'next/router';
//import { url } from '../../../App';

export default function AuthorDetails({authorName}) {
  // console.log("authorName",authorName);
  // const {authorName} = useRouter();
  const [books, setAuthorBooks] = useState([]);
  const [CartItem, setCartItem]= useLocalCart(books);
  const [sorted_books, setSortedBooks] = useState([]);
  const [sortedNewBooks] = useAuthorBooksSortByNew(authorName);
  const [sortedStockBooks] = useAuthorBooksSortByStock(authorName);
  const [sortedHighBooks] = useAuthorBooksSortByHighPrice(authorName);
  const [sortedLowBooks] = useAuthorBooksSortByLowPrice(authorName);
  const [sortingValue, setSortingValue] = useState('');
  const [totalPageCount, setTotalPageCount] = useState(0);
  const [displayTotalBooks, setDisplayTotalBooks] = useState([]);
  const [offsetBooks, setOffsetBooks] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [displayBooks, setDisplayBooks] = useState([]);
  const [offset, setOffset] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
          const url = process.env.NEXT_PUBLIC_URL;


  //pagination page click function
  const handleTotalPageClick=(e)=>{
    const selectedPage = e.selected;
    setOffsetBooks(selectedPage*20);
  }
  const handlePageClick=(e)=>{
    const selectedPage = e.selected;
    setOffset(selectedPage*20);
  }

  //default sort function
  const selectDefaultSort = () =>{
    setSortingValue('');
  }

  //sorting function
  const selectSort = (e) =>{
    setSortingValue(e.target.value);
  }

  useEffect(() => {
    let data = [];  

    fetch(`${url}/author-book/${authorName}/`)
      .then(res => res.json())
      .then(result => {
        console.log("Author books:", result);
        // Ensure result is an array
        const books = Array.isArray(result) ? result : [];
        setAuthorBooks(books);
        const pageNumber = Math.floor(books.length / 20) + 1;
        setPageCount(pageNumber);
        setDisplayBooks(books.slice(offset, offset + 20));
      })
      .catch(error => {
        console.error("Error fetching author books:", error);
        setAuthorBooks([]);
        setDisplayBooks([]);
      });

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
    setDisplayTotalBooks(data.slice(offsetBooks, (offsetBooks+(20*1))));

   },[authorName, sortingValue, offset, offsetBooks]);

  
  // cart function 
  const handleAddToCart=(book)=>{
    const newCart=[...CartItem, book];
    setCartItem(newCart);
    addToDb(book.id);
    // alert('Successfully added!');
    setShowAlert(true); // Show alert when an item is added
    setTimeout(() => setShowAlert(false), 3000); 
  }
  
  return (
    <>
      <Header CartItem={CartItem}></Header>
      <MegaMenu></MegaMenu>

      <div className="w-11/12 mx-auto my-3 mb-5 ">
  {/* <h4 className="text-center font-semibold">{authorName} Books</h4> */}
  {/* <hr className="bg-green-500 w-1/4 mx-auto" /> */}
  
  {(books.length === 0 && displayTotalBooks.length === 0) && <div className="h-screen"></div>}

  {(books.length !== 0 || displayTotalBooks.length !== 0) && (
    <section>
     <div className="container mx-auto my-3 mb-5 ">
  <h4 className="text-center font-medium text-2xl mb-0">{authorName} Books</h4>
  <hr className="bg-[#fac309] w-1/4 mx-auto h-[2px] border-0" />

  {(books.length === 0 && displayTotalBooks.length === 0) && <div className="h-screen"></div>}

  {(books.length !== 0 || displayTotalBooks.length !== 0) && (
    <section>
      <div className="flex justify-end m-3 mb-16">
        <div className="sort">
          <form action="#" className="">
            <label htmlFor="sort" className="sr-only">Sort</label>
            <select
              name="sort"
              id="sort"
              className="bg-white p-2 rounded border border-gray-300 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              onChange={(e) => selectSort(e)}
            >
              <option value="default" onClick={selectDefaultSort}>
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

      <div>
        {(sortingValue === '' && displayBooks?.length !== 0) && (
          <>
            {displayBooks?.length <= 4 ? (
              <div style={{ height: '1000px' }}>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mx-auto">
                  {books.map((book) => (
                    <AuthorDetail
                      key={book.id}
                      book={book}
                      handleAddToCart={handleAddToCart}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mx-auto">
                {books.map((book) => (
                  <AuthorDetail
                    key={book.id}
                    book={book}
                    handleAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            )}

            <div className="w-3/4 mx-auto mt-5">
              <Pagination pageCount={pageCount} handlePageClick={handlePageClick} offset={offset} />
            </div>
          </>
        )}

        {(sortingValue !== '' && sorted_books?.length !== 0) && (
          <>
            {sorted_books?.length <= 4 ? (
              <div style={{ height: '1000px' }}>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mx-auto">
                  {displayTotalBooks.map((book) => (
                    <AuthorDetail
                      key={book.id}
                      book={book}
                      handleAddToCart={handleAddToCart}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mx-auto">
                {displayTotalBooks.map((book) => (
                  <AuthorDetail
                    key={book.id}
                    book={book}
                    handleAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            )}

            <div className="w-16 mx-auto mt-5">
              <Pagination pageCount={totalPageCount} handlePageClick={handleTotalPageClick} offset={offsetBooks} />
            </div>
          </>
        )}
      </div>
    </section>
  )}
</div>

    </section>
  )}
</div>
{showAlert && (
        <Alert className="fixed bottom-4 right-4 w-96 bg-[#fac309] opacity-70 border border-green-300 rounded-lg p-4 shadow-lg">
          <Terminal className="h-4 w-4 text-white" />
          <AlertDescription className="text-white">
            Successfully added to the cart!
          </AlertDescription>
        </Alert>
      )}
      <Footer></Footer>
    </>
  );
}
