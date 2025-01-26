'use client'

// import { url } from '@/app/page';
import {useEffect,useState} from 'react';
//import {url} from '../App';


export default function useAllOrders() {
    const [orders, setOrders] = useState([]);
    const [pageCount, setPageCount] = useState(0);
        const url = process.env.NEXT_PUBLIC_URL;


        //  const [pageCount, setPageCount] = useState(0);
        // const url = process.env.NEXT_PUBLIC_URL;

          const [totalorders, setTotalOrders] = useState(0);
//   const [pageCount, setPageCount] = useState(0);
  const [displayData, setDisplayData] = useState([]);
  const [offset, setOffset] = useState(0);
    //   const url = process.env.NEXT_PUBLIC_URL;


  interface PageClickEvent {
    selected: number;
  }

  const handlePageClick = (e: PageClickEvent): void => {
    const selectedPage = e.selected;
    setOffset(selectedPage * 20);
  };




    useEffect(() => {
        fetch(`${url}/api/order/?ordering=-id`)
       .then(res => res.json())
       .then(result => {
         console.log("amiiiiiiiiiiiii",result);
         setOrders(result.results);
         const pageNumber = Math.ceil(result.results.length/20);
         setPageCount(pageNumber);


        //   console.log("amiiiiiiiiiiiii",result);
        //  setOrders(result);
        //  const pageNumber = Math.ceil(result.length/20);
        //  setPageCount(pageNumber);

          setTotalOrders(result.results.length);
        // setPageCount(pageNumber);
                setDisplayData(result.results.slice(offset, (offset+(20*1))));
       });
    }, [offset]);

return [ orders, pageCount,handlePageClick,offset,displayData ];

}

