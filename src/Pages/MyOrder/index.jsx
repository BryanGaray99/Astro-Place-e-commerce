import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeftIcon } from '@heroicons/react/24/solid';
import Layout from '../../Components/Layout';
import { ShoppingCartContext } from '../../Context';
import MyOrderCard from '../../Components/MyOrderCard';
import { totalPrice } from '../../Utils/sum';

function MyOrder() {
  const {order} = useContext(ShoppingCartContext);

  // Como cada órden tiene un índice, vamos a capturar ese índice que aparece en la ruta y en base a ese índice
  // hacemos el renderizado de la órden "My Order"
  const currentOrderPath = window.location.pathname; 
  let index = currentOrderPath.substring(currentOrderPath.lastIndexOf('/') + 1);
  if (index === 'last') index = order?.length-1;
  // console.log(index);

  const lastOrderProducts = order?.[index]?.products;
  const dateTime = order?.[index]?.dateTime;


  return (
    <Layout>
      <div className='flex md:w-[50%] h-[calc(100vh_-_140px)] rounded-br-2xl rounded-bl-2xl 
                      border-t-4 border-t-[#e5d8ff] border-solid top-[90px] flex-col fixed bg-[#ffffff]'>
        <div className='items-center relative mt-4'>
          <Link to='/my-orders' className='absolute left-0 top-1 px-2'>
            <ChevronLeftIcon className='h-6 w-6 text-black cursor-pointer' />
          </Link>
          <p className='text-lg font-medium text-center'>My Order</p>
          <p className='text-sm font-sm text-right mt-4 px-2'>Date: {dateTime}</p>
        </div>

        <div className='mt-4 overflow-y-scroll px-2 flex-1'>
          {
            lastOrderProducts.map(product => (
              <MyOrderCard
                key={product.id}
                id={product.id}
                title={product.title}
                imageUrl={product.image}
                price={product.price}
                quantity={product.quantity}
              />
            ))
          }
        </div>
        {/* Footer */}
        <div className='px-2 mt-4 mb-4'>
          <p className='flex justify-between items-center mb-2'>
            <span className='font-light text-lg'>Total:</span>
            <span className='font-medium text-lg'>${totalPrice(lastOrderProducts)}</span>
          </p>
        </div>
      </div>
    </Layout>
  );
}

export default MyOrder