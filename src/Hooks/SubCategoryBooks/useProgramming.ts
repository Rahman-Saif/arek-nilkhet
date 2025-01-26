'use client'
// import { url } from '@/app/page';
import {useEffect,useState} from 'react';
//import {url} from '../../App';


export default function useProgramming() {
    const [programmingBooks, setProgrammingBooks] = useState([]);
        const url = process.env.NEXT_PUBLIC_URL;


    useEffect(() => {
        fetch(`${url}/category-book/প্রোগ্রামিং-ফ্রিল্যান্সিং`)
       .then(res => res.json())
       .then(result => {
        setProgrammingBooks(result);
       });
    }, []);

return [ programmingBooks ];

}