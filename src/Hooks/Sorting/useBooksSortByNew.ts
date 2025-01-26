'use client'
// import { url } from '@/app/page';
import {useEffect,useState} from 'react';
// import {url} from '../../App';


export default function useBooksSortByNew() {
    const [sortedNewBooks, setSortedBooks] = useState([]);
        const url = process.env.NEXT_PUBLIC_URL;


    useEffect(() => {
        fetch(`${url}/all-product/books/?ordering=-updated_at`)
       .then(res => res.json())
       .then(result => {
        setSortedBooks(result);
       });
    }, []);

return [ sortedNewBooks ];

}