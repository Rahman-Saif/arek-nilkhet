'use client'
// import { url } from '@/app/page';
import {useEffect,useState} from 'react';
//import {url} from '../../App';


export default function useCompetitiveExam() {
    const [competitiveBooks, setCompetitiveBooks] = useState([]);
        const url = process.env.NEXT_PUBLIC_URL;


    useEffect(() => {
        fetch(`${url}/category-book/কম্পিটিটিভ-এক্সাম`)
       .then(res => res.json())
       .then(result => {
        setCompetitiveBooks(result);
       });
    }, []);

return [ competitiveBooks ];

}