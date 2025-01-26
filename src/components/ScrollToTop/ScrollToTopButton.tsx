'use client'
import React, {useState} from 'react';
import './ScrollToTopButton.css';

const ScrollToTopButton = ()=> {
    const [x, setX] = useState(0);

    window.addEventListener('scroll', ()=>{
        const width = window.pageYOffset;
        setX(width);
    });

    const scrollToTop = ()=>{
        window.scrollTo({
            top:0,
            behavior: 'smooth',
        })
    }

    return (
        <div className='scrollToTopBtn'>
            {
                x>300 ? 
                <button onClick={scrollToTop}><i className="fa-solid fa-angles-up"></i></button>
                :
                ''
            }
        </div>
    );
}

export default ScrollToTopButton;