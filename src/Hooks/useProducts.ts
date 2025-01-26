'use client'
// import { url } from '@/app/page';
import {useEffect,useState} from 'react';
// import { Book } from '@/components/Books/BookDetail/BookDetail';
//import {url} from '../App';


export default function useProducts() {
    const [products, setProducts] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const url = process.env.NEXT_PUBLIC_URL;


    useEffect(() => {
        fetch(`https://books.xamzgg.com/api/product`)
       .then(res => res.json())
       .then(result => {
        console.log('result  yooo ',result.results);
        setProducts(result.results);
        const pageNumber = Math.ceil(result.results.length/20);
        setPageCount(pageNumber);
       });
     }, []);

return [ products, pageCount ];

}