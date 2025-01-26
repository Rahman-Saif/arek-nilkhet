'use client'
// import { url } from '@/app/page';
import {useEffect,useState} from 'react';
// import {url} from '../../../App';


export default function useCategoryBooksSortByNew(categoryName) {
    const [sortedNewBooks, setSortedBooks] = useState([]);
        const url = process.env.NEXT_PUBLIC_URL;


    useEffect(() => {
      if(!categoryName){
        setSortedBooks([]);
      }
      else{
        fetch(`${url}/category-book/${categoryName}/?ordering=-updated_at`)
       .then(res => res.json())
       .then(result => {
        setSortedBooks(result);
       });
      } 
    }, [categoryName]);

return [ sortedNewBooks ];

}