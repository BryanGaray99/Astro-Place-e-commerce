import { XMarkIcon } from '@heroicons/react/24/solid'

const OrderCard = props => {
  const { id, title, imageUrl, price, handleDelete } = props

  return (
    <div className="flex justify-between items-center mb-3 border-b-2 border-b-[#e5d8ff] border-solid">
      <div className='flex items-center gap-2'>
        {/* <span className='text-sm w-4'>{quantity}</span> */}
        <figure className='w-14 h-14'>
          <img className='w-full h-full rounded-lg object-cover' src={imageUrl} alt={title} />
        </figure>
        <p className='text-xs w-[50%] font-light line-clamp-2'>{title}</p>
      </div>
      <div className='flex items-center gap-2'>
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