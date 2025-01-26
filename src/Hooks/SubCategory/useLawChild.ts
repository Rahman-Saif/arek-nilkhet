'use client'

// import { url } from '@/app/page';
import {useEffect,useState} from 'react';
//import {url} from '../../App';


export default function useLawChild() {
    const [lawChilds, setLawChilds] = useState([]);
        const url = process.env.NEXT_PUBLIC_URL;


    useEffect(() => {
        fetch(`${url}/api/category/?name=আইন`)
       .then(res => res.json())
       .then(result => {
        setLawChilds(result.results[0].children);
     
       });
    }, []);

return [ lawChilds ];

}