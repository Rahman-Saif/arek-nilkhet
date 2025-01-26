'use client'
// import { url } from '@/app/page';
import {useEffect,useState} from 'react';
// import {url} from '../../App';

export default function useAuthorByID(id) {
    const [author, setAuthor] = useState([]);
        const url = process.env.NEXT_PUBLIC_URL;


    useEffect(() => {
      if(!id){
        setAuthor([]);
      }
      else{
        // fetch(`${url}/api/author/${id}`)
        fetch(`${url}/api/author/${id}`)
        .then(res => res.json())
        .then(result => {
          setAuthor(result);
        });
      }
    }, [id]);

return [ author];

}

