import { useContext } from 'react';
import { ShoppingCartContext } from '../../Context';
import { NavLink } from 'react-router-dom';
import { ShoppingBagIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import logoBlack from '../../Assets/astro-place-black.png';
import './styles.css';

const Navbar = () => {
  const {
    account,
    signOut,
    setSignOut,
    showNavBar,
    setShowNavBar,
    isNewOrder,
    cartProducts,
    setOpenCartMenu,
    setIsNewOrder,
    setSearchByCategory,
    showMobileMenu,
    setShowMobileMenu,
    setOpenVisitors
  } = useContext(ShoppingCartContext);

  // const currentPath = window.location.pathname;
  // let stringCurrentPath = currentPath.substring(currentPath.lastIndexOf('/'));
  // console.log(stringCurrentPath);
  
  // (stringCurrentPath === '/')
  //   ? setShowNavBar(false)
  //   : null;

  const activeStyle = 'underline underline-offset-4 ';

  const toggleMobileMenu = () => {
    setShowMobileMenu(prevState => !prevState);
  };

  const closeMobileMenu = () => {
    setShowMobileMenu(false);
  };

  // Sign-out
  const signOutStatus = localStorage.getItem('sign-out');
  const parsedSignOut = JSON.parse(signOutStatus);
  const isUserSignOut = signOut || parsedSignOut;

  // Account
  const localAccount = localStorage.getItem('account');
  const parsedAccount = JSON.parse(localAccount);
  // If account exist
  const noAccountInLocalStorage = parsedAccount ? Object.keys(parsedAccount).length === 0 : true;
  const noAccountInLocalState = account ? Object.keys(account).length === 0 : true;
  // To know if the user has an account 
  const hasUserAnAccount = !noAccountInLocalStorage || !noAccountInLocalState;
  

  const handleSignOut = () => {
    const stringSignOut = JSON.stringify(true);
    localStorage.setItem('sign-out', stringSignOut);
    setSignOut(true);
  }

  const newOrderAnimation = () => {
    if (isNewOrder) {
      return (
        <span className='newOrder inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-[#915ef7] rounded-full -mt-2 ml-1'>
          +1
        </span>
      );
    }
  };

  const renderSignInView = () => {
    if (hasUserAnAccount && !isUserSignOut) {
      return (
        <>
          <li  className='hidden md:flex items-center justify-center px-2'>
            <span className='text-[#7343d4] font-normal text-medium'>
              {isUserSignOut? `Hola`: `Hola ${parsedAccount?.name}` }
            </span>
          </li>
          <li className='hidden md:flex items-center cursor-pointer'>
            <NavLink
              to='/my-account'
              className={({ isActive }) => isActive ? activeStyle : undefined}
              onClick={() => {
                setShowMobileMenu(false)
                setOpenVisitors(false)
              }}
            >
              <div className='flex w-15 items-center justify-center'>
                <span className='text-black'> My Account </span>
              </div>
            </NavLink>
          </li>
          <li className='hidden md:flex items-center cursor-pointer'>
            <NavLink
              to='/sign-in'
              className={({ isActive }) => isActive ? activeStyle : undefined}
              onClick={() => {
                handleSignOut();
                setShowMobileMenu(false)
                setOpenVisitors(false)
              }}
            >
              <div className='flex w-14 items-center justify-center'>
                <span className='text-black'> Sign Out </span>
              </div>
            </NavLink>
          </li>
          <li
            className='hidden md:flex items-center cursor-pointer'
            onClick={() => {
              setIsNewOrder(false);
              setOpenCartMenu(false);
              setOpenVisitors(false)
              closeMobileMenu();
            }}
            >
            <NavLink
              to='/my-orders'
              className={({ isActive }) => 
              isActive ? activeStyle : undefined}
              onClick={closeMobileMenu}
              >
              <div>
                <span className='text-black'> My Orders </span>
                {newOrderAnimation()}
              </div>
            </NavLink>
          </li>
          <li
            className='flex items-center cursor-pointer'
            onClick={() => {
              setOpenCartMenu(state => !state);
              setShowMobileMenu(false);
              setOpenVisitors(false);
            }}
          >
            <ShoppingBagIcon className='h-6 w-6 text-[#6936F5]' />
            <div> {cartProducts.length} </div>
          </li>
        </>
      );
    } else {
      return (
        <li
        className='hidden md:flex items-center cursor-pointer'
        >
          <NavLink
            to='/sign-in'
            className={({ isActive }) => 
              isActive ? activeStyle : undefined}
            onClick={() => {
              handleSignOut();
              setShowMobileMenu(false)
              setOpenVisitors(false)
            }}
          >
            <div className='flex w-14 items-center justify-center'>
              <span className='text-black'> Sign Out </span>
            </div>
          </NavLink>
        </li>
      );
    }
  }

  return (
    <nav className={`${showNavBar ? 'flex' : 'hidden'} justify-between items-center fixed z-10 top-0 w-full h-[90px] py-5 px-2 text-sm bg-[#f7f3ff]`}>
      <div className='flex items-center w-full md:w-auto'>
        <div className='md:hidden'>
          <button
            className='text-gray-500 hover:text-gray-700'
            onClick={() => {
              toggleMobileMenu();
              setOpenCartMenu(false);
              setOpenVisitors(false)
            }}            
            aria-label='Toggle Menu'
          >
            {showMobileMenu ? (
              <XMarkIcon className='h-6 w-6' />
            ) : (
              <Bars3Icon className='h-6 w-6' />
            )}
          </button>

        </div>
        <div 
          className='flex items-center justify-center w-full md:w-auto'
          onClick={() => {
            setOpenCartMenu(false)
            setOpenVisitors(false) 
          }}
        >
          <NavLink to='/' className='flex-shrink-0'>
            <img src={logoBlack} className='h-14 w-auto' alt='Logo' />
          </NavLink>
        </div>
        <ul className='hidden md:flex items-center gap-3 ml-6'>
          <li
            onClick={() => {
              closeMobileMenu();
              setSearchByCategory(null)
              setOpenVisitors(false)
            }} 
          >
            <NavLink
              to='/All'
              className={({ isActive }) => 
                            isActive ? activeStyle : undefined}

            >
              All
            </NavLink>
          </li>
          <li onClick={() => {
            setSearchByCategory('Altazimuth')
            setOpenVisitors(false) 
            }}
          >
            <NavLink
              to='/Altazimuth'
              className={({ isActive }) => 
                isActive ? activeStyle : undefined}
              onClick={closeMobileMenu}
            >
              Altazimuth
            </NavLink>
          </li>
          <li onClick={() => {
            setSearchByCategory('Equatorial')
            setOpenVisitors(false)
            }}
          >
            <NavLink
              to='/Equatorial'
              className={({ isActive }) => 
                isActive ? activeStyle : undefined}
              onClick={closeMobileMenu}
            >
              Equatorial
            </NavLink>
          </li>
          <li onClick={() => {
            setSearchByCategory('Dobsonian')
            setOpenVisitors(false)  
            }}
          >
            <NavLink
              to='/Dobsonian'
              className={({ isActive }) => 
                isActive ? activeStyle : undefined}
              onClick={closeMobileMenu}
            >
              Dobsonian
            </NavLink>
          </li>
          <li onClick={() => {
            setSearchByCategory('Accessories')
            setOpenVisitors(false)
            }}
          >
            <NavLink
              to='/Accessories'
              className={({ isActive }) => 
                isActive ? activeStyle : undefined}
              onClick={closeMobileMenu}
            >
              Accessories
            </NavLink>
          </li>

        </ul>
      </div>
      <ul className='flex items-center gap-5'>
        {renderSignInView()}
      </ul>
      {showMobileMenu && (
        <div className='md:hidden absolute top-[86px] left-0 w-full bg-white shadow-lg py-4 px-8'>
          <ul className='flex flex-col gap-4'>
            <li className='mb-2'>
                <span className='text-[#7343d4] font-normal text-medium'>
                  {!isUserSignOut && `Hola ${parsedAccount?.name}` }
                </span>
            </li>
            <li onClick={() => {
              setSearchByCategory(null)
              setOpenVisitors(false)
              }}
            >
              <NavLink
                to='/All'
                className={({ isActive }) => 
                              isActive ? activeStyle : undefined}
                onClick={() => {
                  closeMobileMenu();
                }}
              >
                All
              </NavLink>
            </li>
            <li onClick={() => {
              setSearchByCategory('Altazimuth')
              setOpenVisitors(false)
            }}
            >
              <NavLink
                to='/Altazimuth'
                className={({ isActive }) => 
                    isActive ? activeStyle : undefined}
                onClick={closeMobileMenu}
              >
                Altazimuth
              </NavLink>
            </li>
            <li onClick={() => {
              setSearchByCategory('Equatorial')
              setOpenVisitors(false)
              }}
            >
              <NavLink
                to='/Equatorial'
                className={({ isActive }) => 
                  isActive ? activeStyle : undefined}
                onClick={closeMobileMenu}
              >
                Equatorial
              </NavLink>
            </li>
            <li onClick={() => { 
              setSearchByCategory('Dobsonian')
              setOpenVisitors(false)
            }}
            >
              <NavLink
                to='/Dobsonian'
                className={({ isActive }) => 
                  isActive ? activeStyle : undefined}
                onClick={closeMobileMenu}
              >
                Dobsonian
              </NavLink>
            </li>
            <li onClick={() => {
              setSearchByCategory('Accessories')
              setOpenVisitors(false)
              }}
            >
              <NavLink
                to='/Accessories'
                className={({ isActive }) => 
                  isActive ? activeStyle : undefined}
                onClick={closeMobileMenu}
              >
                Accessories
              </NavLink>
            </li>
            {!isUserSignOut && (
              <>
                <li
                  className='flex items-center cursor-pointer'
                  onClick={() => {
                    setIsNewOrder(false);
                    setOpenCartMenu(false);
                    closeMobileMenu();
                    setOpenVisitors(false)
                  }}
                >
                  <NavLink
                    to='/my-orders'
                    className={({ isActive }) => 
                    isActive ? activeStyle : undefined}
                    onClick={closeMobileMenu}
                  >
                    <div>
                      <span className='text-black'> My Orders </span>
                      {newOrderAnimation()}
                    </div>
                  </NavLink>
                </li>
                <li 
                  className='flex items-center cursor-pointer mt-10'
                  onClick={()=> {
                    setOpenVisitors(false)
                  }}
                >
                  <NavLink
                    to='/my-account'
                    className={({ isActive }) => 
                    isActive ? activeStyle : undefined}
                    onClick={closeMobileMenu}
                  >
                  <div className='flex w-15 items-center justify-center'>
                    <span className='text-black'> My Account </span>
                  </div>
                  </NavLink>
                </li>
              </>
            )}
            <li
              className='flex items-center cursor-pointer'
            >
              <NavLink
                to='/sign-in'
                className={({ isActive }) => 
                  isActive ? activeStyle : undefined}
                onClick={() => {
                  handleSignOut();
                  closeMobileMenu();
                  setOpenVisitors(false);
                }}
              >
                <div className='flex w-14 items-center justify-center'>
                  <span className='text-black'> Sign Out </span>
                </div>
              </NavLink>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;