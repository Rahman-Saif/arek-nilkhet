'use client'

// import { url } from '@/app/page';
import {useEffect,useState} from 'react';
// import {url} from '../App';


export default function useStationary() {
    const [stationaries, setStationaries] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [displayItems, setDisplayItems] = useState([]);
    const [offset, setOffset] = useState(0);
    const url = process.env.NEXT_PUBLIC_URL;


    const handlePageClick=(e)=>{
        const selectedPage = e.selected;
        setOffset(selectedPage*20);
    }

    useEffect(() => {
        fetch(`${url}/all-product/stationary/`)
       .then(res => res.json())
       .then(result => {
        console.log('result   stationary   ',result);
        setStationaries(result);
        const pageNumber = (Math.floor(result.length/20))+1;
        setPageCount(pageNumber);
        setDisplayItems(result.slice(offset, (offset+(20*1))));
      });
    }, [offset]);
    console.log('hello'+stationaries);

return [ stationaries, pageCount, handlePageClick, offset, displayItems ];

}


