"use client";
import React from "react";
import logo from "../../assets/images/book-logo.png";
import {
  FaBook,
  FaRegHeart,
  FaSearch,
  FaShoppingBag,
  FaUserPlus,
} from "react-icons/fa";
import { BiCategory } from "react-icons/bi";

import {
  getStoredCart,
  getStoredWishlist,
} from "../../../Utilities/LocalStorage";
import { useState, useEffect } from "react";
import useAdmin from "../../../Hooks/useAdmin";
import useAuthors from "../../../Hooks/useAuthors";
// import { url } from "@/app/page";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Book from "@/components/Books/Book/Book";
import { MdLocalLibrary, MdLogout } from "react-icons/md";
import usePublishers from "@/Hooks/usePublishers";
import { FiUser } from "react-icons/fi";

const Search = () => {
  const [title, setTitle] = useState("");
  const [searchBooks, setSearchBooks] = useState<Book[]>([]);
  const [result, setResults] = useState(0);
          const url = process.env.NEXT_PUBLIC_URL;


  // rahman saif - this imports was from their react.js repo
  // const user = JSON.parse(localStorage?.getItem('user'));
  const [admin, setAdmin] = useState([]);
  const userPhoneNumber = typeof window !== "undefined" 
    ? JSON.parse(typeof window!==undefined && window.localStorage?.getItem("user") || '{}')?.phone_number 
    : null;
  
  const [adminData] = useAdmin(userPhoneNumber);

  useEffect(() => {
    if (userPhoneNumber) {
      setAdmin(adminData);
    }
  }, [adminData, userPhoneNumber]);

  //this imports are used for localstorage in next js
  const [cartLength, setCartLength] = useState(0);
  const [wishlistLength, setWishlistLength] = useState(0);
  const [authors] = useAuthors();
  const [publishers] = usePublishers();

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(typeof window!==undefined && window.localStorage.getItem("token"));
  // const [admin, setAdmin] = useState([]);

  //location redirect
  const history = useRouter();
  const location = useRouter();
  const pathname = usePathname();

  // for cart
  // const cart_length = Object.keys(getStoredCart()).length;

  // // for wishlist
  // const wishlist_length = Object.keys(getStoredWishlist()).length;

  // useEffect(()=>{
  //   setCartLength(cart_length);
  //   setWishlistLength(wishlist_length);
  // },[cart_length, wishlist_length]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const storedUserString =typeof window!==undefined && window.localStorage.getItem("user");
        const storedUser = storedUserString ? JSON.parse(storedUserString) : null;
        
        if (storedUser) {
          setUser(storedUser);
          setToken(typeof window!==undefined && window.localStorage.getItem("token"));
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
        setUser(null);
      }
    }
  }, []);

  // handle focusOut function
  const handleFocusOut = () => {
    setTitle("");
  };

  // searching function
  useEffect(() => {
    if (title === "") {
      setSearchBooks([]);
      setResults(0);
    } else {
      // fetch(`${url}/product-filtering/?q=${encodeURIComponent(title)}`)
      // fetch(`${url}/product-filtering/?search=${encodeURIComponent(title)}`)
      fetch(`${url}/product-search-filter/?q=${encodeURIComponent(title)}`)
      // https://books.xamzgg.com/product-search-filter/?q=bcs
        .then((res) => res.json())
        .then((result) => {
          if (result.length === 0) {
            setResults(1);
          } else {
            setResults(2);
            setSearchBooks(result?.slice(0, 20));
          }
        });
    }
  }, [title]);

  //logout function
  const logout = () => {
   typeof window!==undefined && window.localStorage.removeItem("user");
   typeof window!==undefined && window.localStorage.removeItem("token");
    fetch(`${url}/logout/`, {
      method: "POST",
      headers: {
        Authorization: "Token " + token,
      },
    }).then(() => {
      if (pathname === "/") {
        history.push("/");
      } else {
        history.push("/");
      }
    });
  };

  return (
    <>
      <section className="bg-gray-50 py-5 mx-auto ">
        <div className=" w-11/12 md:w-3/5 container mx-auto flex flex-col md:flex-row justify-center items-center" 
             onMouseLeave={handleFocusOut}>
          
          {/* Logo section */}
          <div className="w-3/4 md:w-2/12 flex flex-start ml-[-50px] md:ml-0">
            <Link href="/">
              <Image
                src={logo}
                height={70}
                width={85}
                alt="Nilkhet boi ghor logo"
              />
            </Link>
          </div>

          {/* Search section */}
          <div className="relative w-9/12  lg:w-full md:w-5/12 flex justify-center items-center my-3  md:my-0 z-10 ml-[-50px] md:ml-8">
            {/* Search input */}
            <div className="w-full  flex items-center justify-center gap-4 p-3 border border-gray-400 rounded-full">
              <FaSearch className="ml-4" />
              <input
                type="text"
                value={title}
                className="w-3/4 text-base focus:outline-none bg-transparent"
                placeholder="Search by Book, Author, Publisher, Category"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* Search results dropdown */}
            {title !== "" && result !== 0 && (
              <div className="absolute top-12 left-0 w-3/4 md:w-full ">
                {result === 1 ? (
                  <div className="bg-white border rounded p-2">
                    <p className="font-bold text-sm">Sorry, No result found!</p>
                  </div>
                ) : (
                  <div className={`bg-white border rounded w-full  ${
                    searchBooks?.length >= 4 ? '' : 'overflow-x-auto'
                  }`}>
                    {searchBooks?.length >= 4 ? (
                      <ul className="list-none w-full divide-y divide-gray-100">
                        {searchBooks.map((item) => (
                          <li key={item.id} className="flex p-2 hover:bg-gray-50">
                            <div className="flex w-full items-center  px-4">
                              <div className="w-2/12 md:w-3/12">
                                <Link href={`/books/${item?.id ?? ""}`} className="block">
                                  <Image src={item.image} className="h-10 w-auto object-contain" alt={item.english_title} height={40} width={40} />
                                </Link>
                              </div>
                              <div className="w-7/12 text-left space-y-1">
                                <Link href={`/books/${item?.id}`} className="hover:text-blue-600 flex items-center gap-2">
                                <FaBook  />

                                  {item.english_title}
                                </Link>
                              
                                {authors.map((author) => 
                                  author.id === item.author && (
                                    <div key={author.id} className="text-gray-500 text-sm flex  items-center gap-2">
                                      <FiUser />

                                      {author.name}
                                    </div>
                                  )
                                )}
                                {publishers.map((publisher) => 
                                  publisher.id === item.publisher && (
                                    <div key={publisher.id} className="text-gray-500 text-sm flex  items-center gap-2">
                                      <MdLocalLibrary />

                                      {publisher.name}
                                    </div>
                                  )
                                )}
                                  <Link href={`/categories/${item?.id}`} className="hover:text-blue-600 flex items-center gap-2">
                                  <BiCategory />

                                  {item.category_name}
                                </Link>
                              </div>
                              <div className="w-3/12 text-right font-medium">
                                {item?.regular_price && item?.discount_price ? (
                                  <>
                                    <span className="line-through text-red-500">
                                      {item.regular_price} টাকা
                                    </span>
                                    <span className="ml-2 ">
                                      {item.discount_price} টাকা
                                    </span>
                                  </>
                                ) : (
                                  <span>
                                    {item?.regular_price || item?.discount_price} টাকা
                                  </span>
                                )}
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) 
                    
                    
                    : (
//                      <table className="w-full text-center table-auto divide-y divide-gray-100">
//   <tbody>
//     {searchBooks?.map((item) => (
//       <tr key={item?.id} className="flex items-center p-2 hover:bg-gray-50">
//         <td className="w-2/12 md:w-3/12 p-2">
//           <Link href={`/books/${item?.id}`}>
//             <Image
//               src={item?.image}
//               height={40}
//               width={40}
//               alt={item?.english_title}
//               className="h-10 w-auto object-contain"
//             />
//           </Link>
//         </td>
//         <td className="w-7/12 p-2 text-left">
//           <Link href={`/books/${item?.id}`} className="flex items-center gap-2 hover:text-blue-600">
//             <FaBook />
//             {item?.english_title}
//           </Link>
//         </td>
//         {authors?.map((author) => (
//           <td key={author?.id} className="p-2">
//             {author?.id === item?.author && (
//               <Link href={`/books/${item?.id}`} className="flex items-center gap-2 hover:text-blue-600">
//                 <FiUser />
//                 {author?.name}
//               </Link>
//             )}
//           </td>
//         ))}
//         {publishers?.map((publisher) => (
//           <td key={publisher?.id} className="p-2">
//             {publisher?.id === item?.publisher && (
//               <Link href={`/books/${item?.id}`} className="flex items-center gap-2 hover:text-blue-600">
//                 <MdLocalLibrary />
//                 {publisher?.name}
//               </Link>
//             )}
//           </td>
//         ))}
//         <td className="w-3/12 p-2 text-right font-medium">
//           {item?.regular_price && item?.discount_price ? (
//             <>
//               <span className="line-through text-red-500">
//                 {item.regular_price} টাকা
//               </span>
//               <span className="ml-2">
//                 {item.discount_price} টাকা
//               </span>
//             </>
//           ) : (
//             <span>
//               {item?.regular_price || item?.discount_price} টাকা
//             </span>
//           )}
//         </td>
//       </tr>
//     ))}
//   </tbody>
// </table>
<ul className="list-none w-full divide-y divide-gray-100">
                        {searchBooks.map((item) => (
                          <li key={item.id} className="flex p-2 hover:bg-gray-50">
                            <div className="flex w-full items-center  px-4">
                              <div className="w-2/12 md:w-3/12">
                                <Link href={`/books/${item?.id ?? ""}`} className="block">
                                  <Image src={item.image} className="h-10 w-auto object-contain" alt={item.english_title} height={40} width={40} />
                                </Link>
                              </div>
                              <div className="w-7/12 text-left space-y-1">
                                <Link href={`/books/${item?.id}`} className="hover:text-blue-600 flex items-center gap-2">
                                <FaBook  />

                                  {item.english_title}
                                </Link>
                              
                                {authors.map((author) => 
                                  author.id === item.author && (
                                    <div key={author.id} className="text-gray-500 text-sm flex  items-center gap-2">
                                      <FiUser />

                                      {author.name}
                                    </div>
                                  )
                                )}
                                {publishers.map((publisher) => 
                                  publisher.id === item.publisher && (
                                    <div key={publisher.id} className="text-gray-500 text-sm flex  items-center gap-2">
                                      <MdLocalLibrary />

                                      {publisher.name}
                                    </div>
                                  )
                                )}
                                  <Link href={`/categories/${item?.id}`} className="hover:text-blue-600 flex items-center gap-2">
                                  <BiCategory />

                                  {item.category_name}
                                </Link>
                              </div>
                              <div className="w-3/12 text-right font-medium">
                                {item?.regular_price && item?.discount_price ? (
                                  <>
                                    <span className="line-through text-red-500">
                                      {item.regular_price} টাকা
                                    </span>
                                    <span className="ml-2 ">
                                      {item.discount_price} টাকা
                                    </span>
                                  </>
                                ) : (
                                  <span>
                                    {item?.regular_price || item?.discount_price} টাকা
                                  </span>
                                )}
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>

                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex justify-center gap-5 items-center w-full md:w-5/12">
            {/* {admin.length !== 0 && (
              <Link href="/admin">
                <div className="relative flex items-center justify-center w-12 h-12 rounded-full border border-gray-300">
                  
                </div>
              </Link>
            )} */}
            {user?.phone_number ? (
              <div
                className="relative flex items-center justify-center w-12 h-12 rounded-full border border-gray-300 cursor-pointer hover:text-blue-500"
                onClick={logout}
              >
                {/* <i className="fa-solid fa-right-from-bracket text-lg"></i> */}
                <MdLogout className="text-2xl" />

              </div>
            ) : (
              <Link href="/login">
                <div className="relative flex items-center justify-center w-12 h-12 rounded-full border border-gray-300">
                  <FaUserPlus className="text-2xl" />
                </div>
              </Link>
            )}
            <div className="relative flex items-center justify-center w-12 h-12 rounded-full border border-gray-300">
              <Link href="/wishlist">
                <FaRegHeart className="text-2xl" />
                {wishlistLength !== 0 && (
                  <span className="absolute top-[-8px] right-[-8px] text-sm bg-blue-500 text-white px-2 py-0.5 rounded-full">
                    {wishlistLength}
                  </span>
                )}
              </Link>
            </div>
            <div className="relative flex items-center justify-center w-12 h-12 rounded-full border border-gray-300">
              <Link href="/cart">
                <FaShoppingBag className="text-2xl" />
                {cartLength !== 0 && (
                  <span className="absolute top-[-8px] right-[-8px] text-sm bg-blue-500 text-white px-2 py-0.5 rounded-full">
                    {cartLength}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Search;
