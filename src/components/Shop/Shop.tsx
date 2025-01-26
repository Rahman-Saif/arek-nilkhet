"use client";

import React, { useState, useEffect } from "react";
import Header from "../common/header/Header";
import MegaMenu from "../common/MegaMenu/MegaMenu";
import Footer from "../common/footer/Footer";
import Home from "../SliderHome/Home";
import PopularCategory from "./Popular/PopularCategory";
import BCSBank from "./BCSBank/BCSBank";
import MedicalNursing from "./MedicalNursing/MedicalNursing";
import Law from "./Law/Law";
import Departmental from "./Departmental/Departmental";
import Authors from "./Authors/Authors";
import Publishers from "./Publishers/Publishers";
import CompetitiveExam from "./CompetitiveExam/CompetitiveExam";
import Engineering from "./Engineering/Engineering";
import BBAMBA from "./BBAMBA/BBAMBA";
import EnglishMedium from "./EnglishMedium/EnglishMedium";
import SchoolCollege from "./SchoolCollege/SchoolCollege";
import ProgrammingFreelancing from "./ProgrammingFreelancing/ProgrammingFreelancing";
import Islamic from "./Islamic/Islamic";
import NovelFictionPoetry from "./NovelFictionPoetry/NovelFictionPoetry";
import useLocalCart from "../../Hooks/useLocalCart";
import useLocalWishlist from "../../Hooks/useLocalWishlist";
import useProducts from "../../Hooks/useProducts";
import { addToDb, addToWishlist, getStoredWishlist } from "../../Utilities/LocalStorage";
import useBBAMBA from "../../Hooks/SubCategoryBooks/useBBAMBA";
import useBCSBank from "../../Hooks/SubCategoryBooks/useBCSBank";
import useCompetitiveExam from "../../Hooks/SubCategoryBooks/useCompetitiveExam";
import useDepartmental from "../../Hooks/SubCategoryBooks/useDepartmental";
import useEngineering from "../../Hooks/SubCategoryBooks/useEngineering";
import useEnglishMedium from "@/Hooks/SubCategoryBooks/useEnglishMedium";
import useIslamic from "../../Hooks/SubCategoryBooks/useIslamic";
import useLaw from "../../Hooks/SubCategoryBooks/useLaw";
import useMedicalNursing from "../../Hooks/SubCategoryBooks/useMedicalNursing";
import useNovelPoetry from "../../Hooks/SubCategoryBooks/useNovelPoetry";
import useProgramming from "../../Hooks/SubCategoryBooks/useProgramming";
import useSchoolCollage from "../../Hooks/SubCategoryBooks/useSchoolCollage";
import { Product } from "@/Hooks/useLocalCart";
import { Book } from "@/components/Books/BookDetail/BookDetail";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal } from "lucide-react";


const Shop = ({
  authors,
  publishers,
}) => {

  const [bbaMbaBooks] = useBBAMBA();
  const [bcsBooks] = useBCSBank();
  const [competitiveBooks] = useCompetitiveExam();
  const [departmentalBooks] = useDepartmental();
  const [engineeringBooks] = useEngineering();
  const [englishMediumBooks] = useEnglishMedium();
  const [islamicBooks] = useIslamic();
  const [lawBooks] = useLaw();
  const [medicalNursingBooks] = useMedicalNursing();
  const [novelPoetryBooks] = useNovelPoetry();
  const [programmingBooks] = useProgramming();
  const [schoolCollageBooks] = useSchoolCollage();
  const [products] = useProducts() as [Book[]];
  const [CartItem, setCartItem] = useLocalCart(products) as [
    Product[],
    React.Dispatch<React.SetStateAction<Product[]>>
  ];
  const [WishlistItem, setWishlistItem] = useState<Book[]>([]);
    const [showAlert, setShowAlert] = useState(false);
    const [showWishlistAlert, setShowWishlistAlert] = useState(false);


  // Load wishlist items when component mounts
  useEffect(() => {
    const storedWishlist = getStoredWishlist();
    const wishlistProducts = products.filter(product => 
      storedWishlist[product.id] !== undefined
    );
    setWishlistItem(wishlistProducts);
  }, []);

  const handleAddToCart = (book: Book) => {
    // console.log("hello 0000000000000000000");
    const newCart = [...CartItem, book];
    console.log("hello " + JSON.stringify(newCart));
    setCartItem(newCart);
    addToDb(book.id);
    setShowAlert(true); // Show alert when an item is added
    setTimeout(() => setShowAlert(false), 3000); 
  };

  const handleAddToWishlist = (book: Book) => {
    console.log('Adding book to wishlist:', book);
    
    const existingWishlist = WishlistItem.find(
      (product: Book) => String(product.id) === String(book.id)
    );

    if (!existingWishlist) {
      // Add to component state
      const newWishlist = [...WishlistItem, book];
      setWishlistItem(newWishlist);
      
      // Add to localStorage
      addToWishlist(String(book.id));  // Make sure to store ID as string
      
      console.log('Added to wishlist:', {
        bookId: book.id,
        storedWishlist: getStoredWishlist()
      });
      
      // alert("Successfully added!");
      setShowWishlistAlert(true);
      setTimeout(() => setShowWishlistAlert(false), 3000);
    } else {
      // alert("Already in wishlist!");
      setShowWishlistAlert(true);
      setTimeout(() => setShowWishlistAlert(false), 3000);
    }
  };

  return (
    <>
     
      <Header/>
      <MegaMenu/>
      <Home />
      <div className="w-11/12 mx-auto">
      <PopularCategory />
      <BCSBank
        bcsBooks={bcsBooks}
        handleAddToCart={handleAddToCart}
        handleAddToWishlist={handleAddToWishlist}
      />
      <CompetitiveExam
        competitiveBooks={competitiveBooks}
        handleAddToCart={handleAddToCart}
        handleAddToWishlist={handleAddToWishlist}
      />
      <MedicalNursing
        medicalNursingBooks={medicalNursingBooks}
        handleAddToCart={handleAddToCart}
        handleAddToWishlist={handleAddToWishlist}
      />
      <Engineering
        engineeringBooks={engineeringBooks}
        handleAddToCart={handleAddToCart}
        handleAddToWishlist={handleAddToWishlist}
      />
      <Law
        lawBooks={lawBooks}
        handleAddToCart={handleAddToCart}
        handleAddToWishlist={handleAddToWishlist}
      />
      <BBAMBA
        bbaMbaBooks={bbaMbaBooks}
        handleAddToCart={handleAddToCart}
        handleAddToWishlist={handleAddToWishlist}
      />
      <Departmental
        departmentalBooks={departmentalBooks}
        handleAddToCart={handleAddToCart}
        handleAddToWishlist={handleAddToWishlist}
      />
      <EnglishMedium
        englishMediumBooks={englishMediumBooks}
        handleAddToCart={handleAddToCart}
        handleAddToWishlist={handleAddToWishlist}
      />
      <SchoolCollege
        schoolCollageBooks={schoolCollageBooks}
        handleAddToCart={handleAddToCart}
        handleAddToWishlist={handleAddToWishlist}
      />
      <ProgrammingFreelancing
        programmingBooks={programmingBooks}
        handleAddToCart={handleAddToCart}
        handleAddToWishlist={handleAddToWishlist}
      />
      <Islamic
        islamicBooks={islamicBooks}
        handleAddToCart={handleAddToCart}
        handleAddToWishlist={handleAddToWishlist}
      />
      <NovelFictionPoetry
        novelPoetryBooks={novelPoetryBooks}
        handleAddToCart={handleAddToCart}
        handleAddToWishlist={handleAddToWishlist}
      />
      <Authors authors={authors} />
      <Publishers publishers={publishers} />
      </div>
       <Footer />
      {showAlert && (
        <Alert className="fixed bottom-4 right-4 w-96 bg-[#fac309] opacity-70 border border-green-300 rounded-lg p-4 shadow-lg">
          <Terminal className="h-4 w-4 text-white" />
          {/* <AlertTitle className="font-bold text-white">Success!</AlertTitle> */}
          <img src="/images/favicon/book-logo.png" alt="logo" className="h-4 w-4 text-white" />
          <AlertDescription className="text-white">
            Successfully added to the cart!
          </AlertDescription>
        </Alert>
      )}

      {showWishlistAlert && (
        <Alert className="fixed bottom-4 right-4 w-96 bg-[#fac309] opacity-70 border border-blue-300 rounded-lg p-4 shadow-lg">
          <Terminal className="h-4 w-4 text-black" />
          <AlertDescription className="text-black">
            Successfully added to the wishlist!
          </AlertDescription>
        </Alert>
      )}
   
    </>
  );
};

export default Shop;
