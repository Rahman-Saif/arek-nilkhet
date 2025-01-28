// import { url } from '@/app/page';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
// import {url} from '../../../App';
import { FiX } from 'react-icons/fi';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal } from "lucide-react";
import useGetAreas from '@/Hooks/useGetAreas';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';


const AdminGetAreas = ({order_id}:{order_id:string}) => {
  
  //  const [details, setDetails] = useState({});
  // const { id } = useRouter();
  const {register, handleSubmit, reset} = useForm();
  const history = useRouter();
  const [ selectedImage,setSelectedImage ] = useState(null);
  const [ selectedPDF,setSelectedPDF ] = useState(null);
  const [offerType, setOfferType] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [districts, setDistricts] = useState<{ id: string, name: string }[]>([]);
  const [alertContent, setAlertContent] = useState<{ trackingId: string, message: string } | null>(null);
          const url = process.env.NEXT_PUBLIC_URL;


  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(`${url}/api/order/${order_id}/`);
        if (!response.ok) {
          throw new Error('Failed to fetch order details');
        }
        const data = await response.json();
        setOrderDetails(data);
        console.log("Order details:", data);
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    };

    if (order_id) {
      fetchOrderDetails();
    }
  }, [order_id]);

  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        const response = await fetch(`${url}/get-areas/`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch districts');
        }

        const data = await response.json();
        // Assuming the response contains an array of areas with district names
        setDistricts(data.map(area => ({ id: area.id, name: area.district_name })));
      } catch (error) {
        console.error('Error fetching districts:', error);
      }
    };

    fetchDistricts();
  }, []);

  
  console.log("order details",orderDetails);

  // useEffect(() => {
  //   const matchBook = books.find((book) => book.id == id);
  //   setDetails(matchBook);
  //   setOfferType(matchBook?.offer_type);
  // }, [id, books]);

  // const [singleCategory] = useCategoryByID(details?.category);
  // const [author] = useAuthorByID(details?.author);
  // const [publisher] = usePublisherByID(details?.publisher);

  //offer_type select
  const selectOfferType = (e) =>{
    setOfferType(e.target.value);
  }

  //books updated function
  const onSubmit = async (data) => {
    let formData = new FormData();
       console.log("Delivery Option:", orderDetails?.delivery_option);
    
   
    formData.append('id', data.id);
    formData.append('name', data.name);
    formData.append('phone_number', data.phone_number);
    formData.append('optional_phone_number', data.optional_phone_number);
    formData.append('type', 'books');
    formData.append('email', data.email);
    formData.append('delivery_address', data.delivery_address);
    formData.append('delivery_charge', data.delivery_charge);
    formData.append('total', data.total);
    formData.append('delivery_option', data.delivery_option);
    formData.append('transaction_id', data.transaction_id);
    formData.append('transaction_amount', data.transaction_amount);
    formData.append('status', data.status);
    formData.append('total', data.total);
    formData.append('parcel_weight', data.parcel_weight);
    formData.append('tracking_id', data.tracking_id);
    // formData.append('purchase_price', data.purchase_price);
    // formData.append('regular_price', data.regular_price);
    // formData.append('discount_price', data.discount_price);
    // formData.append('units_stock', data.units_stock);
    // formData.append('units_sold', data.units_sold);
    // formData.append('is_active', 'true');
    // formData.append('alt_text', data.alt_text);
    
    // fetch(`${url}/api/product/${id}/`, {
    //   method: "PUT",
    //   body: formData,
    // })
    // .then(res => {
    //   if (!res.ok) throw res;
    //   else return res.json();
    // })
    // .then(getData => {
    //   // alert("Book updated Successfully!");
    //   setShowAlert(true); 
    // setTimeout(() => setShowAlert(false), 3000); 
    //   reset();
    //   history.push('/admin-books');
    // })
    // .catch(err => {
    //   err.json().then(text => {
    //     if (text?.error) {
    //       console.log(text?.error);
    //       return;
    //     }
    //   })
    //   console.log(err.statusText);
    // });
formData.forEach((value, key) => {
    console.log(`${key}: ${value}`);
  });

  const bodyData = {
      order_id: order_id, // Replace with dynamic value if needed
      parcel_weight: 2.5, // Replace with dynamic value if needed
      district_name: "Test Area", // Replace with dynamic value if needed
      delivery_area_id: 1 // Replace with dynamic value if needed
    };

    try {
      const response = await fetch(`${url}/confirm-parcel/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyData),
      });

      if (!response.ok) {
        throw new Error('Failed to confirm parcel');
      }

      const result = await response.json();
      console.log("API Response:", result);

      setAlertContent({
        trackingId: result.tracking_id,
        message: result.message,
      });

      reset();
    } catch (error) {
      console.error('Error confirming parcel:', error);
      setAlertContent({
        trackingId: '',
        message: 'Failed to confirm parcel. Please try again.',
      });
    }
    // console.log("nibooo naaa",formData);
    
  }
    // console.log("eije dekh amare",order);
  return (
    <div className="max-w-5xl mx-auto my-6 p-6 rounded-lg shadow-md bg-white">
      <h3 className="text-2xl font-semibold text-center mb-3">Get Areas</h3>
      <hr className="w-1/2 mx-auto mb-6 border-t border-gray-200" />
      <form className="max-w-4xl mx-auto" onSubmit={handleSubmit(onSubmit)}>



        <div className="grid grid-cols-4 gap-4 mb-6">
            <label className="self-center">Order ID:</label>
            <input
              {...register("id")}
              defaultValue={orderDetails?.id}
              type="text"
              placeholder="Enter book's english title"
              className="p-2 border border-green-500 rounded focus:outline-none focus:ring-1 focus:ring-green-500 "
              readOnly
            />

            <label className="self-center">Name:</label>
            <input
              {...register("name")}
              defaultValue={orderDetails?.name}
              type="text" 
              placeholder="Enter book's bangla title"
              className="p-2 border border-green-500 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
              readOnly
            />    
            <label className="self-center">Phone Number:</label>
            <input
              {...register("phone_number")}
              defaultValue={orderDetails?.phone_number}
              type="text" 
              placeholder="Enter book's bangla title"
              className="p-2 border border-green-500 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
              readOnly
            />    
            <label className="self-center">Optional Phone Number:</label>
            <input
              {...register("optional_phone_number")}
              defaultValue={orderDetails?.optional_phone_number}
              type="text" 
              placeholder="Enter book's bangla title"
              className="p-2 border border-green-500 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
              readOnly
            /> 
        </div>

        <div className="grid grid-cols-4 gap-4 mb-6">
           
                
          <label className="self-center">Email:</label>
          
             <input
              {...register("email")}
              defaultValue={orderDetails?.email}
              type="text" 
              placeholder="Enter Email"
              className="p-2 border border-green-500 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
              readOnly
            /> 
        </div>

        {orderDetails?.image && (
          <img 
            src={orderDetails?.image} 
            alt={orderDetails?.alt_text} 
            className="h-24 w-24 object-cover rounded p-2"
          />
        )} 
        <div className="grid grid-cols-4 gap-4 mb-6">
          <label className="self-center">Delivery Address:</label>
          <input
            {...register("delivery_address")}
            defaultValue={orderDetails?.delivery_address}
            type="text"
            placeholder="delivery address"
            className="p-2 border border-green-500 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
            readOnly
          />

          <label className="self-center">Delivery Charge:</label>
          <input
            {...register("delivery_charge")}
            defaultValue={orderDetails?.delivery_charge}
            type="text"
            placeholder="delivery charge"
            className="p-2 border border-green-500 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
          />
        </div>

        <div className="grid grid-cols-4 gap-4 mb-6">
          <label className="self-center">Total Amount:</label>
          <input
            {...register("total")}
            defaultValue={orderDetails?.total}
            type="text"
            placeholder="total amount"
            className="p-2 border border-green-500 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
            readOnly
          />

          <label className="self-center">Delivery Option:</label>
          <input
            {...register("delivery_option")}
            defaultValue={orderDetails?.delivery_option}
            type="text"
            placeholder="delivery option"
            className="p-2 border border-green-500 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
            readOnly
          />
        </div>
        {/* {details?.pdf && <img src={details?.image} alt={details?.alt_text} height="100px" width="100px" className="p-2"/>} */}
        {/* <div className="grid grid-cols-4 gap-4 mb-6">
          <label className="self-center">Delivery Option:</label>
          <input
            {...register("delivery_option")}
            defaultValue={orderDetails?.delivery_option}
            type="text"
            min="0"
            placeholder="delivery option"
            className="p-2 border border-green-500 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
            readOnly
          />
        </div> */}

        <div className="grid grid-cols-6 gap-4 mb-6">
          <label className="self-start">Status:</label>
          <input
            {...register("status")}
            defaultValue={orderDetails?.status}
            placeholder="status"
            className="col-span-2 p-2 border border-green-500 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
            readOnly
          />
        </div>
        <div className="grid grid-cols-4 gap-4 mb-6">
          <label className="self-center">Transaction ID:</label>
          <input
            {...register("transaction_id")}
            defaultValue={orderDetails?.transaction_id}
            type="text"
            min="0"
            placeholder="transaction id"
            className="p-2 border border-green-500 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
            readOnly
          />

          <label className="self-center">Transaction Amount:</label>
          <input
            {...register("transaction_amount")}
            defaultValue={orderDetails?.transaction_amount}
            type="number"
            min="0"
            placeholder="transaction amount"
            className="p-2 border border-green-500 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
            readOnly
          />
        </div>
        <div className="grid grid-cols-4 gap-4 mb-6">     
          <label className="self-center">Choose Delivery Area:</label>
          <select 
            className="p-2 border border-green-500 rounded focus:outline-none focus:ring-1 focus:ring-green-500" 
            {...register("district")}
            defaultValue={orderDetails?.district}
          >
            {districts.map((district) => (
              <option value={district.id} key={district.id}>
                {district.name}
              </option>
            ))}
          </select>

          <label className="self-center">Parcel Weight:</label>
             <input
                {...register("parcel_weight")}
                defaultValue={orderDetails?.parcel_weight}
                type="text"
                placeholder="Enter Parcel Weight"
                className="p-2 border border-green-500 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
          
              />
        </div>

        <div className="flex justify-center gap-4 w-1/2 mx-auto">
          <button
            type="submit"
            className="flex-1 py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
          >
            Place Order
          </button>
          <Link 
            href="/admin-books" 
            className="flex-1 inline-flex items-center justify-center gap-2 py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            Cancel <FiX className="w-4 h-4" />
          </Link>
        </div>
         {alertContent && (
        <Alert>
          <Terminal className="h-4 w-4" />
          <AlertTitle>Tracking ID: {alertContent.trackingId}</AlertTitle>
          <AlertDescription>{alertContent.message}</AlertDescription>
        </Alert>
      )}
      </form>
    
    </div>
  )
}

export default AdminGetAreas
