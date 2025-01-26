"use client";
// import { url } from "@/app/page";
import { useEffect, useState } from "react";
//import  {url}  from '../App';

export default function useAuthors() {
  const [authors, setAuthors] = useState([]);
  const [totalAuthor, setTotalAuthor] = useState(0);
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
    fetch(`${url}/api/author/`)
      .then((res) => res.json())
      .then((result) => {
        console.log("hello vhaya", result.results);
        setAuthors(result.results);
        setTotalAuthor(result.results.length);
        const pageNumber = Math.floor(result.results.length / 20) + 1;
        setPageCount(pageNumber);
                setDisplayData(result.results.slice(offset, (offset+(20*1))));

      });
  }, [offset]);

  return [authors, pageCount, handlePageClick, offset, displayData];
}
