'use client'

// import { url } from '@/app/page';
import {useEffect,useState} from 'react';
//import {url} from '../../App';


export default function useEngineeringChild() {
    const [engineeringChilds, setEngineeringChilds] = useState([]);
        const url = process.env.NEXT_PUBLIC_URL;


    useEffect(() => {
      fetch(`${url}/api/category/?name=ইঞ্জিনিয়ারিং`)
       .then(res => res.json())
       .then(result => {
        setEngineeringChilds(result.results[0].categories);
       });
    }, []);

return [ engineeringChilds ];

}