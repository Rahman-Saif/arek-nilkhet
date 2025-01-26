'use client'

// import { url } from '@/app/page';
import {useEffect,useState} from 'react';
//import {url} from '../../App';


export default function useProgrammingChild() {
    const [programmingChilds, setProgrammingChilds] = useState([]);
        const url = process.env.NEXT_PUBLIC_URL;


    useEffect(() => {
        fetch(`${url}/api/category/?name=প্রোগ্রামিং-ফ্রিল্যান্সিং`)
       .then(res => res.json())
       .then(result => {
        setProgrammingChilds(result.results[0].children);
       });
    }, []);

return [ programmingChilds ];

}