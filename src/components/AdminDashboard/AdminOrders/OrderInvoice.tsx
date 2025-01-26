'use client'
import React, { useRef } from 'react';
// import { NavLink, useParams } from 'react-router-dom';
import useOrderByID from '../../../Hooks/CallByID/useOrderByID';
import useUserOrderItems from '../../../Hooks/useUserOrderItems';
import OrderItem from '../../Order/OrderItem';
import { useReactToPrint } from 'react-to-print';
import logo from '../../assets/images/book-logo.png';
import { useRouter } from 'next/router';
import Link from 'next/link';

const OrderInvoice = () => {
    const { id } = useRouter();
    const [order] = useOrderByID(id);
    const [orderItems] = useUserOrderItems(id);
    const componentRef = useRef();

    //react-print function
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    return (
        <div className='container w-75 mx-auto m-5'>
            <div ref={componentRef} className="bg-white table-responsive border rounded mb-3 p-3">
                <div className='row mt-2 mb-2 fw-medium'>
                    <div className='col-2 '>
                        <img
                            src={logo}
                            height="80px"
                            width="80px"
                            alt="Nilkhet Boighor"
                        />
                    </div>
                    <div className='col-10  heading text-start pt-2 '>
                        <span className='d-block text-start fs-small'>Nilkhet Boighor, 5,Shahi Moriom Bibi Mosjid Market Nilkhet,Dhaka-1205</span>
                        <span className='d-block text-start fs-small'>Phone: 01783366160, 01771466160</span>
                        <span className='d-block text-start fs-small'>Email: nilkhetboighor.2020@gamil.com</span>
                    </div>
                </div>
                <hr className='heading'/>
                <div className='row mt-3 mb-3 text-dark'>
                    <div className='col col-lg-7 col-md-7 col-sm-7 text-start'>
                        <h6 className='heading fw-bold'>Order Info.</h6>
                        <h6 className='heading'>Order ID : {order?.id}</h6>
                        <h6 className='heading'>Placed : {order?.date}</h6>
                        <h6 className='heading'>Delivery Method : {order?.delivery_option}</h6>
                        <h6 className='heading'>Payment Method : {order?.payment_option}</h6>
                        {order?.payment_option==='বিকাশ পেমেন্ট' &&
                        <>
                        <h6 className='heading'>Transaction ID : {order?.bkash_transaction_ID}</h6>
                        <h6 className='heading'>Transaction Amount : {order?.transaction_amount}</h6>
                        </>
                        }
                        {order?.payment_option==='নগদ পেমেন্ট' &&
                        <>
                        <h6 className='heading'>Transaction ID : {order?.nagad_transaction_ID}</h6>
                        <h6 className='heading'>Transaction Amount : {order?.transaction_amount}</h6>
                        </>
                        }
                        {order?.payment_option==='রকেট পেমেন্ট' &&
                        <>
                        <h6 className='heading'>Transaction ID : {order?.rocket_transaction_ID}</h6>
                        <h6 className='heading'>Transaction Amount : {order?.transaction_amount}</h6>
                        </>
                        }
                        <h6 className='heading'>Total Product : {orderItems.length} Items</h6>
                    </div>
                    <div className='col col-lg-5 col-md-5 col-sm-5 text-start'>
                        <h6 className='heading fw-bold'>Delivery Info.</h6>
                        <h6 className='heading'>Name : {order?.name}</h6>
                        <h6 className='heading'>Address : {order?.delivery_address}, {order?.upazila_thana}, {order?.district}</h6>
                        <h6 className='heading'>Phone : {order?.phone_number}</h6>
                        {order?.email && <h6>Email : {order?.email}</h6>}
                    </div>
                </div>
                <table className="mb-3 table striped bordered table-striped">
                    <thead className="text-white border-bg">
                        <tr >
                        <th scope="col" className='text-start'>Product</th>
                        <th scope="col"  className='text-center'>Quantity</th>
                        <th scope="col"  className='text-end'>Unit Price</th>
                        <th scope="col"  className='text-end'>Total Price</th>
                        </tr>
                    </thead>
                    <tbody className='text-start'>
                        {orderItems.map((orderItem) => (
                        <OrderItem key={orderItem.id} orderItem={orderItem}></OrderItem>
                        ))}
                    </tbody>
                    <tfoot className=''>
                        <tr className='text-center'>
                        <td></td>
                        <td></td>
                        <td className='text-start heading'>Subtotal</td>
                        <td className='text-end heading'>{order?.subtotal} টাকা</td>
                        </tr>
                        <tr className='text-center'>
                        <td></td>
                        <td></td>
                        <td className='text-start heading'>Delivery Charge</td>
                        <td className='text-end heading'>{order?.delivery_charge} টাকা</td>
                        </tr>
                        <tr className='text-center bg-light'>
                        <td></td>
                        <td></td>
                        <td className='text-start heading fw-bold'>Total</td>
                        <td className='text-end heading fw-bold'>{order?.total} টাকা</td>
                        </tr>
                    </tfoot>
                </table>
                <p className='text-secondary'>Thank you for your order.</p>
            </div> 
            <div className='d-flex w-50 mx-auto'>
                <button
                className="btn w-50 border-bg rounded m-3 text-white"
                onClick={handlePrint}
                >Print <i className="fa-solid fa-print"></i>
                </button>
                <Link href='/admin-orders' className='btn btn-danger w-50 border border-danger rounded m-3 text-white'>Cancel <i className="fa-solid fa-close"></i></Link>
            </div>   
        </div>
    );
};

export default OrderInvoice;