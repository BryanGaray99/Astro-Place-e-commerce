const MyOrderCard= props => {
  const { 
    id, 
    title, 
    imageUrl, 
    price, 
    quantity, 
  } = props

  
  return (
    <div className="flex items-center mb-3 border-b-2 border-b-[#e5d8ff] border-solid w-full">
      {/* Product image and Title */}
      <div className='flex items-center justify-start gap-2 w-[75%]'>
        <figure className='w-10 h-10'>
          <img className='w-full h-full rounded-lg object-cover' src={imageUrl} alt={title} />
        </figure>
        <p className='text-medium w-[65%] font-light'>{title}</p>
      </div>
      {/* Quantity, price */}
      <div className='flex items-center gap-2 justify-between w-[25%]'>
        <div className="flex items-center border-gray-100">
          <span className="h-8 w-4 py-[10px] bg-[#ffffff] text-center text-medium ">{quantity}</span>
        </div>
        <p className='text-medium font-medium'>${price}</p>
      </div>
    </div>
  )
}

export default MyOrderCard