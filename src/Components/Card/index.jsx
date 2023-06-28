import React, { useContext } from 'react';
import { PlusIcon, CheckCircleIcon } from '@heroicons/react/24/solid';
import { ShoppingCartContext } from '../../Context';

const Card = (data) => {
  const { 
        setOpenProductDetail, 
        setProductShow, 
        cartProducts, 
        setCartProducts,
        setCartChecked
    } = useContext(ShoppingCartContext);

  const showProduct = (productDetail) => {
    setOpenProductDetail(state => !state);
    setProductShow(productDetail);
  };
  
  const addProductsToCart = (event, productData) => {
    event.stopPropagation(); // Escuchar solo un evento
    productData.quantity = 1; 
    setCartProducts([...cartProducts, productData]);
    setCartChecked(false);
  }

  const handleDelete = (event, id) => {
    event.stopPropagation();
    const deletedProduct = cartProducts.filter(product => product.id != id);
    setCartProducts(deletedProduct);
  }

  
  const renderIcon = (id) => {
    const isInCart = cartProducts.filter(product => product.id === id).length > 0;

    if (isInCart) {
      return (
        <div
          className='absolute top-0 right-0 flex justify-center items-center bg-[#9f8bc9] w-6 h-6 rounded-full m-2 p-1'>
          <CheckCircleIcon 
            className='h-6 w-6 text-white'
            onClick={(event) => handleDelete(event, data.data.id)}
          >
          </CheckCircleIcon>
        </div>
      )
    } else {
      return (
        <div
          className='absolute top-0 right-0 flex justify-center items-center bg-white w-6 h-6 rounded-full m-2 p-1'
          onClick={(event) => addProductsToCart(event, data.data)}>
          <PlusIcon 
            className='h-6 w-6 text-black'
          >
          </PlusIcon>
        </div>
      )
    }
  };

  return (
    <div 
        className='bg-white cursor-pointer w-56 h-60 rounded-lg  shadow-lg mb-3'
        onClick={() => showProduct(data.data)}
    >
        <figure className='relative mb-2 w-full h-[75%]'>
            <span 
                className='absolute bottom-0 left-0 bg-white/80 rounded-md text-black text-xs font-bold m-2 px-2 py-0.5'
            >
                {data.data.category.name}
            </span>
            <img 
                className='w-full h-full object-cover rounded-lg'
                src={data.data.image} 
                alt={data.data.title}
            >
            </img>
            {renderIcon(data.data.id)}
        </figure>

        <p 
            className='flex justify-between'
        >
            <span className='text-sm font-normal w-[80%] line-clamp-2 px-2'>{data.data.title}</span>
            <span className='text-sm font-normal px-2'>${data.data.price}</span>
        </p>
    </div>
  )
}

export default Card;
