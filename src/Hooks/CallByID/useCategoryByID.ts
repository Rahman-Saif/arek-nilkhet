'use client'
// import { url } from '@/app/page';
import {useEffect,useState} from 'react';
// import {url} from '../../App';


export default function useCategoryByID(id) {
    const [singleCategory, setSingleCategory] = useState([]);
    const [category, setCategory] = useState('');
        const url = process.env.NEXT_PUBLIC_URL;

    
    useEffect(() => {
      if(!id){
        setSingleCategory([]);
        setCategory('');      
      }
      else{
        // fetch(`${url}/api/category/${id}`)
        fetch(`${url}/api/category/5/`)
       .then(res => res.json())
       .then(result => {
        console.log('result   -------   ',result);
         setSingleCategory(result);
         setCategory(result.name);
       });
      }
    }, [id]);

  return [ singleCategory];

}