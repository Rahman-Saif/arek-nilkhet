'use client'
import React, { useEffect, useState } from 'react';
// import { Link, useHistory, useLocation} from 'react-router-dom';
import useCategories from '../../../Hooks/useCategories';
// import { url } from '@/app/page';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { TiArrowSortedDown } from "react-icons/ti";
import { IoMdArrowDropright } from "react-icons/io";
import { usePathname } from 'next/navigation';



// import { url } from '../../../App';

const Navbar = () => {
  const [ categories ] = useCategories();
  const pathName=usePathname();
  
  // console.log('naaaaa',categories)
  // const user = JSON.parse(localStorage.getItem('user'));
  // const token = localStorage.getItem('token');

  const [isDesktopOpen, setIsDesktopOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openSubcategory, setOpenSubcategory] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);
            const url = process.env.NEXT_PUBLIC_URL;



  const handleCategoryClick = (categoryName, e) => {
    e.preventDefault();
    router.push(`/categories/${categoryName}`);
    setIsDesktopOpen(false);
    setIsMobileOpen(false);
    setOpenSubcategory(null);
  };

  const toggleSubcategory = (categoryId, e) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenSubcategory(openSubcategory === categoryId ? null : categoryId);
  };

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);
    const [activeCategory, setActiveCategory] = useState(null);

  

  const router = useRouter();

  


   const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    setActiveCategory(null); // Reset active category when closing main dropdown
  };

  // const handleCategoryClick = (categoryId) => {
  //   setActiveCategory(activeCategory === categoryId ? null : categoryId);
  // };

  // Replace Next.js Link with regular anchor tags
  const NavLink = ({ href, children, className }) => (
    <a href={href} className={className}>{children}</a>
  );

 

  const toggleSubmenu = (id) => {
    setOpenSubmenu((prev) => (prev === id ? null : id));
  };

  //location redirect
  const history = useRouter();
  const location = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = JSON.parse(window!==undefined && window.localStorage.getItem('user'));
      const storedToken = window!==undefined && window.localStorage.getItem('token');
      setUser(storedUser);
      setToken(storedToken);
    }
  }, []);

  //logout function
  const logout = () =>{
    if (typeof window !== 'undefined') {
      window!==undefined && window.localStorage.removeItem('user');
      window!==undefined && window.localStorage.removeItem('token');
    }
    fetch(`${url}/logout/`, {
      method: "POST",
      headers: {
        "Authorization": "Token "+token
      },
    })
    .then(()=>{
      if(pathName==='/'){
        history.push('/');
      }
      else{
        history.push('/');
      }
    })
  }
  
  const handleOrderHistoryClick = () => {
    if (user?.phone_number) {
      router.push(`/order-history/${user.phone_number}`);
    } else {
      console.error('User phone number is not available');
    }
  };

  return (
    <>
      <div className="container p-1 rounded">
        <nav className="flex justify-around">


          <div className="">
      {/* Desktop & Tablet Category Dropdown */}
      <div className="hidden sm:block">
        <div className="relative inline-block text-left">
          <button
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 focus:outline-none"
            type="button"
            onClick={() => {
              setIsDesktopOpen(!isDesktopOpen);
              setOpenSubcategory(null);
            }}
            id="category-menu-button"
          >
            ক্যাটাগরী
            <svg
              className={`w-5 h-5 ml-2 -mr-1 transform ${isDesktopOpen ? 'rotate-180' : ''}`}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {isDesktopOpen && (
            <div className="absolute left-0 z-10 mt-2 w-56 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                {categories?.map((category) => (
                  <div key={category.id} className="relative">
                    <div className="flex items-center justify-between px-4 py-2 hover:bg-gray-100"  onMouseEnter={(e) => toggleSubcategory(category.id, e)}>
                      <a
                        href={`/categories/${category.name}`}
                        onClick={(e) => handleCategoryClick(category.name, e)}
                        className="text-sm text-gray-700 hover:text-gray-900"
                      >
                        {category.name}
                      </a>
                      {category?.children && (
                        <button
                         
                          className="p-2"
                        >
                          <svg 
                            className={`w-4 h-4 transform transition-transform ${openSubcategory === category.id ? 'rotate-90' : ''}`} 
                            viewBox="0 0 20 20" 
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      )}
                    </div>
                    {category?.children && openSubcategory === category.id && (
                      <div className="absolute left-full top-0 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                        <div className="py-1">
                          {category.children.map((child) => (
                            <a
                              key={child.name}
                              href={`/categories/${child.name}`}
                              onClick={(e) => handleCategoryClick(child.name, e)}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                            >
                              {child.name}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Category Dropdown */}
      <div className="sm:hidden">
        <button
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 focus:outline-none"
          type="button"
          onClick={() => {
            setIsMobileOpen(!isMobileOpen);
            setOpenSubcategory(null);
          }}
        >
          ক্যাটাগরী
          <svg
            className={`w-5 h-5 ml-2 -mr-1 transform ${isMobileOpen ? 'rotate-180' : ''}`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {isMobileOpen && (
          <div className="absolute left-0 z-10 mt-2 w-56 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1 max-h-96 overflow-y-auto">
              {categories?.map((category) => (
                <div key={category.id}>
                  <div className="flex items-center justify-between">
                    <a
                      href={`/categories/${category.name}`}
                      onClick={(e) => handleCategoryClick(category.name, e)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    >
                      {category.name}
                    </a>
                    {category?.children && (
                      <button
                        onClick={(e) => toggleSubcategory(category.id, e)}
                        className="p-2"
                      >
                        <svg 
                          className={`w-4 h-4 transform transition-transform ${openSubcategory === category.id ? 'rotate-90' : ''}`} 
                          viewBox="0 0 20 20" 
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    )}
                  </div>
                  {category?.children && openSubcategory === category.id && (
                    <div className="pl-4">
                      {category.children.map((child) => (
                        <a
                          key={child.name}
                          href={`/categories/${child.name}`}
                          onClick={(e) => handleCategoryClick(child.name, e)}
                          className="block px-4 py-2 text-sm font-light text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        >
                          {child.name}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>

          {/* Links */}
         <div className="relative">
      {/* Hamburger Icon */}
      <div className="lg:hidden flex justify-end p-4">
        <button
          className="text-gray-800 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
            ></path>
          </svg>
        </button>
      </div>

      {/* Links */}
      <div
        className={`flex flex-col lg:flex-row lg:items-center transition-all lg:mr-72 ${
          menuOpen ? "block" : "hidden lg:block"
        }`}
      >
        <Link
          href="/books"
          className="nav-link text-gray-800 font-medium px-4 py-2"
        >
          বই
        </Link>
        <Link
          href="/electronics"
          className="nav-link text-gray-800 font-medium px-4 py-2"
        >
          ইলেক্ট্রনিক্স
        </Link>
        <Link
          href="/stationary"
          className="nav-link text-gray-800 font-medium px-4 py-2"
        >
          স্টেশনারী
        </Link>
        <Link
          href="/"
          className="nav-link text-gray-800 font-medium px-4 py-2"
        >
          প্রিন্টিং সার্ভিস
        </Link>
        <Link
          href="/"
          className="nav-link text-gray-800 font-medium px-4 py-2"
        >
          কাস্টম অর্ডার
        </Link>
        {user?.phone_number && (
          <Link
            href="/order"
            className="nav-link text-gray-800 font-medium px-4 py-2"
          >
            অর্ডার
          </Link>
        )}
        {user?.phone_number ? (
          <>
             <button
            className="bg-white text-gray-800 font-medium px-4 py-2"
            onClick={logout}
          >
            সাইন আউট
          </button>
             <button
            className="bg-white text-gray-800 font-medium px-4 py-2"
            onClick={handleOrderHistoryClick}
          >
             অর্ডার ইতিহাস
          </button>

          </>
         
        ) : (
          <Link
            href="/login"
            className="nav-link text-gray-800 font-medium px-4 py-2"
          >
            সাইন ইন
          </Link>
        )}
      </div>
    </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
