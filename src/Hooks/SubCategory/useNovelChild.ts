'use client'

// import { url } from '@/app/page';
import {useEffect,useState} from 'react';
//import {url} from '../../App';


export default function useNovelChild() {
    const [novelChilds, setNovelChilds] = useState([]);
        const url = process.env.NEXT_PUBLIC_URL;


    useEffect(() => {
        fetch(`${url}/api/category/?name=গল্প-উপন্যাস-কবিতা`)
       .then(res => res.json())
       .then(result => {
        setNovelChilds(result.results[0].children);
 
       });
     }, []);

return [ novelChilds ];

}