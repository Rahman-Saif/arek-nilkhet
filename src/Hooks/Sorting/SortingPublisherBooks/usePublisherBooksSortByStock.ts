'use client'
// import { url } from '@/app/page';
import {useEffect,useState} from 'react';
// import {url} from '../../../App';


export default function usePublisherBooksSortByStock(publisherName) {
    const [sortedStockBooks, setSortedBooks] = useState([]);
        const url = process.env.NEXT_PUBLIC_URL;


    useEffect(() => {
      if(!publisherName){
        setSortedBooks([]);
      }
      else{
        fetch(`${url}/publisher-book/${publisherName}/?ordering=-units_stock`)
       .then(res => res.json())
       .then(result => {
        setSortedBooks(result);
       });
      } 
    }, [publisherName]);

return [ sortedStockBooks ];

}