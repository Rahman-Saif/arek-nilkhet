'use client'
// import { url } from '@/app/page';
import {useEffect,useState} from 'react';
//import {url} from '../../App';


export default function useBCSBank() {
    const [bcsBooks, setBcsBooks] = useState([]);
        const url = process.env.NEXT_PUBLIC_URL;


    useEffect(() => {
        fetch(`${url}/category-book/বিসিএস-ব্যাংক`)
       .then(res => res.json())
       .then(result => {
        console.log("bcs books",result);
          setBcsBooks(result);
       });
    }, []);

return [ bcsBooks ];

}