import { useContext } from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { ShoppingCartContext } from '../../Context';
import OrderCard from '../OrderCard';
import './styles.css';

const CheckoutMenu = () => {
  const { isCheckoutMenu, closeCheckoutMenu, cartProducts } = useContext(ShoppingCartContext);

  return (
    <aside
      className={`${isCheckoutMenu ? 'flex' : 'hidden'} checkout-detail scrollable-cards flex-col fixed right-0  bg-[#f7f3ff]`}>
      <div className='flex justify-between items-center p-6'>
        <h2 className='font-medium text-xl'>My Order</h2>
        <div>
          <XMarkIcon
            className='h-6 w-6 text-black cursor-pointer'
            onClick={() => closeCheckoutMenu()}></XMarkIcon>
        </div>
      </div>
      <div className='px-6'>
        {
          cartProducts.map(product => (
            <OrderCard
              key={product.id}
              title={product.title}
              imageUrl={product.images}
              price={product.price}
            //   quantity={product.quantity}
            />
          ))
        }
      </div>
    </aside>
  )
}

export default CheckoutMenu