'use client'
import BookDetail from '@/components/Books/BookDetail/BookDetail'
import useBooks from '@/Hooks/useBooks';
import useLocalCart from '@/Hooks/useLocalCart';
import useProducts from '@/Hooks/useProducts';
import { addToDb } from '@/Utilities/LocalStorage';
import { useParams } from 'next/navigation';
import React from 'react'



const page = () => {

  const params = useParams();
  const id = params.bookId;



      const  [products] = useProducts(); 
      
      const [ books, pageCount, handlePageClick, offset, displayBooks] = useBooks();
      const [CartItem, setCartItem] = useLocalCart(products);
      
      const addToCart = (product) => {
      const newCart = [...CartItem, product];
      setCartItem(newCart);
      addToDb(product.id);
  };

        // console.log("hello",id);




  return (
    <div>
        <BookDetail id={id} books={books}/>

    </div>
  )
}

export default page
