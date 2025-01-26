"use client"
// import { url } from '@/app/page';
import {useEffect,useState} from 'react';
//import {url} from '../../App';


export default function useBBAMBAChild() {
    const [bbaMbaChilds, setBbaMbaChilds] = useState([]);
        const url = process.env.NEXT_PUBLIC_URL;


    useEffect(() => {
        fetch(`${url}/api/category/?name=বিবিএ-এমবিএ`)
       .then(res => res.json())
       .then(result => {
        setBbaMbaChilds(result.results[0].children);
       });
    }, []);

return [ bbaMbaChilds ];

}