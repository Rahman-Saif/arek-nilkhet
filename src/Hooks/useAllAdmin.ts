'use client'

// import { url } from '@/app/page';
import {useEffect,useState} from 'react';
//import { url } from '../App';

export default function useAllAdmin() {
    const [admins, setAdmins] = useState([]);
        const url = process.env.NEXT_PUBLIC_URL;



    useEffect(() => {
        fetch(`${url}/api/user/?is_admin=true`)
       .then(res => res.json())
       .then(result => {
        console.log("ami admin vhai",result);
         setAdmins(result.results);
       });
    }, []);

return [ admins ];

}

