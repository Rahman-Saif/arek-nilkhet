'use client'
// import { url } from '@/app/page';
import {useEffect,useState} from 'react';
// import {url} from '../../../App';


export default function usePublisherBooksSortByNew(publisherName) {
    const [sortedNewBooks, setSortedBooks] = useState([]);
        const url = process.env.NEXT_PUBLIC_URL;


    useEffect(() => {
      if(!publisherName){
        setSortedBooks([]);
      }
      else{
        fetch(`${url}/publisher-book/${publisherName}/?ordering=-updated_at`)
       .then(res => res.json())
       .then(result => {
        setSortedBooks(result);
       });
      }
    }, [publisherName]);

return [ sortedNewBooks];

}