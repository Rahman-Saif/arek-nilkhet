'use client'
// import { url } from '@/app/page';
import {useEffect,useState} from 'react';
// import {url} from '../../../App';


export default function useAuthorBooksSortByNew(authorName) {
    const [sortedNewBooks, setSortedBooks] = useState([]);
        const url = process.env.NEXT_PUBLIC_URL;


    useEffect(() => {
      if(!authorName){
        setSortedBooks([]);
      }
      else{
        fetch(`${url}/author-book/${authorName}/?ordering=-updated_at`)
       .then(res => res.json())
       .then(result => {
        setSortedBooks(result);
       });
      }
    }, [authorName]);

return [ sortedNewBooks ];

}