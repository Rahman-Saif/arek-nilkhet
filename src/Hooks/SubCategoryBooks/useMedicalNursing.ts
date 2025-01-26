'use client'
// import { url } from '@/app/page';
import {useEffect,useState} from 'react';
//import {url} from '../../App';


export default function useMedicalNursing() {
    const [medicalNursingBooks, setMedicalNursingBooks] = useState([]);
        const url = process.env.NEXT_PUBLIC_URL;


    useEffect(() => {
        fetch(`${url}/category-book/মেডিকেল-নার্সিং`)
       .then(res => res.json())
       .then(result => {
        console.log("---------",result);
        setMedicalNursingBooks(result);
       });
    }, []);

return [ medicalNursingBooks ];

}