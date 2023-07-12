import React, { useContext, useState } from 'react'
import { ShoppingCartContext } from '../../Context';
import { SparklesIcon, PaperAirplaneIcon, XMarkIcon  } from '@heroicons/react/24/solid';

const Visitors = () => {
    const { visitors, addVisitor, openVisitors, setOpenVisitors } = useContext(ShoppingCartContext);
    const [name, setName] = useState("");

    const toggleOpenVisitors = () => {
        setOpenVisitors(prevState => !prevState);
      };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      addVisitor({ name });
      setName("");
    };

    return (
        <div>
            <button 
                className='bg-[#9274ce] text-neutral-50 shadow-[0px_5px_25px_#8f7ab8] cursor-pointer text-[50px] fixed font-[bold] 
                            flex justify-center items-center md:h-16 md:w-16 h-12 w-12 z-[1] rotate-[0] transition-[1s] 
                            duration-[ease] rounded-[50%] border-[none] right-[30px] md:bottom-[30px] bottom-[80px] hover:rotate-[180deg]'
                onClick={toggleOpenVisitors}
            >
                <SparklesIcon className='md:h-6 md:w-6 h-5 w-5 text-white' />
            </button>
            { openVisitors && (
                <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-75'>
                    <div className='flex flex-col items-center justify-between bg-black text-white p-4 mx-4 md:w-[600px] w-full max-h-full rounded-lg'>
                        <div className='flex items-center justify-between w-full'>
                            <h2 className='text-xl font-bold text-white flex-grow text-center'>Be Part of the Stars</h2>
                            <button
                                className='text-white hover:text-gray-300'
                                onClick={toggleOpenVisitors}
                            >
                                <XMarkIcon className='w-6 h-6' />
                            </button>
                        </div>
                        <form 
                            className='w-full flex items-center mt-4 rounded-lg bg-gray-900' 
                            onSubmit={handleSubmit}
                        >
                            <input
                                type='text'
                                className='w-full py-2 px-4 outline-none bg-transparent text-white'
                                placeholder='Your name here'
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                            />
                            <button
                                className='text-white bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded-r-lg'
                                onClick={handleSubmit}
                            >
                            <PaperAirplaneIcon className='w-6 h-6' />
                            </button>
                        </form>
                        <div className='w-full h-[250px] mt-4 rounded-lg bg-black text-white border-2 border-b-[#e5d8ff] border-solid'>
                            <div className='text-center py-2'>
                            <h3 className='text-lg text-[#cfcfcf]'>A Sky Full of Stars</h3>
                            </div>
                            <div className='px-4 py-2'>
                            <ul>
                                {visitors.map((visitor, index) => (
                                    <li key={index}>{visitor.name}</li>
                                ))}
                            </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Visitors;
