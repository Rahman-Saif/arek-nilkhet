'use client'
// import { url } from '@/app/page';
import {useEffect,useState} from 'react';
// import {url} from '../../../App';


export default function useAuthorBooksSortByStock(authorName) {
    const [sortedStockBooks, setSortedBooks] = useState([]);
        const url = process.env.NEXT_PUBLIC_URL;


    useEffect(() => {
      if(!authorName){
        setSortedBooks([]);
      }
      else{
        fetch(`${url}/author-book/${authorName}/?ordering=-units_stock`)
       .then(res => res.json())
       .then(result => {
        setSortedBooks(result);
       });
      }
    }, [authorName]);

return [ sortedStockBooks ];

}