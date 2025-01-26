"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { FaX, FaCheck, FaClock, FaHouse } from "react-icons/fa6";

export default function Page() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const transactionId = searchParams.get("transaction_id");
  //transaction id nibo 


  if (!id) {
    return (
      <div>
        <h1>Order not found</h1>
        <Link href="/" className="bg-black rounded-xl px-4 py-2 text-white">
          {/* <FaHouse /> */}
        </Link>
      </div>
    );
    //toast.error("Order not found");
    // router.push("/");
  }

  // useEffect(() => {
  //   setTimeout(() => {
  //     router.push("/");
  //   }, 5000);
  // }, [router]);

  return (
    // <div>
    //   {/* {status === "pending" && <FaClock className="text-orange-400" />}
    //   {status === "success" && <FaCheck className="text-green-400" />}
    //   {status === "failed" && <FaX className="text-red-400" />} */}
    //   <h1>
    //     Your order {id} is {status}
    //   </h1>
      
    // </div>

    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div
        className={`w-96 bg-white rounded-lg shadow-xl p-6 text-center ${
          status === "success" 
            ? "border-green-500" 
            : status === "failed"
            ? "border-red-500"
            : "border-yellow-500"  // for pending status
        } border-4`}
      >
        {status === "success" && (
          <>
            <div className="text-green-500 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 mx-auto"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-7.172 7.172a1 1 0 01-1.414 0L3.293 8.707a1 1 0 011.414-1.414L9 11.586l6.293-6.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-green-600 mb-2">
              Payment Successful!
            </h1>
            <div className="text-gray-700">
                <p className="text-sm">Transaction ID: {transactionId}</p>
                <p className="text-sm">Order ID: {id}</p>
              Thank you for your payment. Your transaction was completed
              successfully.
            </div>
            <button className="bg-green-600 text-white px-4 py-2 mt-2 rounded-md" onClick={()=>router.push("/")}>Back to Home</button>
          </>
        )}
        {status === "failed" && (
          <>
            <div className="text-red-500 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 mx-auto"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11V5a1 1 0 10-2 0v2H5a1 1 0 100 2h4v4a1 1 0 102 0v-4h4a1 1 0 100-2h-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-red-600 mb-2">
              Payment Failed!
            </h1>
            <div className="text-gray-700">
                  <p className="text-sm">Transaction ID: {transactionId}</p>
                <p className="text-sm">Order ID: {id}</p>
              Unfortunately, your payment could not be processed. Please try
              again later.
            </div>
                <button className="bg-red-600 text-white px-4 py-2 mt-2 rounded-md" onClick={()=>router.push("/checkout")}>Back to Home</button>

          </>
        )}
         {status === "pending" && (
          <>
            <div className="text-yellow-500 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 mx-auto"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-4a1 1 0 11-2 0v-4a1 1 0 011-1h2a1 1 0 110 2h-1v3z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-yellow-600 mb-2">
              Payment Pending!
            </h1>
            <div className="text-gray-700">
                 <p className="text-sm">Transaction ID: {transactionId}</p>
                <p className="text-sm">Order ID: {id}</p>
              Your payment is being processed. Please wait for confirmation.
            </div>
                            <button className="bg-yellow-600 text-white px-4 py-2 mt-2 rounded-md" onClick={()=>router.push("/")}>Back to Home</button>

          </>
        )}
      </div>
    </div>
  );
}