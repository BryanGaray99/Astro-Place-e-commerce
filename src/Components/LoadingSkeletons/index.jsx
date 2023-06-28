import React from 'react'

const LoadingSkeletons = () => {
    return (
      <div className='bg-white cursor-pointer w-40 h-48 rounded-lg shadow-lg mb-3 animate-pulse'>
        <figure className='relative mb-2 w-full h-[75%]'>
          <span className='absolute bottom-0 left-0 bg-[#ccbfe7] rounded-md text-black text-xs font-bold m-2 px-2 py-0.5 w-3/4'></span>
          <div className='w-full h-full bg-[#e6e3ee] rounded-lg' />
        </figure>
  
        <div className='flex justify-between'>
          <span className='text-sm font-normal w-[80%] line-clamp-2 px-2 bg-[#c9bfe0]'>
            <span className='h-3 w-16 bg-[#e6e3ee] rounded-full inline-block ml-1'></span>
          </span>
          <span className='text-sm font-normal px-2 bg-[#c9bfe0]'>
            <span className='h-3 w-8 bg-[#e6e3ee] rounded-full inline-block ml-1'></span>
          </span>
        </div>
      </div>
    );
};
  

export default LoadingSkeletons;
