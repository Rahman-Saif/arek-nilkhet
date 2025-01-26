'use client'

// import { url } from '@/app/page';
import {useEffect,useState} from 'react';
//import {url} from '../../App';


export default function useMedicalChild() {
    const [medicalNursingChilds, setMedicalNursingChilds] = useState([]);
        const url = process.env.NEXT_PUBLIC_URL;


    useEffect(() => {
        fetch(`${url}/api/category/?name=মেডিকেল-নার্সিং`)
       .then(res => res.json())
       .then(result => {
        setMedicalNursingChilds(result.results[0].children);
  
       });
    }, []);

return [ medicalNursingChilds ];

}