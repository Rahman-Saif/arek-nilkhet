'use client'

// import { url } from '@/app/page';
import {useEffect,useState} from 'react';
// import {url} from '../App';


export default function useElectronicCategory() {
    const [electronicCategory, setElectronicCategory] = useState({});
        const url = process.env.NEXT_PUBLIC_URL;


    useEffect(() => {
        // fetch(`${url}/api/category/?search=ইলেক্ট্রনিক্স`)
        fetch(`${url}/api/category/?search=electronics`)
       .then(res => res.json())
       .then(result => {
        console.log("areh vhaiiii",result);
        setElectronicCategory(result.results[0]);
       });
    },[]);   

return [electronicCategory] ;
}
