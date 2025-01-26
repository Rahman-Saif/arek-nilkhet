'use client'

// import { url } from '@/app/page';
import {useEffect,useState} from 'react';
//import {url} from '../App';


export default function useBanners() {
    const [banners, setBanners] = useState([]);
    const [totalBanner, setTotalBanner] = useState(0);
    const [pageCount, setPageCount] = useState(0);
        const url = process.env.NEXT_PUBLIC_URL;


    useEffect(() => {
        fetch(`${url}/api/banner/`)
       .then(res => res.json())
       .then(result => {
        console.log("banner er result",result);
         setBanners(result)
         setTotalBanner(result.length);
         const pageNumber = Math.ceil(result.length/20);
         setPageCount(pageNumber);
       });
    }, []);

return [ banners, pageCount];

}

