'use client'
import React, {useState} from 'react';
// import { NavLink } from 'react-router-dom';
import AdminNavbar from '../AdminNavbar/AdminNavbar';
import SideBar from '../SideBar/SideBar';
import { useForm } from 'react-hook-form';
import '../AdminDashboard.css';
// import {url} from '../../../App';
// import Select from 'react-select'; // why this has been imported ? rahman saif
import useCategories from '../../../Hooks/useCategories';
// import { url } from '@/app/page';
import Link from 'next/link';
import { RiDeleteBin5Fill } from "react-icons/ri";
import { FaEdit } from 'react-icons/fa';
import { FiEdit } from 'react-icons/fi';
import { FiTrash2 } from 'react-icons/fi';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import useBooks from '@/Hooks/useBooks';
import Pagination from '@/components/Shared/Pagination/Pagination';




export default function AdminBooks({ authors, publishers}) {
  const categoryList = [];
  const authorList = [];
  const publisherList = [];
  const {register, handleSubmit, reset, formState: {errors}} = useForm();
  const {register: searchRegister, handleSubmit: handleSearch} = useForm();
  const [categories] = useCategories();
  const [title, setTitle] = useState('');
  const [searchProducts, setSearchProducts] = useState([]);
  const [result, setResults] = useState(0);
  const [ selectedImage,setSelectedImage ] = useState(null);
  const [selectedPDF, setSelectedPDF] = useState<File | null>(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [category, setCategory] = useState('');
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [author, setAuthor] = useState('');
  const [selectedPublisher, setSelectedPublisher] = useState(null);
  const [publisher, setPublisher] = useState('');
  const [offerType, setOfferType] = useState('');
     const [showAlert, setShowAlert] = useState(false);
    const [showWishlistAlert, setShowWishlistAlert] = useState(false);
    const [showfailedAlert, setshowfailedAlert] = useState(false);
            const url = process.env.NEXT_PUBLIC_URL;
                  const [ books, pageCount, handlePageClick, offset, displayBooks] = useBooks();
            


  //category select
  if (Array.isArray(categories)) {
    for (const category of categories) {
      console.log("category hahahahhaha", category);
      if (category?.children) {
        for (const child of category.children) {
          categoryList.push({ label: `${category?.name}`, value: child.id });
        }
      }
    }
  }

  const categoryHandleChange = (e) => {
    setSelectedCategory(e.value);
    setCategory(e);
  } 

  //author select
  for (const author of authors) {
    authorList.push({ label: `${author?.name}`, value: author.id });
  }

  const authorHandleChange = (e) => {
    setSelectedAuthor(e.value);
    setAuthor(e);
  }

  //publisher select
  for (const publisher of publishers) {
    publisherList.push({ label: `${publisher?.name}`, value: publisher.id });
  }

  const publisherHandleChange = (e) => {
    setSelectedPublisher(e.value);
    setPublisher(e);
  }

  //offer_type select
  const selectOfferType = (e) =>{
    setOfferType(e.target.value);
  }


  //book add function
  const onSubmit = data => {
     const formData = new FormData();
     if(!category){
      alert('Category field is required!');
     }
     if(!author){
      alert('Author field is required!');
     }
     if(!publisher){
      alert('Publisher field is required!');
     }
     if(data.percentage){
      const percentage_value = data.regular_price * (data.percentage / 100);
      data.discount_price = Math.round(data.regular_price - percentage_value);
      data.flat_discount = 0;
     }
     if(data.flat_discount){
      data.discount_price = Math.round(data.regular_price - data.flat_discount);
      data.percentage = 0;
     }
     if(data.offer_type===''){
      data.discount_price=0;
      data.percentage = 0;
      data.flat_discount = 0;
     }
     if(data.units_sold===''){
      data.units_sold=0;
      formData.append('units_sold', data.units_sold);
     }
     if(data.description===''){
      data.description = '';
     }
     if(data.total_page){
      formData.append('total_page', data.total_page);
     }

     if (selectedPDF) {
  formData.append('pdf', selectedPDF);
}
     

     formData.append('english_title', data.english_title);
     formData.append('bangla_title', data.bangla_title);
     formData.append('description', data.description);
     formData.append('category', category);
     formData.append('type', 'books');
     formData.append('author', author);
     formData.append('publisher', publisher);
     formData.append('isbn', data.isbn);
     formData.append('edition', data.edition);
     formData.append('language', data.language);
     formData.append('country', data.country);
     formData.append('offer_type', data.offer_type);
     formData.append('percentage', data.percentage);
     formData.append('flat_discount', data.flat_discount);
     formData.append('purchase_from', data.purchase_from);
     formData.append('purchase_price', data.purchase_price);
     formData.append('regular_price', data.regular_price);
     formData.append('discount_price', data.discount_price);
     formData.append('units_stock', data.units_stock);
     formData.append('is_active', 'true');
     formData.append('image', selectedImage);
     formData.append('alt_text', data.alt_text);
    //  formData.append('pdf', selectedPDF);

  

const formDataObject = Object.fromEntries(formData.entries());
console.log(formDataObject);    
     fetch(`${url}/create-book/`, {
       method: "POST",
       body: formData,
     })
     .then(res => {
      
       if (!res.ok) throw res;
        return res.json();
     })
     .then(getData => {
      //  alert("Book added Successfully!");
      console.log("Book added Successfully!",formDataObject);
      setShowAlert(true); 
    setTimeout(() => setShowAlert(false), 3000); 
       reset();
      window!==undefined && window.location.reload();
     })
     .catch(err => {
       err.json().then(text => {
         if (text?.error) {
           console.log(text?.error);
           return;
         }
     })
         console.log(err.statusText);
     });
  }

  // book delete function
  const handleDelete =async (id) =>{
    // const confirm = window.confirm('Are you sure to delete book?');
    try {
      const response = await fetch(`${url}/api/product/${id}/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        // alert('Book deleted!');
             setShowWishlistAlert(true);
        setTimeout(() => setShowWishlistAlert(false), 3000);
       window!==undefined && window.location.reload();
      }
    } catch (error) {
      console.error('Delete error:', error);
      setshowfailedAlert(true);
        setTimeout(() => setshowfailedAlert(false), 3000);
    }
  //       fetch(`${url}/api/product/${id}/`, {
  //          method:'DELETE'
  //       })
  //       .then(res=>res.json())
  //   }
  //   alert('Book deleted!');
  //   window.location.reload();
  // }
  }

  // searching function
  const onSearch = async (data) => {
    console.log("hello vaiya",data);
    try {
      setTitle(data.title);
      
      if (data.title === '') {
        setSearchProducts([]);
        setResults(0);
        return;
      }

      const response = await fetch(`${url}/product-search-filter/?q=${data.title}`);
            // /product-search-filter/?q=

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      console.log("hello vaiya",result);
      
      if (!result) {
        setResults(1);
        setSearchProducts([]);
      } else {
        setResults(2);
        setSearchProducts(result);
      }
    } catch (error) {
      console.error('Search error:', error);
      setResults(1);
      setSearchProducts([]);
    }
  }

//   //demo add function
//   const onDemoSubmit = data => {
//     let formData = new FormData();

//     for(let i=0; i<selectedGalleryImage.length; i++){
//       formData.append(`image[${i}]`, selectedGalleryImage[i]);
//     }

//     formData.append('name', data.name);
   
//     fetch(`${url}/demoProduct/`, {
//       method: "POST",
//       body: formData,
//     })
//     .then(res => {
//       if (!res.ok) throw res;
//       else return res.json();
//     })
//     .then(getData => {
//       alert("demo added Successfully!");
//       demoReset();
//       window.location.reload();
//     })
//     .catch(err => {
//       err.json().then(text => {
//         if (text?.error) {
//           console.log(text?.error);
//           return;
//         }
//     })
//         console.log(err.statusText);
//     });
//  }

  return (
    <>
      <div className="flex m-0 ">
        <SideBar />
        <div className="w-11/12 mx-auto">
          <AdminNavbar />
          <h3 className="text-2xl font-semibold text-center pt-3">Books</h3>
          <hr className="w-1/4 mx-auto my-3" />
          
          {/* search product */}
          <div className="w-1/2 mx-auto mb-3">
            <form className="container mx-auto" onSubmit={handleSearch(onSearch)}>
              <div className="flex items-center gap-2 mb-3">
                <div className="flex-grow flex items-center border border-green-500 rounded-full p-2 bg-white">
                  <i className="fa fa-search text-center p-1"/>
                  <input
                    {...searchRegister('title')}
                    type="text"
                    className="text-sm p-1 w-3/4 focus:outline-none"
                    placeholder="Search product by title, author, publisher, category"
                  />
                </div>
                <button 
                  className="ml-2 px-3 py-1 text-green-600 border border-green-500 rounded bg-white font-semibold "
                  type="submit"
                >
                  Search
                </button>
              </div>
            </form>
          </div>

          {/* show search result */}
          {title===''?
            <></>
            :
            <>
              {result===0 ?
                <></>
                :
                <>
                {
                result===1?
                  <div className='p-2 mb-4 bg-white border rounded'>
                    <p className='font-bold text-lg p-2'>Sorry, No result found!</p>
                  </div>
                  :
                  <>
                    <div className="p-4 bg-white rounded shadow mb-5">
                      <h4 className="text-center font-semibold text-xl">Searching List</h4>
                      <hr className="w-1/4 mx-auto my-3" />
                      <div className="overflow-x-auto">
                        <table className="table-auto w-full text-left border-collapse">
                          <thead className="sticky top-0 bg-white">
                            <tr className="bg-gray-50 text-green-500">
                              <th className="p-2 border-b">ID</th>
                              <th className="p-2 border-b">English Title</th>
                              <th className="p-2 border-b">Bangla Title</th>
                              <th className="p-2 border-b">Category</th>
                              <th className="p-2 border-b">Image</th>
                              <th className="p-2 border-b">Regular Price</th>
                              <th className="p-2 border-b">Discount Price</th>
                              <th className="p-2 border-b">Stock</th>
                              <th className="p-2 border-b">Sold</th>
                              <th className="p-2 border-b">Action</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            {searchProducts.map((book) => (
                              <tr key={book.id} className="hover:bg-gray-50">
                                <td className="p-2 border-b">{book?.id}</td>
                                <td className="p-2 border-b">{book?.english_title}</td>
                                <td className="p-2 border-b">{book?.bangla_title}</td>
                                <td className="p-2 border-b">{book?.category}</td>
                                <td className="p-2 border-b">
                                  <img src={book?.image} className="h-12 w-12" alt={book?.alt_text} />
                                </td>
                                <td className="p-2 border-b">{book?.regular_price}</td>
                                <td className="p-2 border-b">{book?.discount_price}</td>
                                <td className="p-2 border-b">{book?.units_stock}</td>
                                <td className="p-2 border-b">{book?.units_sold}</td>
                                <td className="p-2 border-b flex space-x-2">
                                  <Link href={`/update-book/${book.id}`} 
                                    className="p-1 bg-blue-500 text-white rounded hover:bg-blue-600">
                                    <FiEdit size={16} />
                                  </Link>
                                  <button
                                  type='button'
                                    onClick={() => handleDelete(book?.id)}
                                    className="p-1 bg-red-500 text-white rounded hover:bg-red-600"
                                  >
                                    <FiTrash2 size={16} />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </>
                }
                </>
              }
            </>
          }
          {/* add a new product */}
          <div className="w-3/4 mx-auto py-3 bg-white rounded shadow mb-3">
            <h4 className="text-center text-xl font-semibold pb-3">Add a new book</h4>
            <form className="container mx-auto px-4" onSubmit={handleSubmit(onSubmit)}> 
              <div className="grid grid-cols-4 gap-6 mb-4">
                <label htmlFor='' className="self-center text-right">*Book English Title:</label>
                <div className="col-span-3">
                  <input
                    {...register("english_title", {required: true})}
                    type="text"
                    placeholder="Enter book's english title"
                    className="w-full p-2 border border-green-500 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
                  />
                  {errors.english_title?.type === 'required' && 
                    <p role="alert" className="text-red-500 text-sm mt-1">Book english title is required*</p>
                  }
                </div>
              </div>

              <div className="grid grid-cols-4 gap-6 mb-4">
                <label htmlFor='' className="self-center text-right">*Book Bangla Title:</label>
                <div className="col-span-3">
                  <input
                    {...register("bangla_title")}
                    type="text"
                    placeholder="Enter book's bangla title" 
                    className="w-full p-2 border border-green-500 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-4 gap-6 mb-4">
                <label htmlFor='' className="self-center text-right">*Category:</label>
                <div className="col-span-3">
                  <select
                    value={selectedCategory}
                    onChange={(e) => categoryHandleChange(e.target.value)}
                    className="w-full p-2 border border-green-500 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
                  >
                    <option value="">একটি ক্যাটাগরী নির্বাচন করুন</option>
                    {categoryList.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-4">
                <label htmlFor='' className="self-center text-right ">Description:</label>
                <textarea
                  {...register("description")}
                  placeholder="description"
                  className="col-span-3  p-2 border border-green-500 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
                  rows={10}
                />
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-4  mb-3 ">
                <label  htmlFor=''className="self-center text-right ">*Author:</label>
                <select
                  value={selectedAuthor}
                  onChange={(e) => authorHandleChange(e.target.value)}
                  className="p-2 border  border-green-500 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
                >
                  <option value="">একটি লেখক নির্বাচন করুন</option>
                  {authorList.map((author) => (
                    <option key={author.value} value={author.value}>
                      {author.label}
                    </option>
                  ))}
                </select>
                <label htmlFor='' className="self-center text-right ">*Publisher:</label>
                <select
                  value={selectedPublisher}
                  onChange={(e) => publisherHandleChange(e.target.value)}
                  className="p-2 border  border-green-500 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
                >
                  <option value="">একটি প্রকাশক নির্বাচন করুন</option>
                  {publisherList.map((publisher) => (
                    <option key={publisher.value} value={publisher.value}>
                      {publisher.label}
                    </option>
                  ))}
                </select>
              </div>




              
              <div className="grid md:grid-cols-4 grid-cols-1 gap-4  mb-3 ">
                <label htmlFor='' className="self-center text-right">*Upload image:</label>
                <input
                  {...register("image", {required: true})}
                  type="file"
                  id="choose-file"
                  accept="image/*"
                  onChange={(event) => setSelectedImage(event.target.files[0])}
                  className="p-2 border  border-green-500 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
                />
                {errors.image?.type === 'required' && 
                  <p role="alert" className="text-red-500 text-sm">Books image is required*</p>
                }
                <label htmlFor='' className="self-center text-right">Alt-text:</label>
                <input
                  {...register("alt_text")}
                  type="text"
                  placeholder="alternate text"
                  className="p-2 border  border-green-500  rounded focus:outline-none focus:ring-1 focus:ring-green-500"
                />
              </div>
              <div className="grid md:grid-cols-4 grid-cols-1 gap-4 mb-3">
                <label htmlFor='' className="self-center text-right">ISBN:</label>
                <input
                  {...register("isbn")}
                  type="text"
                  placeholder="isbn no."
                  className="p-2  border border-green-500 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
                />
                <label  htmlFor='' className="self-center text-right">Edition:</label>
                <input
                  {...register("edition")}
                  type="text"
                  placeholder="edition"
                  className="p-2 border  border-green-500 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
                />
              </div>


              <div className="grid md:grid-cols-4 grid-cols-1 gap-4 mb-3 ">
                <label htmlFor='' className="self-center text-right ">Language:</label>
                <input
                  {...register("language")}
                  type="text"
                  placeholder="language"
                  className="p-2 border  border-green-500 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
                />
                <label htmlFor='' className="self-center text-right ">Country:</label>
                <input
                  {...register("country")}
                  type="text"
                  placeholder="country"
                  className="p-2 border  border-green-500 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
                />
              </div>
              <div className="grid md:grid-cols-4 grid-cols-1 gap-4 mb-3 ">
                <label htmlFor='' className="self-center text-right ">Total page:</label>
                <input
                  {...register("total_page")}
                  type="number"
                  min="0"
                  placeholder="total_page"
                  className="p-2 border  border-green-500 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
                />
                <label htmlFor='' className="self-center text-right ">PDF:</label>
                <input
                  {...register("pdf")}
                  type="file"
                  accept=".pdf"
                  onChange={(event) => setSelectedPDF(event.target.files[0] || null)}
                  className="p-2 border border-green-500 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
                />
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-4  mb-3 ">
                <label htmlFor='' className="self-center text-right ">Purchase from:</label>
                <textarea
                  {...register("purchase_from")}
                  placeholder="purchase from"
                  className="p-2 border  border-green-500 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
                  rows={4}
                />
                <label htmlFor='' className="self-center text-right ">*Purchase price:</label>
                <input
                  {...register("purchase_price", {required: true})}
                  type="number"
                  min="0"
                  placeholder="purchase price"
                  className="p-2 border border-green-500 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
                />
                {errors.regular_price?.type === 'required' && 
                  <p role="alert" className="text-red-500 text-sm">Purchase Price is required*</p>
                }
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-3">
                <label htmlFor='' className="self-center text-right">Offer type:</label>
                <select 
                  {...register("offer_type")}
                  onChange={(e)=>selectOfferType(e)}
                  className="p-2 border border-green-500 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
                >
                  <option value="">একটি অফার টাইপ নির্বাচন করুন</option>
                  <option value="Percentage">Percentage</option>
                  <option value="Flat Discount">Flat Discount</option>
                </select>

                {offerType === 'Percentage' && (
                  <>
                    <label htmlFor='' className="self-center text-right">*Percentage:</label>
                    <input
                      {...register("percentage")}
                      type="number"
                      min="0"
                      placeholder="Percentage value"
                      className="p-2 border border-green-500 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
                    />
                  </>
                )}

                {offerType === 'Flat Discount' && (
                  <>
                    <label htmlFor='' className="self-center text-right">*Flat Discount:</label>
                    <input
                      {...register("flat_discount")}
                      type="number"
                      min="0"
                      placeholder="Flat Discount value" 
                      className="p-2 border border-green-500 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
                    />
                  </>
                )}
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-4  mb-3">
                <label htmlFor='' className="self-center text-right">*Regular price:</label>
                <input
                  {...register("regular_price", {required: true})}
                  type="number"
                  min="0"
                  placeholder="regular price"
                  className="p-2 border border-green-500 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
                />
                {errors.regular_price?.type === 'required' && 
                  <p role="alert" className="text-red-500 text-sm">Regular Price is required*</p>
                }
                <label htmlFor='' className="self-center text-right">*Stock:</label>
                <input
                  {...register("units_stock", {required: true})}
                  type="number"
                  min="0"
                  placeholder="stock in hand"
                  className="p-2 border border-green-500 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
                />
                {errors.units_stock?.type === 'required' && 
                  <p role="alert" className="text-red-500 text-sm">Units of Stock is required*</p>
                }
              </div>

              <div className="flex justify-center my-6">
                <input
                  type="submit"
                  value="Submit"
                  className="px-8 py-2 bg-green-500 text-white rounded hover:bg-green-600 cursor-pointer w-3/4"
                />
              </div>

              
            </form>
          </div>



          

          {/* show book list */}
          <div className="container mx-auto mb-4">
            <h4 className="text-center font-semibold text-xl">Book List</h4>
            <hr className="w-1/4 mx-auto my-3" />
            <div className="bg-white rounded shadow p-4 overflow-x-auto overflow-y-auto max-h-96">
              <table className="table-auto w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="p-2 border-b">ID</th>
                    <th className="p-2 border-b">English Title</th>
                    <th className="p-2 border-b">Bangla Title</th>
                    <th className="p-2 border-b">Category</th>
                    <th className="p-2 border-b">Image</th>
                    <th className="p-2 border-b">Purchase From</th>
                    <th className="p-2 border-b">Purchase Price</th>
                    <th className="p-2 border-b">Regular Price</th>
                    <th className="p-2 border-b">Discount Price</th>
                    <th className="p-2 border-b">Stock</th>
                    <th className="p-2 border-b">Sold</th>
                    <th className="p-2 border-b">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {displayBooks?.map((book) => (
                    <tr key={book?.id} className="hover:bg-gray-50">
                      <td className="p-2 border-b">{book?.id}</td>
                      <td className="p-2 border-b">{book?.english_title}</td>
                      <td className="p-2 border-b">{book?.bangla_title}</td>
                      <td className="p-2 border-b">{book?.category_name}</td>
                      <td className="p-2 border-b">
                        <img src={book?.image} className="h-12 w-12" alt={book?.alt_text} />
                      </td>
                      <td className="p-2 border-b">{book?.purchase_from}</td>
                      <td className="p-2 border-b">{book?.purchase_price}</td>
                      <td className="p-2 border-b">{book?.regular_price}</td>
                      <td className="p-2 border-b">{book?.discount_price}</td>
                      <td className="p-2 border-b">{book?.units_stock}</td>
                      <td className="p-2 border-b">{book?.units_sold}</td>
                      <td className="p-2 border-b flex space-x-2">
                        <Link href={`/update-book/${book.id}`} 
                          className="p-1 m-1 bg-blue-500 text-white rounded hover:bg-blue-600">
                          <FiEdit  />
                        </Link>
                        <button
                        type='button'
                          className=""
                        >
                          {/* <FiTrash2 size={16} /> */}
                          <AlertDialog>
  <AlertDialogTrigger asChild>
    <button type="button"
    className="p-1 bg-red-500 text-white rounded m-1">
      <RiDeleteBin5Fill />
    </button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete the author.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={() => handleDelete(book?.id)}>
        Delete
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
           <div className="container w-3/4 mx-auto mt-5">
        <Pagination pageCount={pageCount} handlePageClick={handlePageClick} offset={offset} />
      </div>

          
        </div>
      </div>
       {showAlert && (
        <Alert className="fixed bottom-4 right-4 w-96 bg-[#fac309] opacity-70 border border-green-300 rounded-lg p-4 shadow-lg">
          <Terminal className="h-4 w-4 text-white" />
          {/* <AlertTitle className="font-bold text-white">Success!</AlertTitle> */}
          <img src="/images/favicon/book-logo.png" alt="logo" className="h-4 w-4 text-white" />
          <AlertDescription className="text-white">
            Successfully Author Added
          </AlertDescription>
        </Alert>
      )}

      {showWishlistAlert && (
        <Alert className="fixed bottom-4 right-4 w-96 bg-[#fac309] opacity-70 border border-blue-300 rounded-lg p-4 shadow-lg">
          <Terminal className="h-4 w-4 text-black" />
          <AlertDescription className="text-black">
            Successfully Author Deleted
          </AlertDescription>
        </Alert>
      )} 

{showfailedAlert && (
        <Alert className="fixed bottom-4 right-4 w-96 bg-[#fac309] opacity-70 border border-blue-300 rounded-lg p-4 shadow-lg">
          <Terminal className="h-4 w-4 text-black" />
          <AlertDescription className="text-black">
            Author Can't be Deleted
          </AlertDescription>
        </Alert>
      )}
    </>
  );
}
