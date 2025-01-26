'use client'

// import { url } from '@/app/page';
import {useEffect,useState} from 'react';
// import {url} from '../App';


export default function useLogos() {
    const [logos, setLogos] = useState([]);
    const [count, setCount] = useState([0]);
    const url = process.env.NEXT_PUBLIC_URL;



    useEffect(() => {
        fetch(`${url}/api/logo/`)
       .then(res => res.json())
       .then(result => {
        console.log("ami logo vhai",result);
         setLogos(result)
         setCount(result.length);
       });
     }, []);

return [ logos, count ];

}

