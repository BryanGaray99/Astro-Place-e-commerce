import { NavLink } from 'react-router-dom'
import logoBlack from '../../Assets/astro-place-black.png'
const Navbar = () => {

    const activeStyle = 'underline underline-offset-4';
    
    return (
        <nav className='flex justify-between items-center fixed z-10 top-0 w-full py-5 px-8 text-sm bg-white'>
            <ul className='flex items-center gap-3'>
                <li className='font-semibold text-lg'>
                    <NavLink to='/'>
                        <img 
                            src={logoBlack}
                            className='h-15 w-14'
                        >            
                        </img>
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to='/'
                        className={({ isActive }) => 
                            isActive ? activeStyle : undefined
                        }
                    >
                        All
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to='/altazimuth'
                        className={({ isActive }) => 
                            isActive ? activeStyle : undefined
                        }
                    >
                        Altazimuth 
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to='/equatorial'
                        className={({ isActive }) => 
                            isActive ? activeStyle : undefined
                        }
                    >
                        Equatorial
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to='/dobsonian'
                        className={({ isActive }) => 
                            isActive ? activeStyle : undefined
                        }
                    >
                        Dobsonian
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to='/accesories'
                        className={({ isActive }) => 
                            isActive ? activeStyle : undefined
                        }
                    >
                        Accessories
                    </NavLink>
                </li>
            </ul>
            <ul className='flex items-center gap-3'>
                <li className='text-black/60'>
                    bgaray@astroplace.ec
                </li>
                <li>
                    <NavLink 
                        to='/my-orders'
                        className={({ isActive }) => 
                            isActive ? activeStyle : undefined
                        }
                    >
                        My Orders
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to='/my-account'
                        className={({ isActive }) => 
                            isActive ? activeStyle : undefined
                        }
                    >
                        My Account 
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to='/sign-in'
                        className={({ isActive }) => 
                            isActive ? activeStyle : undefined
                        }
                    >
                        SignIn
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to='/cart'
                        className={({ isActive }) => 
                            isActive ? activeStyle : undefined
                        }
                    >
                        🛍 0
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar