'use client'
// import { url } from '@/app/page';

import {useEffect,useState} from 'react';
//import {url} from '../../App';


export default function useIslamicChild() {
    const [islamicChilds, setIslamicChilds] = useState([]);
        const url = process.env.NEXT_PUBLIC_URL;


    useEffect(() => {
        fetch(`${url}/api/category/?name=ইসলামিক`)
       .then(res => res.json())
       .then(result => {
        setIslamicChilds(result.results[0].children);
       });
    }, []);

return [ islamicChilds ];

}