'use client'
// import { url } from '@/app/page';
import {useEffect,useState} from 'react';
// import {url} from '../../App';

export default function useBooksSortByHighPrice() {
    const [sortedHighBooks, setSortedBooks] = useState([]);
    const [totalBook, setTotalBook] = useState(0);
    const [sortedHighPageCount, setSortedHighPageCount] = useState(0);
    const [sortedHighDisplayBooks, setSortedHighDisplayBooks] = useState([]);
    const [sortedHighOffset, setsortedHighOffset] = useState(0);
        const url = process.env.NEXT_PUBLIC_URL;


    const sortedHighHandlePageClick=(e)=>{
      const selectedPage = e.selected;
      setsortedHighOffset((selectedPage+1)*2);
    }

    useEffect(() => {
        fetch(`${url}/all-product/books/?ordering=-regular_price`)
       .then(res => res.json())
       .then(result => {
         setSortedBooks(result);
         setTotalBook(result.length);
         const pageNumber = Math.ceil(result.length/2)-1;
         setSortedHighPageCount(pageNumber);
         setSortedHighDisplayBooks(result.slice(sortedHighOffset, (sortedHighOffset+2*1)))
       });
     }, [sortedHighOffset]);

return [ sortedHighBooks,  sortedHighPageCount, sortedHighHandlePageClick, sortedHighOffset, sortedHighDisplayBooks ];

}