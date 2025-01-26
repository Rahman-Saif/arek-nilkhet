'use client'

// import { url } from '@/app/page';

import React, {useState} from 'react';
import Footer from '../common/footer/Footer';
import Header from '../common/header/Header';
import {useForm} from 'react-hook-form';
import { clearTheCart, getStoredCart } from '../../Utilities/LocalStorage';
import useLocalCart from '../../Hooks/useLocalCart';
// import { useHistory } from 'react-router-dom';
// import { url } from '../../App';
import useAllUsers from '../../Hooks/useAllUsers';
import { useRouter } from 'next/navigation';
// import { useRouter } from 'next/router';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal } from "lucide-react";
// import { useRouter } from 'next/navigation';  // Make sure this import exists


interface User {
  id: number;
  name: string;
  phone_number: string;
}

export default function Checkout({ products}) {
  const [users] = useAllUsers();
  const [deliveryOption, setDeliveryOption] = useState('');
  const [paymentOption, setPaymentOption] = useState('');
  const [deliveryCharge, setDeliveryCharge] = useState(60);
  const [showAlert, setShowAlert] = useState(false);
    const [showFailureAlert, setshowFailureAlert] = useState(false);
  const {register, handleSubmit, reset, formState: {errors}} = useForm();
  const savedCart = getStoredCart();
  const [CartItem, setCartItem] = useLocalCart(products);
  const history = useRouter();
  const router = useRouter();
          const url = process.env.NEXT_PUBLIC_URL;


  React.useEffect(() => {
    const fetchCartItems = async () => {
      const storedCart = getStoredCart();
      console.log('Stored Cart:', storedCart); // Log the stored cart

      const updatedCart = [];

      for (const itemId in storedCart) {
        if (storedCart.hasOwnProperty(itemId)) {
          try {
            const response = await fetch(`${url}/api/product/${itemId}/`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            });

            if (!response.ok) {
              throw new Error('Failed to fetch product details');
            }

            const result = await response.json();
            console.log("API Response:", result);

            // Assuming result contains the product details
            updatedCart.push({
              ...result,
              quantity: storedCart[itemId],
            });
          } catch (error) {
            console.error('Error fetching product:', error);
          }
        }
      }

      console.log('Final Updated Cart:', updatedCart);
      setCartItem(updatedCart);
    };

    fetchCartItems();
  }, [products]);

  const phone = JSON.parse(window!==undefined && window.localStorage.getItem('user'));
  // console.log("userser mayre",users);
  // console.log("phone",phone?.phone_number);
let user = users.find(user =>
  user.phone_number.replace(/\D+/g, '') === phone?.phone_number.replace(/\D+/g, '')
);
// console.log("userrrrrrrrrrrrrrrrrrrrrr",user);
  //total price calculation depending on cart items
  const totalPrice = CartItem.reduce(
    (price, item) => price + item?.quantity * (item?.discount_price || item?.regular_price), 0
  );

  //delivery option selection function
  const selectDeliveryOption = (e) =>{
    if(e.target.value==='হোম ডেলিভারি(ঢাকা সিটির ভেতরে)'){
      setDeliveryCharge(60);
    }
    if(e.target.value==='কুরিয়ার'){
      setDeliveryCharge(80);
    }
    if(e.target.value==='হোম ডেলিভারি(ঢাকা সিটির বাইরে)'){
      setDeliveryCharge(130);
    }
    setDeliveryOption(e.target.value);
  }

  //payment option selection function
  const selectPaymentOption = (e) =>{
    setPaymentOption(e.target.value);
  }

  console.log("user er baccar nam",user?.phone_number);

  //onSubmit function
  const onSubmit = data => {

    //set default name
    if(!data.name){
      data.name = user?.name;
    }
    //set default phone number
    if(!data.phone_number){
      data.phone_number = user?.phone_number;
    }
    //set cart items into orderItems 
    data.orderItems = CartItem;
    //set default savedCart
    data.savedCart = savedCart;
    //set subtotal value
    data.subtotal = totalPrice;
    //set delivery_charge
    data.delivery_charge = deliveryCharge;
    //set total value
    data.total = totalPrice+data.delivery_charge;
    //set zella value
    data.district = data.district;
    data.upazila_thana = data.upazila_thana;
    data.delivery_address = data.delivery_address;
    data.payment_option = data.payment_option;
    data.delivery_option = data.delivery_option;
    data.order_instruction = data.order_instruction;
    
    //set cash on delivery
    if(data.payment_option==='ক্যাশ অন ডেলিভারী'){
      data.cash_on_delivery = true;
    }
    else{
      data.cash_on_delivery = false;
    }
    //set default status
    data.status = "Pending";
    console.log("name:",data.name,"phone_number:",data.phone_number,"orderItems:",data.orderItems,"savedCart:",data.savedCart,"subtotal:",data.subtotal,"delivery_charge:",data.delivery_charge,
      "total:",data.total);
      console.log("cash_on_delivery:",data.cash_on_delivery,"status:",data.status,"district:",data.district,"upazila_thana:",data.upazila_thana,"delivery_address:",data.delivery_address,"payment_option:",data.payment_option,"delivery_option:",data.delivery_option,"order_instruction:",data.order_instruction)

    fetch(`${url}/checkout-via-redx/`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order: {
          user: user?.id,
          name: data.name,
          phone_number: data.phone_number,
          optional_phone_number: data.optional_phone_number,
          email: data.email,
          delivery_address: data.delivery_address,
          district: data.district,
          upazila_thana: data.upazila_thana,
          order_instruction: data.order_instruction,
          delivery_option: data.delivery_option,
          payment_option: data.payment_option,
          cash_on_delivery: data.cash_on_delivery,
          bkash_transaction_ID:  null,
          nagad_transaction_ID:  null,
          rocket_transaction_ID:  null,
          transaction_amount: totalPrice + deliveryCharge,
          subtotal: totalPrice,
          delivery_charge: deliveryCharge,
          total: totalPrice + deliveryCharge,
          status: "Pending"
        },
        order_items: CartItem.map(item => ({
          product: item.id,
          quantity: item.quantity
        }))
      })
    })
    .then((res)=> res.json())
    .then((result) => {
      console.log("resulttttttttt:", result);
      console.log("result.order_id:", result.order_id);
      if(result.status===200 && result.order_id !== null && data.payment_option !== 'অনলাইন পেমেন্ট'){
        setShowAlert(true); // Show alert when an item is added
        setTimeout(() => setShowAlert(false), 3000);
        router.push('/');
      }
      else{
         setshowFailureAlert(true);
      setTimeout(() => setshowFailureAlert(false), 3000);
        reset();
      }

      if(data.payment_option === 'অনলাইন পেমেন্ট' && result.order_id !== null) {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
          "order_id": result.order_id  // Use the actual order ID from the response
        });

        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow" as RequestRedirect
        };

        console.log("Sending payment request with:", raw); // Log request data

        fetch(`${url}/payment-initiate/`, requestOptions)
          .then((response) => {
            console.log("Response status:", response.status); // Log response status
            return response.json(); // Parse as JSON instead of text
          })
          .then((result) => {
            console.log("Payment initiation response:", result);
            if (result.GatewayPageURL) {
              console.log("result.GatewayPageURL",result.GatewayPageURL);
              window !== undefined && (window.location.href = result.GatewayPageURL);
            }
          })
          .catch((error) => {
            console.error("Payment initiation error:", error);
            // setshowFailureAlert(true);
          });
      }
    })
    //   else{

        // let message = `Nilkhet Boi Ghor, Dear ${data.name}, Your Order is placed successfully . We will contact soon. To Buy more www.nilkhetboighor.com`

        // //third-party url for order placed
        // fetch(`https://24bulksms.com/24bulksms/api/otp-api-sms-send?sender_id=377&api_key=175655169427363520230131091716pmcvWfz5GV&mobile_no=${data.phone_number}&message=${message}&user_email=nilkhetboighor.2020@gmail.com`)
        // .then((res)=>res.json())

        // alert('অভিনন্দন আপনার অর্ডারটি সফলভাবে প্লেসড হয়েছে। দ্রুত ডেলিভারির ব্যবস্থা করা হবে।');
        // clearTheCart();
        // reset();
        // history.push('/order');
      // }
    // });
  }

  return (
    <>
    <Header ></Header>
    <section className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h4 className="text-xl font-semibold text-center py-3 bg-[#103464] text-white rounded-md mb-6">
            বিলিং এড্রেস
          </h4>

          
          <form className="container " onSubmit={handleSubmit(onSubmit)} >

            
            <div className="space-y-4">
              {/* Name Field */}
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <label className="w-full md:w-1/3 text-sm font-medium text-gray-700">
                  নাম :
                </label>
                <div className="w-full md:w-2/3">
                  <input
                    {...register("name")}
                    defaultValue={user?.name}
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  {errors.name?.type === 'required' && 
                    <p className="mt-1 text-sm text-red-600">নাম অত্যাবশ্যকিয়*</p>
                  }
                </div>
              </div>

              {/* Phone Number Field */}
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <label className="w-full md:w-1/3 text-sm font-medium text-gray-700">
                  ফোন নাম্বার :
                </label>
                <div className="w-full md:w-2/3">
                  <input
                    {...register("phone_number")}
                    defaultValue={user?.phone_number}
                    type="text"
                    disabled={true}
                    className="w-full px-3 py-2 border border-red-500 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Alternative Phone Number Field */}
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <label className="w-full md:w-1/3 text-sm font-medium text-gray-700">
                  বিকল্প ফোন নাম্বার :
                </label>
                <div className="w-full md:w-2/3">
                  <input
                    {...register("optional_phone_number")}
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <label className="w-full md:w-1/3 text-sm font-medium text-gray-700">
                  ই-মেইল:
                </label>
                <div className="w-full md:w-2/3">
                  <input
                    {...register("email")}
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>



            <div className="flex flex-col md:flex-row md:items-center gap-4 mt-4 mb-4">
              <label className="w-full md:w-1/3 text-sm font-medium text-gray-700 ">জেলা:</label>
              <input
                {...register("district", {required: true})}
                type="text"
                placeholder="জেলার নাম লিখুন"
                className="w-full md:w-2/3 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.district?.type === 'required' && 
                <p className="mt-1 text-sm text-red-600">জেলা অত্যাবশ্যকিয়*</p>
              }
            </div>
            <div className="flex flex-col md:flex-row md:items-center gap-4  mb-4">
              <label className="w-full md:w-1/3 text-sm font-medium text-gray-700 ">উপজেলা/ থানা:</label>
              <input
                {...register("upazila_thana", {required: true})}
                type="text"
                placeholder="উপজেলা/ থানার নাম লিখুন"
                className="w-full md:w-2/3 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.upazila_thana?.type === 'required' && 
                <p className="mt-1 text-sm text-red-600">উপজেলা/ থানা অত্যাবশ্যকিয়*</p>
              }
            </div>
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
              <label className="w-full md:w-1/3 text-sm font-medium text-gray-700 ">ডেলিভারি এড্রেস:</label>
              <input
                {...register("delivery_address", {required: true})}
                type="text"
                placeholder="বাসা/ফ্লাট নং, রাস্তা নং, এলাকার নাম লিখুন"
                className="w-full md:w-2/3 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.delivery_address?.type === 'required' && 
                <p className="mt-1 text-sm text-red-600">ডেলিভারি এড্রেস অত্যাবশ্যকিয়*</p>
              }
            </div>
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
              <label className="w-full md:w-1/3 text-sm font-medium text-gray-700">
                ডেলিভারি অপশন:
              </label>
              <div className="w-full md:w-2/3">
                <select
                  {...register("delivery_option", {required: true})}
                  onChange={(e)=>selectDeliveryOption(e)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="" disabled selected>একটি ডেলিভারি অপশন নির্বাচন করুন</option>
                  <option value="হোম ডেলিভারি(ঢাকা সিটির ভেতরে)">হোম ডেলিভারি(ঢাকা সিটির ভেতরে)</option>
                  <option value="কুরিয়ার">কুরিয়ার(ফুল পেমেন্ট করতে হবে)</option>
                  <option value="হোম ডেলিভারি(ঢাকা সিটির বাইরে)">হোম ডেলিভারি(ঢাকা সিটির বাইরে, নুন্যতম ডেলিভারি চার্জ আগে পে করতে হবে)</option>
                </select>
                {errors.delivery_option?.type === 'required' && 
                  <p className="mt-1 text-sm text-red-600">ডেলিভারি অপশন অত্যাবশ্যকিয়*</p>
                }
              </div>
            </div>



                 
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
              <label className="w-full md:w-1/3 text-sm font-medium text-gray-700">
                পেমেন্ট অপশন:
              </label>
              <div className="w-full md:w-2/3">
                <select 
                  {...register("payment_option", {required: true})}
                  onChange={(e)=>selectPaymentOption(e)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="" disabled selected>একটি পেমেন্ট অপশন নির্বাচন করুন</option>
                  <option value="ক্যাশ অন ডেলিভারী">ক্যাশ অন ডেলিভারী</option>
                  {/* <option value="বিকাশ পেমেন্ট">বিকাশ পেমেন্ট</option>
                  <option value="নগদ পেমেন্ট">নগদ পেমেন্ট</option>
                  <option value="রকেট পেমেন্ট">রকেট পেমেন্ট</option> */}
                  <option value="অনলাইন পেমেন্ট">অনলাইন পেমেন্ট</option>
                </select>
                {errors.payment_option?.type === 'required' && 
                  <p className="mt-1 text-sm text-red-600">পেমেন্ট অপশন অত্যাবশ্যকিয়*</p>
                }
              </div>
            </div>

            {/* Bkash Payment Section */}
            {/* {paymentOption === 'বিকাশ পেমেন্ট' && (
              <div className="space-y-4">
                <p className="text-green-600 font-medium text-sm">
                  নীলক্ষেত বইঘর এর পারসোনাল নাম্বার <span className="text-red-600 font-bold">01736964867</span> এ 
                  <span className="text-red-600 font-bold"> Send Money</span> করে ট্রানসেকশন আইডি লিখে অর্ডার প্লেস করুন*
                </p>
                
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <label className="w-full md:w-1/3 text-sm font-medium text-gray-700">
                    বিকাশ পেমেন্ট আইডি:
                  </label>
                  <div className="w-full md:w-2/3">
                    <input
                      {...register("bkash_transaction_ID", {required: true})}
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.bkash_transaction_ID?.type === 'required' && 
                      <p className="mt-1 text-sm text-red-600">বিকাশ পেমেন্ট আইডি অত্যাবশ্যকিয়*</p>
                    }
                  </div>
                </div>

                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <label className="w-full md:w-1/3 text-sm font-medium text-gray-700">
                    পেমেন্ট এমাউন্ট:
                  </label>
                  <div className="w-full md:w-2/3">
                    <input
                      {...register("transaction_amount", {required: true})}
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.transaction_amount?.type === 'required' && 
                      <p className="mt-1 text-sm text-red-600">পেমেন্ট এমাউন্ট অত্যাবশ্যকিয়*</p>
                    }
                  </div>
                </div>
              </div>
            )} */}

            {/* Nagad Payment Section */}
            {/* {paymentOption === 'নগদ পেমেন্ট' && (
              <div className="space-y-4">
                <p className="text-green-600 font-medium text-sm">
                  নীলক্ষেত বইঘর এর পারসোনাল নাম্বার <span className="text-red-600 font-bold">01736964867</span> এ 
                  <span className="text-red-600 font-bold"> Send Money</span> করে ট্রানসেকশন আইডি লিখে অর্ডার প্লেস করুন*
                </p>
                
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <label className="w-full md:w-1/3 text-sm font-medium text-gray-700">
                    নগদ পেমেন্ট আইডি:
                  </label>
                  <div className="w-full md:w-2/3">
                    <input
                      {...register("nagad_transaction_ID", {required: true})}
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.nagad_transaction_ID?.type === 'required' && 
                      <p className="mt-1 text-sm text-red-600">নগদ পেমেন্ট আইডি অত্যাবশ্যকিয়*</p>
                    }
                  </div>
                </div>

                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <label className="w-full md:w-1/3 text-sm font-medium text-gray-700">
                    পেমেন্ট এমাউন্ট:
                  </label>
                  <div className="w-full md:w-2/3">
                    <input
                      {...register("transaction_amount", {required: true})}
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.transaction_amount?.type === 'required' && 
                      <p className="mt-1 text-sm text-red-600">পেমেন্ট এমাউন্ট অত্যাবশ্যকিয়*</p>
                    }
                  </div>
                </div>
              </div>
            )} */}

            {/* Rocket Payment Section */}
            {/* {
            paymentOption === 'রকেট পেমেন্ট' && (
              <div className="space-y-4">
                <p className="text-green-600 font-medium text-sm">
                  নীলক্ষেত বইঘর এর পারসোনাল নাম্বার <span className="text-red-600 font-bold">01736964867</span> এ 
                  <span className="text-red-600 font-bold"> Send Money</span> করে ট্রানসেকশন আইডি লিখে অর্ডার প্লেস করুন*
                </p>
                
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <label className="w-full md:w-1/3 text-sm font-medium text-gray-700">
                    রকেট পেমেন্ট আইডি:
                  </label>
                  <div className="w-full md:w-2/3">
                    <input
                      {...register("rocket_transaction_ID", {required: true})}
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.rocket_transaction_ID?.type === 'required' && 
                      <p className="mt-1 text-sm text-red-600">রকেট পেমেন্ট আইডি অত্যাবশ্যকিয়*</p>
                    }
                  </div>
                </div>

                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <label className="w-full md:w-1/3 text-sm font-medium text-gray-700">
                    পেমেন্ট এমাউন্ট:
                  </label>
                  <div className="w-full md:w-2/3">
                    <input
                      {...register("transaction_amount", {required: true})}
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.transaction_amount?.type === 'required' && 
                      <p className="mt-1 text-sm text-red-600">পেমেন্ট এমাউন্ট অত্যাবশ্যকিয়*</p>
                    }
                  </div>
                </div>
              </div>
            )} */}

            {/* Order Instructions */}
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <label className="w-full md:w-1/3 text-sm font-medium text-gray-700">
                অর্ডার ইর্দেশনা:
              </label>
              <div className="w-full md:w-2/3">
                <input
                  {...register("order_instruction")}
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className="px-8 py-2 bg-[#103464] text-white rounded-md hover:bg-[#103464] focus:ring-2 focus:ring-blue-200 focus:ring-offset-2"
              >
                চেকআউট
              </button>
            </div>
          </form>
        </div>
        <div className="col bg-white  p-2  ">
          <div className="container w-100 mx-auto">
            <h4 className="text-center p-2 border-bg text-white bg-[#103464]">অর্ডার সামারী</h4>
            <div className=" p-2 border-0 rounded shadow mb-4 bg-white table-responsive ">
              <table className="mb-3 table ">
                <thead className="mb-6 ">
                  <tr className="heading  ">
                    <th scope="col  ">প্রোডাক্ট</th>
                    <th scope="col   ">মূল্য</th>
                  </tr>
                </thead>
                <tbody className='text-left  '>
                  {CartItem.map((item) => (
                    <tr key={item.id} className='text-left '>
                      <td className='text-base  '>{item.english_title} * {item.quantity}</td>
                      <td className='text-base px-8 '>{item?.discount_price || item.regular_price * item.quantity} টাকা</td>
                    </tr>
                  ))}
                  <tr>
                    <td className='font-bold'>প্রোডাক্টের মোট মূল্য</td>
                    <td className='px-8'>{totalPrice} টাকা</td>
                  </tr>
                  <tr>
                    <td className='font-bold'>পরিবহন চার্জ</td>
                    <td className='px-8'>{deliveryCharge} টাকা</td>
                  </tr>
                  <tr>
                    <td className='font-bold text-dark fs-6'>সর্বোমোট</td>
                    <td className='font-bold text-dark fs-6 px-8'>{totalPrice+deliveryCharge} টাকা</td>
                  </tr> 
                </tbody>
              </table>
            </div>
          </div>
        </div>

        
      </div>
    </section>
    {showAlert && (
      <Alert className="fixed bottom-4 right-4 w-96 bg-[#fac309] opacity-70 border border-green-300 rounded-lg p-4 shadow-lg">
        <Terminal className="h-4 w-4 text-white" />
        <AlertTitle className="text-black">Success</AlertTitle>
        <AlertDescription className="text-black">Your order has been placed successfully.</AlertDescription>
      </Alert>
    )}

     {showFailureAlert && (
        <Alert className="fixed bottom-4 right-4 w-96 bg-[#fac309] opacity-70 border border-blue-300 rounded-lg p-4 shadow-lg">
          <Terminal className="h-4 w-4 text-black" />
          <AlertDescription className="text-black">
            Sorry! Product not ordered
          </AlertDescription>
        </Alert>
      )}
   
    <Footer></Footer>
    </>
  )
}
