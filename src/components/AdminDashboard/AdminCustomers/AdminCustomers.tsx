'use client'
import React, {useState} from 'react';
import AdminNavbar from '../AdminNavbar/AdminNavbar';
import SideBar from '../SideBar/SideBar';
import { useForm } from 'react-hook-form';
// import { url } from '../../../App';
import useAllCustomers from '../../../Hooks/useAllCustomers';
import Pagination from '@/components/Shared/Pagination/Pagination';
// import { url } from '@/app/page';


export default function AdminCustomers() {
  const [customers,pageCount, handlePageClick, offset, displayData] = useAllCustomers();
  const [phone_number, setPhoneNumber] = useState('');
  const [searchCustomers, setSearchCustomers] = useState([]);
  const [result, setResults] = useState(0);
  const {register, handleSubmit} = useForm();
          const url = process.env.NEXT_PUBLIC_URL;


  // searching function
  const onSearch = data =>{

    setPhoneNumber(data.phone_number);
    if(data.phone_number===''){
      setSearchCustomers([]);
      setResults(0);
    }
    else{
      fetch(`${url}/api/user/?is_admin=false&phone_number=${data.phone_number}`)
        .then(res => res.json())
        .then(result => {
          if(result.length===0){
            setResults(1);
          }
          else{
            setResults(2);
            setSearchCustomers(result.results);
          }
        });
    }  
  }

  return (
    <>
      <div className="flex m-0 ">
  <SideBar />
  <div className="w-11/12 mx-auto">
    <AdminNavbar />
    <h3 className="text-center pt-3 text-gray-600 font-semibold text-2xl ">Customers</h3>
    <hr className="border-t-2 border-gray-300 w-1/4 mx-auto mb-4" />
    {/* search customer */}
    <div className="w-1/2 mx-auto mb-3">
      <form className="container mx-auto" onSubmit={handleSubmit(onSearch)}>
        <div className="flex items-center mb-3">
          <div className="flex-grow flex items-center border border-green-500 rounded-full p-2 bg-white">
            <i className="fa fa-search text-green-500 p-1"/>
            <input
              {...register("phone_number")}
              type="text"
              className="text-sm p-1 w-3/4 outline-none"
              placeholder="Search Customer by Phone Number"
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
    {phone_number === "" ? (
      <></>
    ) : (
      <>
        {result === 0 ? (
          <></>
        ) : (
          <>
            {result === 1 ? (
              <div className="container p-2 mb-4 bg-white border rounded shadow search-div">
                <p className="font-semibold text-sm p-2">Sorry, No result found!</p>
              </div>
            ) : (
              <>
                <div className="container p-2 border-0 rounded shadow mb-5 bg-white overflow-x-auto">
                  <h4 className="text-center font-semibold">Searching List</h4>
                  <hr className="w-1/4 mx-auto my-2" />
                  <table className="table-auto w-full text-left border-collapse">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="p-2 border-b">ID</th>
                        <th className="p-2 border-b">Name</th>
                        <th className="p-2 border-b">Phone No.</th>
                      </tr>
                    </thead>
                    <tbody>
                      {searchCustomers.map((customer) => (
                        <tr key={customer?.id} className="hover:bg-gray-50">
                          <td className="p-2 border-b">{customer?.id}</td>
                          <td className="p-2 border-b">{customer?.name}</td>
                          <td className="p-2 border-b">{customer?.phone_number}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </>
        )}
      </>
    )}
    {/* show customer list */}
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg max-h-[500px]">
      <div className="overflow-y-auto max-h-[400px]">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="sticky top-0 z-10 text-xs uppercase bg-green-100">
            <tr>
              <th scope="col" className="px-6 py-3 text-green-600">ID</th>
              <th scope="col" className="px-6 py-3 text-green-600">Name</th>
              <th scope="col" className="px-6 py-3 text-green-600">Phone No.</th>
              <th scope="col" className="px-6 py-3 text-green-600">Status</th>
            </tr>
          </thead>
          <tbody>
            {displayData?.map((customer) => (
              <tr key={customer?.id} className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">{customer?.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{customer?.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{customer?.phone_number}</td>
                <td className="px-6 py-4 whitespace-nowrap">{customer.is_admin === false && "Customer"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>



      <div className=" container w-3/4 mx-auto mt-5">
              <Pagination
                pageCount={pageCount}
                handlePageClick={handlePageClick}
                offset={offset}
              />
            </div>
  </div>
</div>

    </>
  );
}
