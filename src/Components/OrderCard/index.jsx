import { XMarkIcon } from '@heroicons/react/24/solid'

const OrderCard = props => {
  const { 
    id, 
    title, 
    imageUrl, 
    price, 
    quantity, 
    handleDelete, 
    increaseQuantity, 
    decreaseQuantity 
  } = props


  return (
    <div className="flex items-center mb-3 border-b-2 border-b-[#e5d8ff] border-solid w-full">
      {/* Product image and Title */}
      <div className='flex items-center justify-start gap-2 w-[60%]'>
        <figure className='w-10 h-10'>
          <img className='w-full h-full rounded-lg object-cover' src={imageUrl} alt={title} />
        </figure>
        <p className='text-xs w-[65%] font-light line-clamp-2'>{title}</p>
      </div>
      {/* Quantity, price and delete */}
      <div className='flex items-center gap-2 justify-between w-[40%]'>
        <div className="flex items-center border-gray-100">
          <span 
            className="cursor-pointer rounded-l bg-gray-200 py-1 px-[3px] duration-100 hover:bg-red-500 hover:text-blue-50"
            onClick={() => decreaseQuantity(id)}
          > - </span>
          <span className="h-8 w-4 border py-[10px] bg-white text-center text-xs outline-none">{quantity}</span>
          <span 
            className="cursor-pointer rounded-r bg-gray-200 py-1 px-[1px] duration-100 hover:bg-blue-500 hover:text-blue-50"
            onClick={() => increaseQuantity(id)}
          > + </span>
        </div>
        <p className='text-sm font-medium'>${price}</p>
        <XMarkIcon 
          onClick={() => handleDelete(id)}
          className='h-3 w-3 text-black cursor-pointer'
        >          
        </XMarkIcon>
      </div>
    </div>
  )
}

export default OrderCard