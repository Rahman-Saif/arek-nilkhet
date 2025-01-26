'use client'

// import { url } from '@/app/page';
import {useEffect,useState} from 'react';
//import { url } from '../App';

export default function useGetAreas() {
    const [areas, setAreas] = useState([]);
    const url = process.env.NEXT_PUBLIC_URL;



    useEffect(() => {
        fetch(`${url}/get-areas/`)
       .then(res => res.json())
       .then(result => {
        console.log("ami admin vhai",result);
         setAreas(result);
       });
    }, []);

return [ areas ];

}

