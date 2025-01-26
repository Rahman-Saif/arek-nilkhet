import React from 'react';
import useProductByID from '../../Hooks/CallByID/useProductByID';

const OrderItem=({orderItem})=> {

    const [product] = useProductByID(orderItem.product);

    return (
        <>
        <tr key={orderItem.id}>
            <td className='text-start'>{product?.english_title}</td>
            <td className='text-center'>{orderItem?.quantity}</td>
            {product?.discount_price ?
            <td className='text-end'>{product?.discount_price} টাকা</td>
            :
            <td className='text-end'>{product?.regular_price} টাকা</td>
            }
            {product?.discount_price ?
            <td className='text-end'>{product?.discount_price*orderItem?.quantity} টাকা</td>
            :
            <td className='text-end'>{product?.regular_price*orderItem?.quantity} টাকা</td>
            }
        </tr>
        </>
    );
}

export default OrderItem;