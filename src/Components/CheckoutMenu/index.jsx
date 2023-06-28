import React, { useContext, useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { ShoppingCartContext } from '../../Context';
import { totalPrice } from '../../Utils/sum';
import { dateTime } from '../../Utils/dateTime';
import OrderCard from '../OrderCard';
import { ReactComponent as CartSVG } from './cart.svg';
import { ReactComponent as CheckSVG } from './check.svg';
import './styles.css';

const CheckoutMenu = () => {
  const { openCartMenu, 
    setOpenCartMenu, 
    cartProducts, 
    setCartProducts,
    order, 
    setOrder, 
    cartChecked,
    setCartChecked,
    setIsNewOrder,
    setSearchByTitle, 
  } = useContext(ShoppingCartContext);

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

  const handleCheckout = () => {
    const orderToAdd = {
      dateTime: dateTime(),
      products: cartProducts,
      quantityProducts: cartProducts.length,
      totalPrice: totalPrice(cartProducts)
    }
    // console.log(dateTime())
    setOrder([...order, orderToAdd]);
    setCartProducts([]);
    setCartChecked(true);
    setIsNewOrder(true);
    setSearchByTitle(null);
  }

  return (
    <aside className={`${openCartMenu ? 'flex' : 'hidden'} checkout-detail w-full md:w-[360px] h-[calc(100vh-130px)] top-[90px] flex-col fixed right-0 bg-[#f7f3ff]`}>
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
      <div className='px-2 overflow-y-scroll flex-1'>
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
        {/* Checkout My Order */}
        <button 
          className={`button w-full justify-center ${cartChecked? 'checked-out' : ''}`}
          onClick={
            () => handleCheckout()
          }
          >
          <CartSVG className={`cart w-[24px] h-[24px]`}/>
          <span className='text-white'>Checkout</span>
          <CheckSVG className='check w-[24px] h-[24px]'/>
        </button>
      </div>
    </aside>
  )
}

export default CheckoutMenu

// bg-[#9e6eff] py-2 text-white w-full rounded-lg