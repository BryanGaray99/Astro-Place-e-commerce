import { useContext } from 'react';
import { ShoppingCartContext } from '../../Context';
import { NavLink } from 'react-router-dom';
import { ShoppingBagIcon } from '@heroicons/react/24/solid';
import logoBlack from '../../Assets/astro-place-black.png';
import './styles.css';

const Navbar = () => {
    const { 
        isNewOrder, 
        cartProducts, 
        setOpenCartMenu, 
        setIsNewOrder, 
        setSearchByCategory
    } = useContext(ShoppingCartContext);
    
    const activeStyle = 'underline underline-offset-4';
    
    const newOrderAnimation = () => {
        if (isNewOrder) {
            return (
                <span className='newOrder inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-[#915ef7] rounded-full -mt-2 ml-1'>
                    +1
                </span>
            )
        }
    };

    return (
        <nav className='flex justify-between items-center fixed z-10 top-0 w-full h-[100px] py-5 px-8 text-sm bg-[#f7f3ff]'>
            <ul className='flex items-center gap-3'>
                <li className='font-semibold text-lg items-center'>
                    <NavLink to='/'>
                        <img 
                            src={logoBlack}
                            className='h-15 w-14'
                        >            
                        </img>
                    </NavLink>
                </li>
                <li               >
                    <NavLink 
                        to='/'
                        className={({ isActive }) => 
                            isActive ? activeStyle : undefined
                        }
                    >
                        All
                    </NavLink>
                </li>
                <li
                    onClick={() => setSearchByCategory('Altazimuth')}
                >
                    <NavLink 
                        to='/Altazimuth'
                        className={({ isActive }) => 
                            isActive ? activeStyle : undefined
                        }
                        onClick={() => setSearchByCategory()}
                    >
                        Altazimuth 
                    </NavLink>
                </li>
                <li
                    onClick={() => setSearchByCategory('Equatorial')}
                >
                    <NavLink 
                        to='/Equatorial'
                        className={({ isActive }) => 
                            isActive ? activeStyle : undefined
                        }
                    >
                        Equatorial
                    </NavLink>
                </li>
                <li
                    onClick={() => setSearchByCategory('Dobsonian')}
                >                    
                    <NavLink 
                        to='/Dobsonian'
                        className={({ isActive }) => 
                            isActive ? activeStyle : undefined
                        }
                    >
                        Dobsonian
                    </NavLink>
                </li>
                <li
                    onClick={() => setSearchByCategory('Accessories')}
                >   
                    <NavLink 
                        to='/Accessories'
                        className={({ isActive }) => 
                            isActive ? activeStyle : undefined
                        }
                    >
                        Accessories
                    </NavLink>
                </li>
            </ul>
            <ul className='flex items-center gap-5'>
                <li
                    className='flex items-center cursor-pointer'
                    onClick={()=>(
                        setIsNewOrder(false),
                        setOpenCartMenu(false)
                        )}
                >
                    <NavLink 
                        to='/my-orders'
                        className={({ isActive }) => 
                            isActive ? activeStyle : undefined
                        }
                    >
                        <div>
                            <span className='text-black'> My Orders </span>
                            {newOrderAnimation()}
                        </div>
                    </NavLink>
                </li>
                <li 
                    className='flex items-center cursor-pointer'
                    onClick={()=> setOpenCartMenu(state => !state)}
                >
                    <ShoppingBagIcon className='h-6 w-6 text-[#6936F5]'>
                    </ShoppingBagIcon> 
                    <div> {cartProducts.length} </div>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar