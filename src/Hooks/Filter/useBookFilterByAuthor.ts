'use client'
// import { url } from '@/app/page';
import {useEffect,useState} from 'react';
// import {url} from '../../App';


export default function useBookFilterByAuthor(authorName) {
    const [filterAuthorBooks, setFilterAuthorBooks] = useState([]);
    const [totalBook, setTotalBook] = useState(0);
    const [authorPageCount, setPageCount] = useState(0);
    const [displayAuthorBooks, setDisplayBooks] = useState([]);
    const [offsetAuthor, setOffset] = useState(0);
        const url = process.env.NEXT_PUBLIC_URL;


    const handleAuthorPageClick=(e)=>{
      const selectedPage = e.selected;
      setOffset(selectedPage*20);
    }

    useEffect(() => {
      if(!authorName){
        setFilterAuthorBooks([]);
      }
      else{
        fetch(`${url}/author-book/${authorName}/`)
        .then(res => res.json())
        .then(result => {
         setFilterAuthorBooks(result);
         setTotalBook(result.length);
         const pageNumber = (Math.floor(result.length/20))+1;
         setPageCount(pageNumber);
         setDisplayBooks(result.slice(offsetAuthor, (offsetAuthor+(20*1))));
        });
      }    
    }, [authorName, offsetAuthor]);

return [ filterAuthorBooks, authorPageCount, handleAuthorPageClick, offsetAuthor, displayAuthorBooks ];

}