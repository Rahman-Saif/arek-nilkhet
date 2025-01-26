'use client'

// import { url } from '@/app/page';
import {useEffect,useState} from 'react';
//import {url} from '../App';

export default function useCategoryAllBooks(categoryName) {
    const [books, setCategoryBooks] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [displayBooks, setDisplayBooks] = useState([]);
    const [offset, setOffset] = useState(0);
        const url = process.env.NEXT_PUBLIC_URL;


    const handlePageClick=(e)=>{
      const selectedPage = e.selected;
      setOffset(selectedPage*20);
    }
    useEffect(() => {
      const fetchBooks = async () => {
        if(!categoryName){
          setCategoryBooks([]);
        }
        else {
          try {
            const response = await fetch(`${url}/category-all-book/${categoryName}/`);
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();
            
            const books = result;
            console.log("category er under e books",books);
            setCategoryBooks(books);
            const pageNumber = Math.floor(books.length/20) + 1;
            setPageCount(pageNumber);
            setDisplayBooks(books.slice(offset, offset + 20));
          } catch (error) {
            console.error('Error fetching category books:', error);
            // Optionally set error state or handle error case
            setCategoryBooks([]);
            setPageCount(0);
            setDisplayBooks([]);
          }
        }
      };

      fetchBooks();
    }, [categoryName, offset]);

    return [ books, pageCount, handlePageClick, offset, displayBooks];

}