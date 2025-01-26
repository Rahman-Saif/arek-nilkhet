'use client'

// import { url } from '@/app/page';
import {useEffect,useState} from 'react';
//import {url} from '../App';


export default function useBooks() {
    const [books, setBooks] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [displayBooks, setDisplayBooks] = useState([]);
    const [offset, setOffset] = useState(0);
const url = process.env.NEXT_PUBLIC_URL;


    const handlePageClick=(e)=>{
      const selectedPage = e.selected;
      setOffset(selectedPage*20);
    }

    useEffect(() => {
      fetch(`${url}/all-product/books/`)
       .then(res => res.json())
       .then(result => {
        console.log("allbooksss",result);
         setBooks(result);
         const pageNumber = (Math.floor(result.length/20))+1;
         setPageCount(pageNumber);
         setDisplayBooks(result.slice(offset, (offset+(20*1))));
       });
    }, [ offset]);

return [ books, pageCount, handlePageClick, offset, displayBooks];

}