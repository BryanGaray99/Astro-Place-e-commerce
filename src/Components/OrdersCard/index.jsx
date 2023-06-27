import { ChevronRightIcon, CalendarDaysIcon, ShoppingCartIcon } from '@heroicons/react/24/solid'


const OrdersCard = props => {
  const { 
    dateTime,
    totalPrice,
    quantityProducts
  } = props
  
  return (
    <div className="flex justify-between items-center mb-3 border border-black rounded-lg p-4 w-80 bg-[#f7f3ff]">
      <div className='flex justify-between w-full'>
        <p className='flex flex-col'>
          <p className='flex items-center gap-2'>
            <CalendarDaysIcon className='h-4 w-4 text-black cursor-pointer' />
            <span className='font-light'>{dateTime}</span>
          </p>
          <p className='flex items-center gap-2'>
            <ShoppingCartIcon className='h-4 w-4 text-black cursor-pointer' />
            <span className='font-light'>{quantityProducts} articles</span>
          </p>
        </p>
        <p className='flex items-center gap-2'>
          <span className='font-medium text-xl'>${totalPrice}</span>
          <ChevronRightIcon className='h-6 w-6 text-black cursor-pointer' />
        </p>
      </div>
    </div>
  )
}

export default OrdersCard