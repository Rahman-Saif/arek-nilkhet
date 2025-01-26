'use client'
// import { url } from '@/app/page';
import {useEffect,useState} from 'react';
//import {url} from '../App';


export default function usePublishers() {
    const [publishers, setPublishers] = useState([]);
    const [totalPublisher, setTotalPublisher] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const [displayData, setDisplayData] = useState([]);
    const [offset, setOffset] = useState(0);
    const url = process.env.NEXT_PUBLIC_URL;


    const handlePageClick=(e)=>{
      const selectedPage = e.selected;
      setOffset(selectedPage*20);
    }

    useEffect(() => {
        fetch(`${url}/api/publisher/`)
       .then(res => res.json())
       .then(result => {
        // console.log("vhai ami publisher",result);
        setPublishers(result.results)
        setTotalPublisher(result.results.length);
        const pageNumber = (Math.floor(result.results.length/20))+1;
        setPageCount(pageNumber);
        setDisplayData(result.results.slice(offset, (offset+(20*1))));
       });
     }, [offset]);

return [ publishers, pageCount, handlePageClick, offset, displayData];

}



