import React from 'react';
//import { NavLink } from 'react-router-dom';
import './style.css';
import Link from 'next/link';
import { FaFacebookF } from "react-icons/fa6";

const Footer = () => {
  return (
    <>
      <footer>
        <div className="container mx-auto ">
          <div className=" footer p-10">
            <div className="me-4">
              <div className="flex flex-row items-center">
                <img
                  height="30px"
                  width="30px"
                  src="../../images/favicon/book-logo.png"
                  alt=""
                />
                <div>
                  <h3 className="text-[#ffc107] text-3xl ps-2 mb-1">Nilkhet Boighor</h3>
                </div>
                  

              </div>
              <hr width="260px" className="text-white mt-4" />
              <p className="pt-2">
                NBG is the fastest online Books Delivery site. <br />
                It also works with stationary and electronics items.
                <br />
                It Delivers all over the country.
              </p>
              <p>Follow us on <a href='https://www.facebook.com/Nilkhetbookshop' className='font-bold text-white'><FaFacebookF size={30} className='mr-2'/></a></p>
            </div>

            <div className="me-4">
              <h4 className='font-bold text-xl'>Supports</h4>
              <hr width="100px" className="text-white " />
              <p className="font-bold">Order Track</p>
              <p className="font-bold">Pre Order</p>
              <p className="font-bold">Complain</p>
              <p className="font-bold">Contact Us</p>
              <p className="font-bold">Policy</p>
              <Link href='/login' className='text-white'><p className="font-bold">Sign in</p></Link>
              <p className="font-bold">Terms & Conditions</p>
            </div>
            <div className="me-4">
              <h4 className='font-bold text-xl'>Shop By</h4>
              <hr width="100px" className="text-white " />
              <Link href='/books' className='text-white'><p className="font-bold">Book</p></Link>
              <Link href='/electronics' className='text-white'><p className="font-bold">Electronics</p></Link>
              <Link href='/stationary' className='text-white'><p className="font-bold">Stationary</p></Link>
              <p className="font-bold">Printing Service </p>
              <p className="font-bold">Custom Order </p>
            </div>
            <div >
              <h4 className=' font-bold text-xl'>Contact Us</h4>
              <hr width="130px" className="text-white " />

              <p className="font-bold"><b>Address:</b> 5, Shahi Moriom Bibi Mosjid Market <br /> Nilkhet, Dhaka-1205</p>
              <p className="font-bold"><b>Email:</b> nilkhetboighor.2020@gamil.com</p>
              <p className="font-bold"><b>Phone:</b> 01783366160, 01771466160</p>
              <p className="font-bold flex flex-row items-center">
                <img
                  width="100px"
                  height="30px"
                  src="../../../images/footer/bkash-nagad-rocket-1.png"
                  alt="Bkash Nagad Rocket"
                />
                : 01736964867
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;