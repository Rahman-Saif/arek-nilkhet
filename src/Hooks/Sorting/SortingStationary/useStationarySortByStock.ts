'use client'
// import { url } from '@/app/page';
import {useEffect,useState} from 'react';
// import {url} from '../../../App';


export default function useStationarySortByStock() {
    const [sortedStockItems, setSortedItems] = useState([]);
        const url = process.env.NEXT_PUBLIC_URL;


    useEffect(() => {
        fetch(`${url}/all-product/stationary/?ordering=-units_stock`)
       .then(res => res.json())
       .then(result => {
        setSortedItems(result);
       });
     }, []);

return [ sortedStockItems ];

}