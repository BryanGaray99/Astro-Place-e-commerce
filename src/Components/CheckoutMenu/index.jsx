import { useContext } from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { ShoppingCartContext } from '../../Context';
import { totalPrice } from '../../Utils';
import OrderCard from '../OrderCard';
import './styles.css';

const CheckoutMenu = () => {
  const { openCartMenu, setOpenCartMenu, cartProducts, setCartProducts } = useContext(ShoppingCartContext);

  const handleDelete = (id) => {
    const deletedProduct = cartProducts.filter(product => product.id != id);
    setCartProducts(deletedProduct);
  }

  const increaseQuantity = (id, quantity) => {
    const productCart = cartProducts.find(cartItem => cartItem.id === id);
    productCart.quantity += 1;
    setCartProducts([...cartProducts]); // Causar un renderizado actualizando el estado
  }

  const decreaseQuantity = (id, quantity) => {
    const deletedProduct = cartProducts.filter(product => product.id != id);
    const productCart = cartProducts.find(cartItem => cartItem.id === id);
    productCart.quantity -= 1;
    setCartProducts([...cartProducts]); 
    if (productCart.quantity === 0){
      setCartProducts(deletedProduct);
    } 
  }

  return (
    <aside className={`${openCartMenu ? 'flex' : 'hidden'} checkout-detail flex-col fixed right-0 bg-[#f7f3ff]`}>
      {/* Header */}
      <div className='flex justify-between items-center p-3'>
        <h2 className='font-medium text-medium'>My Order</h2>
        <div>
          <XMarkIcon
            className='h-4 w-4 text-black cursor-pointer'
            onClick={() => setOpenCartMenu(state => !state)}></XMarkIcon>
        </div>
      </div>
      {/* Body */}
      <div className='px-2 overflow-y-scroll'>
        {
          cartProducts.map(product => (
            <OrderCard
              key={product.id}
              id={product.id}
              title={product.title}
              imageUrl={product.image}
              price={product.price}
              quantity={product.quantity}
              handleDelete={handleDelete}
              increaseQuantity={increaseQuantity}
              decreaseQuantity={decreaseQuantity}
            />
          ))
        }
      </div>
      {/* Footer */}
      <div className='px-6 mt-2 mb-6'>
        <p className='flex justify-between items-center mb-2'>
          <span className='font-light'>Total:</span>
          <span className='font-medium text-lg'>${totalPrice(cartProducts)}</span>
        </p>
        {/* <button className='bg-black py-3 text-white w-full rounded-lg' onClick={() => handleCheckout()}>Checkout</button> */}
      </div>
    </aside>
  )
}

export default CheckoutMenu