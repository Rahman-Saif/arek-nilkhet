'use client'
// import { url } from '@/app/page';
import {useEffect,useState} from 'react';
//import {url} from '../../App';


export default function useBCSChild() {
    const [bcsChilds, setBcsChilds] = useState([]);
        const url = process.env.NEXT_PUBLIC_URL;


    useEffect(() => {
        fetch(`${url}/api/category/?name=বিসিএস-ব্যাংক`)
       .then(res => res.json())
       .then(result => {
        setBcsChilds(result.results[0].children);
       });
    }, []);

return [ bcsChilds ];

}