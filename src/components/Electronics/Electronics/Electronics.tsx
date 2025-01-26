'use client'
import React, {useState, useEffect} from 'react';
import useLocalCart from '../../../Hooks/useLocalCart';
import useElectronics from '../../../Hooks/useElectronics';
import useElectronicsSortByHighPrice from '../../../Hooks/Sorting/SortingElectronics/useElectronicsSortByHighPrice';
import useElectronicsSortByLowPrice from '../../../Hooks/Sorting/SortingElectronics/useElectronicsSortByLowPrice';
import useElectronicsSortByNew from '../../../Hooks/Sorting/SortingElectronics/useElectronicsSortByNew';
import useElectronicsSortByStock from '../../../Hooks/Sorting/SortingElectronics/useElectronicsSortByStock';
import { addToDb } from '../../../Utilities/LocalStorage';
import Footer from '../../common/footer/Footer';
import Header from '../../common/header/Header';
import MegaMenu from '../../common/MegaMenu/MegaMenu';
import Electronic from './Electronic';
import Pagination from '../../Shared/Pagination/Pagination';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal } from "lucide-react";
import useElectronicCategory from '@/Hooks/useElectronicCategory';


export default function Electronics() {
  const [sorted_items, setSortedItems] = useState([]);
  const [electronics, pageCount, handlePageClick, offset, displayItems] = useElectronics();
  const [sortedNewItems] = useElectronicsSortByNew();
  const [sortedStockItems] = useElectronicsSortByStock();
  const [sortedLowItems] = useElectronicsSortByLowPrice();
  const [sortedHighItems] = useElectronicsSortByHighPrice();
    const [electronicCategory]  = useElectronicCategory();

  const [sortingValue, setSortingValue] = useState('');
  const [CartItem, setCartItem]= useLocalCart(electronics);
  const [totalPageCount, setTotalPageCount] = useState(0);
  const [displayTotalItems, setDisplayTotalItems] = useState([]);
  const [offsetItems, setOffsetItems] = useState(0);
      const [showAlert, setShowAlert] = useState(false);



  //pagination page click function
  const handleTotalPageClick=(e)=>{
    const selectedPage = e.selected;
    offsetItems(selectedPage*20);
  }

  
  //sorting function
  const selectSort = (e) =>{
    setSortingValue(e.target.value);
  }

  //default sort function
  const selectDefaultSort = () =>{
    setSortingValue('');
  }

  useEffect(() => {
    let data =[];  

    if(sortingValue === "highest"){
      data = sortedHighItems;
      setSortedItems(data);
    }
    if(sortingValue === "lowest"){
      data = sortedLowItems;
      setSortedItems(data);
  
    }
    if(sortingValue === "inStock"){
      data = sortedStockItems;
      setSortedItems(data);
  
    }
    if(sortingValue === "new"){
      data=sortedNewItems;
      setSortedItems(data);
    }
    
    const pageNumber = (Math.floor(data.length/20))+1;
    setTotalPageCount(pageNumber);
    setDisplayTotalItems(data.slice(offsetItems, (offsetItems+(20*1))));

  }, [sortingValue, offsetItems]);


  // handleAddToCart function
  const handleAddToCart=(product)=>{
    const newCart=[...CartItem, product];
    setCartItem(newCart);
    addToDb(product.id);
    // alert('Product addded successfully!');
    setShowAlert(true); // Show alert when an item is added
    setTimeout(() => setShowAlert(false), 3000); 
  }

  return (
    <>
      <Header ></Header>
      <MegaMenu></MegaMenu>
      <h4 className="text-center font-bold text-lg">Our Electronics Items</h4>
      <hr className=" w-1/4 mx-auto my-4" />
        <section className='w-11/12 mx-auto mb-5 '>
  {(displayItems.length === 0 && displayTotalItems.length === 0) && 
    <div className='h-screen'></div>
  }
  {(displayTotalItems.length !== 0 || displayItems.length !== 0) &&
    <>
      <div className="sort-filter m-3 flex justify-end mb-16 ">
        <div className='sort'>
          <form action="#" className=''>
            <label htmlFor='sort'></label>
            <select
              name='sort'
              id='sort'
              className='bg-gray-100 p-2 rounded border outline-none text-base font-medium'
              onChange={(e) => selectSort(e)}
            >
              <option value="default" onClick={selectDefaultSort}>Default Sorting</option>
              <option value="lowest">Price low to high</option>
              <option value="highest">Price high to low</option>
              <option value="inStock">In stock</option>
              <option value="new">New arrivals</option>
            </select>
          </form>
        </div>
      </div>
      <div className="">
        {(sortingValue === '' && displayItems?.length !== 0) &&
          <>
            {displayItems?.length <= 4 ?
              <div style={{ minHeight: '1000px', maxHeight: '2500px' }}>
                <div className="grid gap-4 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 mx-auto">
                  {displayItems.map((product) => (
                    <Electronic key={product.id} product={product} handleAddToCart={handleAddToCart} />
                  ))}
                </div>
              </div>
            :
              <div className="grid gap-4 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 mx-auto">
                {displayItems.map((product) => (
                  <Electronic key={product.id} product={product} handleAddToCart={handleAddToCart} />
                ))}
              </div>
            }
            <div className='container w-3/4 mx-auto mt-5'>              
              <Pagination pageCount={pageCount} handlePageClick={handlePageClick} offset={offset} />
            </div>
          </>
        }

        {(sortingValue !== '' && sorted_items?.length !== 0) &&
          <>
            {sorted_items?.length <= 4 ?
              <div style={{ minHeight: '1000px', maxHeight: '2500px' }}>
                <div className="grid gap-4 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 mx-auto">
                  {displayTotalItems.map((product) => (
                    <Electronic key={product.id} product={product} handleAddToCart={handleAddToCart} />
                  ))}
                </div>
              </div>
            :
              <div className="grid gap-4 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 mx-auto">
                {displayTotalItems.map((product) => (
                  <Electronic key={product.id} product={product} handleAddToCart={handleAddToCart} />
                ))}
              </div>
            }
            <div className='container w-3/4 mx-auto mt-5'>              
              <Pagination pageCount={totalPageCount} handlePageClick={handleTotalPageClick} offset={offsetItems} />
            </div>
          </>
        }
      </div>
    </>
  }
</section>
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

      <Footer></Footer>
    </>
  );
}

