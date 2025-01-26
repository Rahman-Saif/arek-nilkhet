'use client'
// import { url } from '@/app/page';
import {useEffect,useState} from 'react';
// import {url} from '../../App';
    const url = process.env.NEXT_PUBLIC_URL;


export default function useOrderByID(id) {
    const [order, setOrder] = useState({});


    useEffect(() => {
        if(!id){
            setOrder([]);
        }
        else{
            fetch(`${url}/api/order/${id}`)
            .then(res => res.json())
            .then(result => {
                setOrder(result);
            });
        } 
    }, [id]);

return [ order];

}

