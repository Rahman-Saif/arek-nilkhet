'use client'

// import { url } from '@/app/page';
import {useEffect,useState} from 'react';
//import {url} from '../App';


export default function useAllCategories() {
    const [categories, setCategories] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [displayData, setDisplayData] = useState([]);
    const [offset, setOffset] = useState(0);
        const url = process.env.NEXT_PUBLIC_URL;

    
    const handlePageClick=(e)=>{
      const selectedPage = e.selected;
      setOffset(selectedPage*20);
    }

    useEffect(() => {
        fetch(`${url}/api/category/`)
       .then(res => res.json())
       .then(result => {
         setCategories(result.results);
         const pageNumber = (Math.floor(result.results.length/20))+1;
         setPageCount(pageNumber);
         setDisplayData(result.results.slice(offset, (offset+(20*1))));
       });
    },[offset]);   

return [ categories, pageCount, handlePageClick, offset, displayData];
}
