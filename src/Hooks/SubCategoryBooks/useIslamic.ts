'use client'
// import { url } from '@/app/page';
import {useEffect,useState} from 'react';
//import {url} from '../../App';


export default function useIslamic() {
    const [islamicBooks, setIslamicBooks] = useState([]);
        const url = process.env.NEXT_PUBLIC_URL;


    useEffect(() => {
        fetch(`${url}/category-book/ইসলামিক`)
       .then(res => res.json())
       .then(result => {
        setIslamicBooks(result);
       });
    }, []);

return [ islamicBooks ];

}