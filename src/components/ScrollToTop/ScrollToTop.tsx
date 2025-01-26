'use client'
import { useRouter } from 'next/router';
import React, {useEffect} from 'react';
// import { useLocation } from 'react-router-dom';


const ScrollToTop = () => {
    const {pathname} = useRouter();

    useEffect(()=>{
        window.scrollTo(0,0);
    },[pathname]);

    return null;
}

export default ScrollToTop;