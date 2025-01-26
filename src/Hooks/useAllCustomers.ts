'use client'

import page from '@/app/admin/page';
// import { url } from '@/app/page';
import {useEffect,useState} from 'react';
//import {url} from '../App';


export default function useAllCustomers() {
    const [customers, setCustomers] = useState([]);
    const [totalCustomer, setTotalCustomer] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [displayData, setDisplayData] = useState([]);
  const [offset, setOffset] = useState(0);
        const url = process.env.NEXT_PUBLIC_URL;


  interface PageClickEvent {
    selected: number;
  }

 const handlePageClick = (e: PageClickEvent): void => {
    const selectedPage = e.selected;
    setOffset(selectedPage * 20);
  };

    useEffect(() => {
        fetch(`${url}/api/user/?is_admin=false`)
       .then(res => res.json())
       .then(result => {
         setCustomers(result.results);
        setTotalCustomer(result.results.length);
        const pageNumber = Math.floor(result.results.length / 20) + 1;
        setPageCount(pageNumber);
        // setDisplayData(result.results.slice(offset, offset + 20 * 1));
                setDisplayData(result.results.slice(offset, (offset+(20*1))));
       });
     }, [offset]);

return [ customers,pageCount, handlePageClick, offset, displayData];


}
