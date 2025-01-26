'use client'
// import { url } from '@/app/page';
import {useEffect,useState} from 'react';
//import {url} from '../../App';


export default function useNovelPoetry() {
    const [novelPoetryBooks, setNovelPoetryBooks] = useState([]);
        const url = process.env.NEXT_PUBLIC_URL;


    useEffect(() => {
        fetch(`${url}/category-book/গল্প-উপন্যাস-কবিতা`)
       .then(res => res.json())
       .then(result => {
        setNovelPoetryBooks(result);
       });
    }, []);

return [ novelPoetryBooks ];

}