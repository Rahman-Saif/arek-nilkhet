'use client'
// import { url } from '@/app/page';
import {useEffect,useState} from 'react';
//import {url} from '../../App';


export default function useEnglishMediumChild() {
    const [englishMediumChilds, setEnglishMediumChilds] = useState([]);
        const url = process.env.NEXT_PUBLIC_URL;


    useEffect(() => {
        fetch(`${url}/api/category/?name=ইংলিশ-মিডিয়াম`)
        .then(res => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        })
        .then(result => {
            setEnglishMediumChilds(result.results[0].categories); 
        })
        .catch(error => console.error('Error fetching data:', error)); 
}, []);

return [ englishMediumChilds ];

}