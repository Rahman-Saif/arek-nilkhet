'use client'
import React, {useState, useEffect} from 'react';
import useLocalCart from '../../../Hooks/useLocalCart';
import useStationarySortByHighPrice from '../../../Hooks/Sorting/SortingStationary/useStationarySortByHighPrice';
import useStationarySortByLowPrice from '../../../Hooks/Sorting/SortingStationary/useStationarySortByLowPrice';
import useStationarySortByNew from '../../../Hooks/Sorting/SortingStationary/useStationarySortByNew';
import useStationarySortByStock from '../../../Hooks/Sorting/SortingStationary/useStationarySortByStock';
import { addToDb } from '../../../Utilities/LocalStorage';
import Footer from '../../common/footer/Footer';
import Header from '../../common/header/Header';
import MegaMenu from '../../common/MegaMenu/MegaMenu';
import Stationary from './Stationary';
import useStationary from '../../../Hooks/useStationary';
import Pagination from '../../Shared/Pagination/Pagination';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal } from "lucide-react";
import useStationaryCategory from '@/Hooks/useStationaryCategory';


export default function Stationaries() {
  const [sorted_items, setSortedItems] = useState([]);
  const [stationaries, pageCount, handlePageClick, offset, displayItems] = useStationary();
    const [ stationaryCategory ] = useStationaryCategory();

  const [sortedNewItems] = useStationarySortByNew();
  const [sortedStockItems] = useStationarySortByStock();
  const [sortedLowItems] = useStationarySortByLowPrice();
  const [sortedHighItems] = useStationarySortByHighPrice();
  const [sortingValue, setSortingValue] = useState('');
  const [CartItem, setCartItem]= useLocalCart(stationaries);
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
      <Header />
      <MegaMenu/>
      <h4 className="text-center font-bold text-lg">Our Stationaries Items</h4>
      <hr className="bg-success w-25 mx-auto" />


     <div className="w-11/12 mx-auto m-3 mb-5 ">
  {(displayItems.length === 0 && displayTotalItems.length === 0) && 
    <div className="h-screen"></div>
  }
  {(displayTotalItems.length !== 0 || displayItems.length !== 0) && 
    <>
      <section>
        <div className="flex justify-end m-3 mb-16">
          <div className="sort">
            <form action="#" className="">
              <label htmlFor="sort"></label>
              <select 
                name="sort" 
                id="sort" 
                className=" p-2 rounded border border-gray-300 text-gray-700 font-medium" 
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
        <div>
          {(sortingValue === '' && displayItems?.length !== 0) &&
            <>
              {displayItems?.length <= 4 ?
                <div style={{ minHeight: '1000px', maxHeight: '2500px' }}>
                  <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-auto">
                    {displayItems.map((product) => (
                      <Stationary 
                        key={product.id} 
                        product={product} 
                        handleAddToCart={handleAddToCart} 
                      />
                    ))}
                  </div>
                </div>
              :
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-auto">
                  {displayItems.map((product) => (
                    <Stationary 
                      key={product.id} 
                      product={product} 
                      handleAddToCart={handleAddToCart} 
                    />
                  ))}
                </div>
              }
              <div className="w-3/4 mx-auto mt-5">
                <Pagination 
                  pageCount={pageCount} 
                  handlePageClick={handlePageClick} 
                  offset={offset} 
                />
              </div>
            </>
          }
          {(sortingValue !== '' && sorted_items?.length !== 0) &&
            <>
              {sorted_items?.length <= 4 ?
                <div style={{ minHeight: '1000px', maxHeight: '2500px' }}>
                  <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-auto">
                    {displayTotalItems.map((product) => (
                      <Stationary 
                        key={product.id} 
                        product={product} 
                        handleAddToCart={handleAddToCart} 
                      />
                    ))}
                  </div>
                </div>
              :
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-auto">
                  {displayTotalItems.map((product) => (
                    <Stationary 
                      key={product.id} 
                      product={product} 
                      handleAddToCart={handleAddToCart} 
                    />
                  ))}
                </div>
              }
              <div className="w-3/4 mx-auto mt-5">
                <Pagination 
                  pageCount={totalPageCount} 
                  handlePageClick={handleTotalPageClick} 
                  offset={offsetItems} 
                />
              </div>
            </>
          }
        </div>
      </section>
    </>
  }
</div>
{showAlert && (
        <Alert className="fixed bottom-4 right-4 w-96 bg-[#fac309] opacity-70 border border-green-300 rounded-lg p-4 shadow-lg">
          <Terminal className="h-4 w-4 text-white" />
          <AlertDescription className="text-white">
            Successfully added to the cart!
          </AlertDescription>
        </Alert>
      )}



      <Footer></Footer>
    </>
  );
}

