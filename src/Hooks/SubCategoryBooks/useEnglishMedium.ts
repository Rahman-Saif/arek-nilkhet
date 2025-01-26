'use client'
// import { url } from '@/app/page';
import {useEffect,useState} from 'react';
//import {url} from '../../App';


export default function useEnglishMedium() {
    const [englishMediumBooks, setEnglishMediumBooks] = useState([]);
        const url = process.env.NEXT_PUBLIC_URL;


    useEffect(() => {
        fetch(`${url}/category-book/ইংলিশ-মিডিয়াম`)
       .then(res => res.json())
       .then(result => {
        setEnglishMediumBooks(result);
       });
    }, []);

return [ englishMediumBooks ];

}