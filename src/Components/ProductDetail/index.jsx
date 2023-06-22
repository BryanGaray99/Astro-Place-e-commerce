import React, { useContext } from 'react';
import { ShoppingCartContext } from '../../Context';
import { XMarkIcon } from '@heroicons/react/24/solid';
// import './styles.css';

function ProductDetail () {
    const { setOpenProductDetail, productShow } = useContext(ShoppingCartContext);

    const onCancel = () => { setOpenProductDetail(false) };

    return (
        <div className='flex flex-col fixed bg-white rounded-lg w-[400px] h-[calc(100vh-130px)] overflow-hidden shadow-lg hover:shadow-xl 
                    hover:scale-105 duration-500 transform transition'>
            <figure className='w-full h-[50%]'>
                <div 
                    className='absolute top-0 right-0 flex justify-center items-center bg-[#2f323a9d] w-6 h-6 rounded-full m-2 p-1 font-bold cursor-pointer'
                    onClick={onCancel}
                    
                    >
                    <XMarkIcon className='h-6 w-6 text-white'></XMarkIcon>
                </div>

                <img 
                    className='w-full h-full object-cover rounded-lg' 
                    src={productShow.image} 
                    alt={productShow.title}
                />
            </figure>

            <div className='p-5 overflow-y-scroll'>
                <h1 className='text-xl font-bold'>
                    {productShow.title}
                </h1>
                <p className='mt-2 text-lg font-semibold text-gray-600'>
                    ${productShow.price}
                </p>
                <p className='mt-1 text-gray-500 font-'>
                    {productShow.description}
                </p>
            </div>
        </div>
    );
}

export default ProductDetail ;