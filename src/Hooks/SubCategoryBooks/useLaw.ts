'use client'
// import { url } from '@/app/page';
import {useEffect,useState} from 'react';
//import {url} from '../../App';


export default function useLaw() {
    const [lawBooks, setLawBooks] = useState([]);
        const url = process.env.NEXT_PUBLIC_URL;


    useEffect(() => {
        fetch(`${url}/category-book/আইন`)
       .then(res => res.json())
       .then(result => {
        setLawBooks(result);
       });
    }, []);

return [ lawBooks ];

}