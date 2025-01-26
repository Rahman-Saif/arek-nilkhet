'use client'

// import { url } from '@/app/page';
import {useEffect,useState} from 'react';
//import {url} from '../../App';


export default function useCompetitiveChild() {
    const [competitiveChilds, setCompetitiveChilds] = useState([]);
        const url = process.env.NEXT_PUBLIC_URL;


    useEffect(() => {
        fetch(`${url}/api/category/?name=কম্পিটিটিভ-এক্সাম`)
       .then(res => res.json())
       .then(result => {
        setCompetitiveChilds(result.results[0].categories);
        
       });
    }, []);

return [ competitiveChilds ];

}