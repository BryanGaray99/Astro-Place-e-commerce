import React, { useContext } from 'react';
import { PlusIcon } from '@heroicons/react/24/solid';
import { ShoppingCartContext } from '../../Context';

const Card = (data) => {
  const { 
        count, setCount, 
        setOpenProductDetail, 
        setProductShow, 
        cartProducts, 
        setCartProducts,
        openCheckoutMenu,
    } = useContext(ShoppingCartContext);

  const showProduct = (productDetail) => {
    setOpenProductDetail(state => !state);
    setProductShow(productDetail);
  };

  const addProductsToCart = (event, productData) => {
    // Escuchamos solo un evento, el de añadir
    event.stopPropagation();
    openCheckoutMenu();

    // true si el producto ya se encuentra en el carrito
    const productExists = cartProducts.some(cartItem => cartItem.id === productData.id); 

    if (productExists) {
        // valida la existencia y busca el producto
        const productCart = cartProducts.find(cartItem => cartItem.id === productData.id);
        productCart.quantity += 1; 
    } else {
        // si el producto no está, le agrega la propiedad quantity con valor uno, y luego setea el carrito agregando ese producto
        productData.quantity = 1; 
        // Usamos el spread operator para traer lo que ya había en el array y sumarle el nuevo ítem, osea productCart
        setCartProducts([...cartProducts, productData]);
    }
    setCount(count + 1);
  };
  

  return (
    <div 
        className='bg-white cursor-pointer w-56 h-60 rounded-lg'
        onClick={() => showProduct(data.data)}
    >
        <figure className='relative mb-2 w-full h-4/5'>
            <span 
                className='absolute bottom-0 left-0 bg-white/80 rounded-md text-black text-xs font-bold m-2 px-2 py-0.5'
            >
                {data.data.category.name}
            </span>
            <img 
                className='w-full h-full object-cover rounded-lg'
                src={data.data.images[0]} 
                alt={data.data.title}
            >
            </img>
            <div 
                className='absolute top-0 right-0 flex justify-center items-center bg-white w-6 h-6 rounded-full m-2 p-1 font-bold'
                onClick={(event) =>addProductsToCart(event, data.data)}
            >
                <PlusIcon className='h-6 w-6 text-black'></PlusIcon>
            </div>
        </figure>

        <p 
            className='flex justify-between'
        >
            <span className='text-base font-normal'>{data.data.title}</span>
            <span className='text-base font-normal'>${data.data.price}</span>
        </p>
    </div>
  )
}

export default Card;