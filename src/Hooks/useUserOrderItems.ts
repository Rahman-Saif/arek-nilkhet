'use client'

// import { url } from '@/app/page';
import {useEffect,useState} from 'react';
// import {url} from '../App';

export default function useUserOrderItems(id) {
    const [orderItems, setOrderItems] = useState([]);
    const url = process.env.NEXT_PUBLIC_URL;


    useEffect(() => {
        if(!id){
            setOrderItems([]);
        }
        else{
            fetch(`${url}/api/orderItem/?order=${id}`)
            .then(res => res.json())
            .then(result => {
             setOrderItems(result.results);
            });
        }
       
    }, [id]);

return [ orderItems ];

}
