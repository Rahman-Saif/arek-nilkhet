'use client'
import React from 'react';
import { FaFacebook, FaPhoneAlt, FaTruck } from 'react-icons/fa';
import { CgMail } from "react-icons/cg";
import { SiGmail } from "react-icons/si";



const Head = () => {
  
  return (
    <>
      <div className="hidden sm:block text-white bg-[#103464] p-3">
        <div className="flex justify-around lg:flex-row">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex items-center justify-center gap-2">
              <FaPhoneAlt />
              <label>01783366160, 01771466160</label>
            </div>
            <div className="flex items-center justify-center gap-2">
              {/* <i className="fa fa-envelope mr-2 text-white"></i> */}
              {/* <CgMail /> */}
              <SiGmail />
              <label>nilkhetboighor.2020@gmail.com</label>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex items-center justify-center gap-2">
              {/* <i className="fa-solid fa-truck-fast mr-2"></i> */}
              <FaTruck />
              <label>ট্র্যাক মাই অর্ডার</label>
            </div>
            <div className="text-white ">
              <a
                href="https://www.facebook.com/Nilkhetbookshop"
                className="flex items-center justify-center gap-2"
              >
                {/* <i className="fab fa-facebook text-white mr-2"></i> */}
                <FaFacebook />
                <label className="text-white">ফেসবুক পেজ</label>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Head;
