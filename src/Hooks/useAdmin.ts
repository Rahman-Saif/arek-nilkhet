'use client'

// import { url } from '@/app/page';
import {useEffect,useState} from 'react';
//import {url} from '../App';


export default function useAdmin(phone_number:string) {
    const [admin, setAdmin] = useState([]);
        const url = process.env.NEXT_PUBLIC_URL;


    useEffect(() => {
      if(!phone_number){
        setAdmin([]);
        return ;
      }
      
      else{
        fetch(`${url}/api/user/?is_admin=true&phone_number=${phone_number}`)
        .then(res => res.json())
        .then(result => {
          setAdmin(result);
        });
      }
    }, [phone_number]);

return [ admin ];

}

