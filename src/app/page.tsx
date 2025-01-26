'use client'
import Authors from "@/components/Shop/Authors/Authors";
import Publishers from "@/components/Shop/Publishers/Publishers";
// import Shop from "@/components/Shop/Shop";
import Image from "next/image";
import useAuthors from '@/Hooks/useAuthors';
import usePublishers from '@/Hooks/usePublishers';
import dynamic from 'next/dynamic';

const Shop = dynamic(() => import('@/components/Shop/Shop'), { ssr: false });


export default function Home() {
  const [authors]=useAuthors();
  const [publishers]=usePublishers();
  return (
    <main className="">
      
      <Shop authors={authors} publishers={publishers}></Shop>
    </main>
  );
}
