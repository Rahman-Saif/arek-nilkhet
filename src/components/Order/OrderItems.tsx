'use client'
import React from 'react';
import useUserOrderItems from '../../Hooks/useUserOrderItems';
import OrderItem from './OrderItem';
// import './Order.css';


const OrderItems =({order})=> {
  const [orderItems] = useUserOrderItems(order.id);
  console.log("kire vhaiya",order);

  return (
   <div className="col">
  <div className="bg-white overflow-x-auto border rounded mb-3 p-3 shadow">
    <div className="row mt-3 mb-3 text-gray-800">
      <div className="col lg:w-7/12 md:w-7/12 sm:w-5/12 text-left">
        <h6 className="text-[#0f3460] font-semibold">Order Info.</h6>
        <h6 className="text-[#0f3460]">Order ID: {order?.id}</h6>
        <h6 className="text-[#0f3460]">Placed: {order?.date}</h6>
        <h6 className="text-[#0f3460]">Delivery Method: {order?.delivery_option}</h6>
        <h6 className="text-[#0f3460]">Payment Method: {order?.payment_option}</h6>
        {/* {order?.payment_option === 'বিকাশ পেমেন্ট' && ( */}
          <>
            <h6 className="text-[#0f3460]">Transaction ID: {order?.transaction_id}</h6>
            <h6 className="text-[#0f3460]">Transaction Amount: {order?.transaction_amount}</h6>
            <h6 className="text-[#0f3460]">Tracking  Id: {order?.tracking_id}</h6>
          </>
        {/* )} */}
        {/* {order?.payment_option === 'নগদ পেমেন্ট' && (
          <>
            <h6 className="text-[#0f3460]">Transaction ID: {order?.nagad_transaction_ID}</h6>
            <h6 className="text-[#0f3460]">Transaction Amount: {order?.transaction_amount}</h6>
          </>
        )} */}
        {/* {order?.payment_option === 'রকেট পেমেন্ট' && (
          <>
            <h6 className="text-[#0f3460]">Transaction ID: {order?.rocket_transaction_ID}</h6>
            <h6 className="text-[#0f3460]">Transaction Amount: {order?.transaction_amount}</h6>
          </>
        )} */}
        <h6 className="text-[#0f3460]">Status: {order?.status}</h6>
      </div>
      <div className="col lg:w-5/12 md:w-5/12 sm:w-7/12 text-left">
        <h6 className="text-[#0f3460] font-semibold">Delivery Info.</h6>
        <h6 className="text-[#0f3460]">Name: {order?.name}</h6>
        <h6 className="text-[#0f3460]">
          Address: {order?.delivery_address}, {order?.upazila_thana}, {order?.district}
        </h6>
        <h6 className="text-[#0f3460]">Phone: {order?.phone_number}</h6>
        {order?.email && <h6 className="text-[#0f3460]">Email: {order?.email}</h6>}
      </div>
    </div>
    <table className="w-full text-gray-800">
      <thead className="bg-[#0f3460] text-white">
        <tr>
          <th className="text-left p-2">Product</th>
          <th className="text-center p-2">Quantity</th>
          <th className="text-right p-2">Unit Price</th>
          <th className="text-right p-2">Total Price</th>
        </tr>
      </thead>
      <tbody>
        {orderItems.map((orderItem) => (
          <OrderItem key={orderItem.id} orderItem={orderItem} />
        ))}
      </tbody>
      <tfoot>
        <tr className="text-center">
          <td colSpan="2"></td>
          <td className="text-left text-[#0f3460] font-semibold p-2">Subtotal</td>
          <td className="text-right p-2">{order?.subtotal} টাকা</td>
        </tr>
        <tr className="text-center">
          <td colSpan="2"></td>
          <td className="text-left text-[#0f3460] font-semibold p-2">Delivery Charge</td>
          <td className="text-right p-2">{order?.delivery_charge} টাকা</td>
        </tr>
        <tr className="text-center bg-gray-100">
          <td colSpan="2"></td>
          <td className="text-left text-[#0f3460] font-bold p-2">Total</td>
          <td className="text-right font-bold p-2">{order?.total} টাকা</td>
        </tr>
      </tfoot>
    </table>
  </div>
</div>

  );
}

export default OrderItems;