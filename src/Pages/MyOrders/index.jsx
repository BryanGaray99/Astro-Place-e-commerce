import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import { XMarkIcon } from '@heroicons/react/24/solid'
import Layout from '../../Components/Layout';
import OrdersCard from '../../Components/OrdersCard';
import { ShoppingCartContext } from '../../Context';

function MyOrders() {
  const {order, removeOrder, setSearchByTitle} = useContext(ShoppingCartContext);

  const handleRemoveOrder = (index) => {
    removeOrder(index);
  };

  return (
    <Layout>
      <div className='flex items-center flex-col w-[50%] h-[calc(100vh_-_140px)] top-[90px] fixed rounded-br-2xl rounded-bl-2xl 
                      border-t-4 border-t-[#e5d8ff] border-solid  bg-[#ffffff]'>
        <div className='items-center relative mt-4'>
          <p className='text-lg font-medium text-center'>My Orders</p>
        </div>
        {/* Body */}
        <div className={`${(order.length > 3 ) ? 'overflow-y-scroll' : ''} mt-4 px-2 flex-1`} onClick={setSearchByTitle(null)}>
          {
            order.map((orderItem, index) => (
              <div key={index} className='flex gap-4'>
                <Link to={`/my-orders/${index}`}>
                  <OrdersCard
                    dateTime={orderItem.dateTime}
                    totalPrice={orderItem.totalPrice}
                    quantityProducts={orderItem.quantityProducts}
                  />
                </Link>
                <button className='relative flex items-center justify-end gap-2' onClick={() => handleRemoveOrder(index)}>
                  <XMarkIcon className='cursor-pointer text-white h-5 w-5 rounded-full bg-[#a88ce0]' />
                </button>
              </div>
            ))
          }
        </div>
      </div>
    </Layout>
  );
}

export default MyOrders