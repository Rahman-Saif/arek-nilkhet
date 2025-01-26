'use client'

import React, {useState, useEffect} from 'react';
import useBooksSortByHighPrice from '../../../Hooks/Sorting/useBooksSortByHighPrice';
import useBooksSortByLowPrice from '../../../Hooks/Sorting/useBooksSortByLowPrice';
import useBooksSortByNew from '../../../Hooks/Sorting/useBooksSortByNew';
import useBooksSortByStock from '../../../Hooks/Sorting/useBooksSortByStock';
import useLocalCart from '../../../Hooks/useLocalCart';
import { addToDb } from '../../../Utilities/LocalStorage';
import Footer from '../../common/footer/Footer';
import Header from '../../common/header/Header';
import MegaMenu from '../../common/MegaMenu/MegaMenu';
import Book from './Book';
// import '../Books.css';
import Pagination from '../../Shared/Pagination/Pagination';
import { Terminal } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function Books({books, pageCount, handlePageClick, offset, displayBooks, authors, publishers}) { 

  // console.log("authorrrrrrrr tuiii",authors);
  const [sorted_books, setSortedBooks] = useState([]);
  const [filteredAuthorBooks, setFilterAuthorBooks] = useState([]);
  const [filteredPublisherBooks, setFilterPublisherBooks] = useState([]);
  const [sortedNewBooks] = useBooksSortByNew();
  const [sortedStockBooks] = useBooksSortByStock();
  const [sortedLowBooks] = useBooksSortByLowPrice();
  const [sortedHighBooks, setSortedHighBooks] = useBooksSortByHighPrice();
  const [sortingValue, setSortingValue] = useState('');
  const [filterAuthorValue, setFilterAuthorValue] = useState(0);
  const [filterPublisherValue, setFilterPublisherValue] = useState(0);
  const [CartItem, setCartItem]= useLocalCart(books);
  const [totalPageCount, setTotalPageCount] = useState(0);
  const [displayTotalBooks, setDisplayTotalBooks] = useState([]);
  const [offsetBooks, setOffsetBooks] = useState(0);
  const [showAlert, setShowAlert] = useState(false);


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
  const selectFilterByAuthor = (authorId) => {
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
      data = books.filter(book => book.author === filterAuthorValue);
      setFilterAuthorBooks(data);
      setFilterPublisherBooks([]);
    }

    if(filterPublisherValue!==0){
      data = books.filter(book => book.publisher == filterPublisherValue);
      setFilterAuthorBooks([]);
      setFilterPublisherBooks(data);
    }  

    if(sortingValue === "highest"){
      data = Array.isArray(sortedHighBooks) ? sortedHighBooks : [];
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

  }, [books, filterAuthorValue, filterPublisherValue, sortingValue, offsetBooks]);



  // handleAddToCart function
  const handleAddToCart=(book)=>{
    const newCart=[...CartItem, book];
    setCartItem(newCart);
    addToDb(book.id);
    setShowAlert(true); // Show alert when an item is added
    setTimeout(() => setShowAlert(false), 3000); 
    // alert('Book addded successfully!');
  }

  return (
    <>
      <Header />
      <MegaMenu/>
      <h4 className="text-center font-bold text-lg ">Our Books</h4>
<hr className=" w-1/4 mx-auto my-4" />
<div className="w-11/12 mx-auto  px-10 md:px-0 grid grid-cols-1 md:grid-cols-4 gap-2  ">
  {(displayBooks.length === 0 && displayTotalBooks.length === 0) && 
    <div className="h-screen"/>
        }
        {(displayBooks.length!==0 || displayTotalBooks.length!==0) && 
        <>


          <section className="filter col-span-1 mt-5 w-11/12 md:w-9/12  items-center">
  <button 
  type='button'
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
        <li key={author.id} className="p-2">
          <button
          type='button'
            className="w-full text-left hover:bg-gray-200 cursor-pointer"
            onClick={() => selectFilterByAuthor(author.id)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                selectFilterByAuthor(author.id);
              }
            }}
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
          key={publisher.id}>
            <button
            type='button'
          className="p-2 hover:bg-gray-200 cursor-pointer"
          onClick={() => selectFilterByPublisher(publisher.id)}
          title={publisher.name} >
        
          {publisher.name}
          </button>
        </li>
      ))}
    </ul>
  </div>
</div>

  </div>
</section>
          <section className="col-span-3 mt-5">
            <div className="sort-filter m-3 flex justify-end">
  <div className="sort">
    <form action="#" className="">
      <label htmlFor="sort">Sort </label>
      <select 
        id="sort"
        name="sort"
        className="bg-gray-100 p-2 rounded border border-gray-300 text-gray-700 font-medium"
        onChange={(e) => selectSort(e)}
      >
        <option 
          value="default" 
          className="text-gray-700 font-medium"
          onClick={selectDefaultFilter}
        >
          Default Sorting
        </option>
        <option value="lowest" className="text-gray-700 font-medium">Price low to high</option>
        <option value="highest" className="text-gray-700 font-medium">Price high to low</option>
        <option value="inStock" className="text-gray-700 font-medium">In stock</option>
        <option value="new" className="text-gray-700 font-medium">New arrivals</option>
      </select>
    </form>
  </div>
</div>




            <div className="container mx-auto ">
  {(sortingValue === '' && filterAuthorValue === 0 && filterPublisherValue === 0 && displayBooks?.length !== 0) && (
    <>
      {displayBooks?.length <= 4 ? (
        <div style={{ minHeight: '2500px', maxHeight: '2500px' }}>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 mx-auto">
            {displayBooks.map((book) => (
              <Book key={book.id} book={book} handleAddToCart={handleAddToCart} />
            ))}
          </div>
        </div>
      ) : (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 mx-auto">
          {displayBooks.map((book) => (
            <Book key={book.id} book={book} handleAddToCart={handleAddToCart} />
          ))}
        </div>
      )}
      <div className="container w-3/4 mx-auto mt-5">
        <Pagination pageCount={pageCount} handlePageClick={handlePageClick} offset={offset} />
      </div>
    </>
  )}

  {(filterAuthorValue !== 0 && filteredAuthorBooks?.length !== 0) && (
    <>
      {filteredAuthorBooks?.length <= 4 ? (
        <div style={{ minHeight: '1000px', maxHeight: '2500px' }}>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 mx-auto">
            {displayTotalBooks.map((book) => (
              <Book key={book.id} book={book} handleAddToCart={handleAddToCart} />
            ))}
          </div>
        </div>
      ) : (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 mx-auto">
          {displayTotalBooks.map((book) => (
            <Book key={book.id} book={book} handleAddToCart={handleAddToCart} />
          ))}
        </div>
      )}
      <div className="container w-3/4 mx-auto mt-5">
        <Pagination pageCount={totalPageCount} handlePageClick={handleTotalPageClick} offset={offsetBooks} />
      </div>
    </>
  )}

  {(filterPublisherValue !== 0 && filteredPublisherBooks?.length !== 0) && (
    <>
      {filteredPublisherBooks?.length <= 4 ? (
        <div style={{ minHeight: '1000px', maxHeight: '2500px' }}>
          <div className="w-11/12 mx-auto m-3 grid grid-cols-4 gap-4">
            {displayTotalBooks.map((book) => (
              <Book key={book.id} book={book} handleAddToCart={handleAddToCart} />
            ))}
          </div>
        </div>
      ) : (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 mx-auto">
          {displayTotalBooks.map((book) => (
            <Book key={book.id} book={book} handleAddToCart={handleAddToCart} />
          ))}
        </div>
      )}
      <div className="container w-3/4 mx-auto mt-5">
        <Pagination pageCount={totalPageCount} handlePageClick={handleTotalPageClick} offset={offsetBooks} />
      </div>
    </>
  )}

  {(sortingValue !== '' && sorted_books?.length !== 0) && (
    <>
      {sorted_books?.length <= 4 ? (
        <div style={{ minHeight: '1000px', maxHeight: '2500px' }}>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 mx-auto">
            {displayTotalBooks.map((book) => (
              <Book key={book.id} book={book} handleAddToCart={handleAddToCart} />
            ))}
          </div>
        </div>
      ) : (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 mx-auto">
          {displayTotalBooks.map((book) => (
            <Book key={book.id} book={book} handleAddToCart={handleAddToCart} />
          ))}
        </div>
      )}
      <div className=" w-full mx-auto mt-5">
        <Pagination pageCount={totalPageCount} handlePageClick={handleTotalPageClick} offset={offsetBooks} />
      </div>
    </>
  )}
</div>



          </section>
        </>
        }
      </div>
      {showAlert && (
        <Alert className="fixed bottom-4 right-4 w-96 bg-[#fac309] opacity-70 border border-green-300 rounded-lg p-4 shadow-lg">
          <Terminal className="h-4 w-4 text-white" />
          {/* <AlertTitle className="font-bold text-white">Success!</AlertTitle> */}
          <img src="/images/favicon/book-logo.png" alt="logo" className="h-4 w-4 text-white" />
          <AlertDescription className="text-white">
            Successfully added to the cart!
          </AlertDescription>
        </Alert>
      )}
      <Footer/>
    </>
  );
}
