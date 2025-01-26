'use client'

// import { url } from '@/app/page';
import {useEffect,useState} from 'react';
//import {url} from '../../App';


export default function useDepartmentalChild() {
    const [deepartmentalChilds, setDepartmentalChilds] = useState([]);
        const url = process.env.NEXT_PUBLIC_URL;


    useEffect(() => {
        fetch(`${url}/api/category/?name=ডিপার্টমেন্টাল`)
       .then(res => res.json())
       .then(result => {
        setDepartmentalChilds(result.results[0].children);
       });
    }, []);

//return [ departmentalChilds ];
return [ deepartmentalChilds ];

}