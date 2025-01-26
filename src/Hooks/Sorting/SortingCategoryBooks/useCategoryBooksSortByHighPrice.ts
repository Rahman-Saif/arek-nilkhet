'use client'
// import { url } from '@/app/page';
import {useEffect,useState} from 'react';
// import {url} from '../../../App';


export default function useCategoryBooksSortByHighPrice(categoryName) {
    const [sortedHighBooks, setSortedBooks] = useState([]);
        const url = process.env.NEXT_PUBLIC_URL;


    useEffect(() => {
      if(!categoryName){
        setSortedBooks([]);
      }
      else{
        fetch(`${url}/category-book/${categoryName}/?ordering=-regular_price`)
       .then(res => res.json())
       .then(result => {
        console.log("hellooo",result);
        setSortedBooks(result);
       });
      }
    }, [categoryName]);

return [ sortedHighBooks ];

}