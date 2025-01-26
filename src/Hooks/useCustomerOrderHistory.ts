'use client'

// import { url } from '@/app/page';
import {useEffect,useState} from 'react';
//import {url} from '../App';


export default function useCustomerOrderHistory() {
    const [prevOrders, setprevOrders] = useState([]);
        const url = process.env.NEXT_PUBLIC_URL;

  

    useEffect(() => {
        fetch(`${url}/all-order/{phone_number}`)
       .then(res => res.json())
       .then(result => {
        console.log('result   of orderssss   ',result);
        setprevOrders(result);
        // const pageNumber = (Math.floor(result.length/20))+1;
        // setPageCount(pageNumber);
        // setDisplayItems(result.slice(offset, (offset+(20*1))));
     });
   }, []);


return [ prevOrders ];

}