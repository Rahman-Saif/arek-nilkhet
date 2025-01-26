'use client'
// import { url } from '@/app/page';
import {useEffect,useState} from 'react';
//import {url} from '../../App';


export default function useSchoolCollage() {
    const [schoolCollageBooks, setSchoolCollageBooks] = useState([]);
        const url = process.env.NEXT_PUBLIC_URL;


    useEffect(() => {
        fetch(`${url}/category-book/স্কুল-কলেজ`)
       .then(res => res.json())
       .then(result => {
        setSchoolCollageBooks(result);
       });
    }, []);

return [ schoolCollageBooks ];

}