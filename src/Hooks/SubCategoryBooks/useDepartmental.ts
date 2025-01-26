'use client'
// import { url } from '@/app/page';
import {useEffect,useState} from 'react';
//import {url} from '../../App';


export default function useDepartmental() {
    const [departmentalBooks, setDepartmentalBooks] = useState([]);
        const url = process.env.NEXT_PUBLIC_URL;


    useEffect(() => {
        fetch(`${url}/category-book/ডিপার্টমেন্টাল`)
       .then(res => res.json())
       .then(result => {
        setDepartmentalBooks(result);
       });
    }, []);

return [ departmentalBooks ];

}