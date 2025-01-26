'use client'
// import { url } from '@/app/page';
import {useEffect,useState} from 'react';
// import {url} from '../../App';


export default function useBookFilterByPublisher(id) {
    const [filterPublisherBooks, setFilterPublisherBooks] = useState([]);
        const url = process.env.NEXT_PUBLIC_URL;


    useEffect(() => {
      if(!id){
        setFilterPublisherBooks([]);
      }
      else{
        fetch(`${url}/all-product/books/?publisher=${id}`)
       .then(res => res.json())
       .then(result => {
        setFilterPublisherBooks(result);
       });
      }   
  }, [id]);

return [ filterPublisherBooks ];

}