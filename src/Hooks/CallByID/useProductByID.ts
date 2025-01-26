'use client'
// import { url } from '@/app/page';
import {useEffect,useState} from 'react';
// import {url} from '../../App';


export default function useProductByID(id) {
    const [product, setProduct] = useState({});
        const url = process.env.NEXT_PUBLIC_URL;



    useEffect(() => {
        if(!id){
            setProduct([]);
        }
         else{
            fetch(`${url}/api/product/${id}/`)
            .then(res => res.json())
            .then(result => {
             setProduct(result);
             });
         }
    }, [id]);

return [ product];

}

