'use client'
import CategoryDetails from '@/components/CategoryPage/CategoryDetails/CategoryDetails'
import useAuthors from '@/Hooks/useAuthors';
import useLocalCart from '@/Hooks/useLocalCart';
import useProducts from '@/Hooks/useProducts';
import usePublishers from '@/Hooks/usePublishers';
import { addToDb } from '@/Utilities/LocalStorage';
import React from 'react'
import { useParams } from 'next/navigation';

const Page = () => {
    const [products] = useProducts();
    const [CartItem, setCartItem] = useLocalCart(products);
    const [authors] = useAuthors();
    const [publishers] = usePublishers();
    const params = useParams();
    const categoryNameParam = Array.isArray(params.categoryName) ? params.categoryName[0] : params.categoryName;
    const categoryName = decodeURIComponent(categoryNameParam);
    

    const addToCart = (product) => {
        const newCart = [...CartItem, product];
        setCartItem(newCart);
        addToDb(product.id);
    };

    
    console.log("categoryName",categoryName);

    return (
        <div>
            <CategoryDetails categoryName={categoryName}   authors={authors} publishers={publishers}></CategoryDetails>
        </div>
    );
};

export default Page;
