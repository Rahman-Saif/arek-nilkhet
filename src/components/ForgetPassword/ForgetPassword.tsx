'use client'


import React from 'react';
import { useForm } from 'react-hook-form';
// import { useHistory} from 'react-router-dom';
// import { url } from '../../App';
import useAllUsers from '../../Hooks/useAllUsers';
// import { useRouter } from 'next/router';
// import { url } from '@/app/page';
import Header from '@/components/common/header/Header';
import MegaMenu from '@/components/common/MegaMenu/MegaMenu';
import Footer from '@/components/common/footer/Footer';
import { useRouter } from 'next/navigation';

export default async function ForgetPassword() {
  const {register, handleSubmit, reset, formState: {errors}} = useForm();
  const [users] = await useAllUsers();
          const url = process.env.NEXT_PUBLIC_URL;

  

  //location redirect
  const history = useRouter();
  const redirect_uri = '/reset-password';

  const onSubmit = data => {
    let phone;

    //generate otp number & saved into data
    let otp = Math.floor(Math.random() * (9999 - 1000)) + 1000;
    data.otp = otp;

    if(data?.phone_number){
      phone = users.find(user => user.phone_number === data?.phone_number);

      //if phone_number is valid then otp messeage will send 
      if(phone?.phone_number){

        //third-party otp url for reset-password
        fetch(`https://24bulksms.com/24bulksms/api/otp-api-sms-send?sender_id=377&api_key=175655169427363520230131091716pmcvWfz5GV&mobile_no=${data.phone_number}&message=Dear Customer, Your OTP for Reset Password at Nilkhet-Boighor is ${otp}&user_email=nilkhetboighor.2020@gmail.com`)
        .then((res)=>res.json())

        //post method for send_reset_otp
        fetch(`${url}/send_reset_otp/`, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(data),
        })
        .then((res) => res.json())
        .then((result) =>{
          if(result.status===400){
            alert(result.message);
          }
          else{
            window!==undefined  && window.localStorage.setItem('token', result.token.access);
            alert("OTP Send Successfully!");
            reset();
            history.push(redirect_uri);
          }
        });
      }
      
      //if phone_number is not valid then show alert messeage
      else{
        alert("Phone Number is not matched!");
        reset();
      }
    }
    
  }

  
  return (
    <>
    <Header></Header>
    <MegaMenu></MegaMenu>
    <div className="container mx-auto p-3 mb-5">
  <div className="w-full lg:w-2/3 mt-3 mx-auto">
    <p className="text-center text-3xl font-bold mb-4 mx-1 mt-4">পাসওয়ার্ড পরিবর্তন</p>
    <form className="w-3/4 mx-auto border rounded p-6 shadow" onSubmit={handleSubmit(onSubmit)}>
      
      {/* Phone Number Input */}
      <div className="flex flex-col lg:flex-row mb-3 w-full mx-auto items-center">
        <label className="lg:w-1/4 py-2">ফোন নাম্বার:</label>
        <input
          {...register("phone_number", { required: true })}
          type="text"
          pattern="[0-9]*"
          placeholder="ফোন নাম্বার লিখুন"
          className="p-2 w-full lg:w-3/4 border border-yellow-500 rounded text-base"
        />
        {errors.phone_number?.type === 'required' && (
          <p role="alert" className="text-red-500 text-sm mt-1">ফোন নাম্বার অত্যাবশ্যকিয়*</p>
        )}
      </div>
      
      {/* Submit Button */}
      <div className="flex justify-center mx-4 mb-6 mt-5">
        <input
          type="submit"
          value="পরবর্তী"
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 cursor-pointer"
        />
      </div>
    </form>
  </div>
</div>
    <Footer></Footer>
    </>
  );
}
