'use client'

// import { url } from '@/app/page';
import {useEffect,useState} from 'react';
// import {url} from '../App';


export default function useStationaryCategory() {
    const [stationaryCategory, setStationaryCategory] = useState({});
    const url = process.env.NEXT_PUBLIC_URL;


    useEffect(() => {
        // fetch(`${url}/api/category/?search=স্টেশনারী`)
        fetch(`${url}/api/category/?search=stationary`)
       .then(res => res.json())
       .then(result => {
        console.log("amiee result",result);
        setStationaryCategory(result.results[0]);
       });
    },[]);   

return [stationaryCategory] ;
}
