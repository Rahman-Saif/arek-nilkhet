'use client'
// import { url } from '@/app/page';
import {useEffect,useState} from 'react';
//import {url} from '../../App';


export default function useEngineering() {
    const [engineeringBooks, setEngineeringBooks] = useState([]);
        const url = process.env.NEXT_PUBLIC_URL;


    useEffect(() => {
        fetch(`${url}/category-book/ইঞ্জিনিয়ারিং`)
       .then(res => res.json())
       .then(result => {
        setEngineeringBooks(result);
       });
    }, []);

return [ engineeringBooks ];

}