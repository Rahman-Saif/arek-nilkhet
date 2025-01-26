'use client'
// import { url } from '@/app/page';
import {useEffect,useState} from 'react';
// import {url} from '../../App';


export default function useBookSearchByTitle(title) {
  const [books, setBooks] = useState([]);
      const url = process.env.NEXT_PUBLIC_URL;



  useEffect(() => {
    if(!title){
      setBooks([]);
    }
    else{
    fetch(`${url}/all-product/books/?search=${title}`)
      .then(res => res.json())
      .then(result => {
        setBooks(result);
      });
    }
  }, [title]);

  return [ books ];
}