import { useContext } from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { ShoppingCartContext } from '../../Context';
import OrderCard from '../OrderCard';
import './styles.css';

const CheckoutMenu = () => {
  const { isCheckoutMenu, closeCheckoutMenu, cartProducts, setCartProducts } = useContext(ShoppingCartContext);

  const handleDelete = (id) => {
    const deletedProduct = cartProducts.filter(product => product.id != id);
    setCartProducts(deletedProduct);
  }

  return (
    <aside
      className={`${isCheckoutMenu ? 'flex' : 'hidden'} checkout-detail flex-col fixed right-0 bg-[#f7f3ff]`}>
      <div className='flex justify-between items-center p-3'>
        <h2 className='font-medium text-medium'>My Order</h2>
        <div>
          <XMarkIcon
            className='h-4 w-4 text-black cursor-pointer'
            onClick={() => closeCheckoutMenu()}></XMarkIcon>
        </div>
      </div>
      <div className='px-6 overflow-y-scroll'>
        {
          cartProducts.map(product => (
            <OrderCard
              key={product.id}
              id={product.id}
              title={product.title}
              imageUrl={product.image}
              price={product.price}
              handleDelete={handleDelete}
            />
          ))
        }
      </div>
    </aside>
  )
}

export default CheckoutMenu