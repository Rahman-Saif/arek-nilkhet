'use client'

// import { url } from '@/app/page';
import {useEffect,useState} from 'react';
// import {url} from '../App';

export default function useUserOrder(phone_number) {
    const [orders, setOrders] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const url = process.env.NEXT_PUBLIC_URL;


    useEffect(() => {
        if(!phone_number){
            setOrders([]);
        }
        else{
            fetch(`${url}/api/order/?ordering=-id&phone_number=${phone_number}`)
            .then(res => res.json())
            .then(result => {
                 setOrders(result.results);
                 const pageNumber = Math.ceil(result.length/20);
                 setPageCount(pageNumber);
            });
        }
       
    }, [phone_number]);

return [ orders, pageCount ];

}