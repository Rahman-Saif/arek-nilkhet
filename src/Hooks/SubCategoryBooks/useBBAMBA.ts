'use client'
// import { url } from '@/app/page';
import {useEffect,useState} from 'react';
//import {url} from '../../App';


export default function useBBAMBA() {
    const [bbaMbaBooks, setBbaMbaBooks] = useState([]);
        const url = process.env.NEXT_PUBLIC_URL;


    useEffect(() => {
        fetch(`${url}/category-book/বিবিএ-এমবিএ`)
       .then(res => res.json())
       .then(result => {
        console.log('result   nooo   ',result);
        setBbaMbaBooks(result);

    
        
       });
    }, []);

return [ bbaMbaBooks ];

}