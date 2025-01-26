'use client'
// import { url } from '@/app/page';
import {useEffect,useState} from 'react';
// import {url} from '../../../App';


export default function useElectronicsSortByHighPrice() {
    const [sortedHighItem, setSortedItems] = useState([]);
        const url = process.env.NEXT_PUBLIC_URL;


    useEffect(() => {
        fetch(`${url}/all-product/electronics/?ordering=-regular_price`)
       .then(res => res.json())
       .then(result => {
        setSortedItems(result);
       });
    }, []);

return [ sortedHighItem ];

}