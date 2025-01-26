'use client'
// import { url } from '@/app/page';
import {useEffect,useState} from 'react';
// import {url} from '../../App';


export default function usePublisherByID(id) {
    const [publisher, setPublisher] = useState([]);
        const url = process.env.NEXT_PUBLIC_URL;


    useEffect(() => {
      if(!id){
        setPublisher([]);
      }
      else{
        fetch(`${url}/api/publisher/${id}`)
        .then(res => res.json())
        .then(result => {
          setPublisher(result);
        });
      }
    }, [id]);

return [ publisher];

}

