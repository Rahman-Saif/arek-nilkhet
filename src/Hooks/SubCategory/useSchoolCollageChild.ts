'use client'

// import { url } from '@/app/page';
import {useEffect,useState} from 'react';
//import {url} from '../../App';


export default function useSchoolCollageChild() {
    const [schoolCollageChilds, SetSchoolCollageChilds] = useState([]);
        const url = process.env.NEXT_PUBLIC_URL;


    useEffect(() => {
        fetch(`${url}/api/category/?name=স্কুল-কলেজ`)
       .then(res => res.json())
       .then(result => {
        SetSchoolCollageChilds(result.results[0].children);
       });
    }, []);

return [ schoolCollageChilds ];

}