import React, { useContext, useState, useRef} from 'react'
import { Link, Navigate } from 'react-router-dom';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
import Layout from '../../Components/Layout';
import { ShoppingCartContext } from '../../Context';

const SignIn = () => {
  
  const {account, setSignOut, setAccount} = useContext(ShoppingCartContext);
  const [view, setView] = useState('user-info');
  const [showPassword, setShowPassword] = useState(false);

  const form = useRef(null)
  
  // Account
  const localAccount = localStorage.getItem('account');
  const parsedAccount = JSON.parse(localAccount);
  
  // If account exist
  const noAccountInLocalStorage = parsedAccount ? Object.keys(parsedAccount).length === 0 : true;
  const noAccountInLocalState = account ? Object.keys(account).length === 0 : true;
  // To know if the user has an account 
  const hasUserAnAccount = !noAccountInLocalStorage || !noAccountInLocalState;
  
  const handleSignIn = () => {
    const stringiedSignOut = JSON.stringify(false);
    localStorage.setItem('sign-out', stringiedSignOut);
    setSignOut(false);
    // redirect 
    return <Navigate replace to={'/All'} />
  }
  
  // Create Account
  const createAnAccount = () => {
    const formData = new FormData(form.current);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password')
    }
    // console.log(data);
    const stringifiedAccount = JSON.stringify(data);
    localStorage.setItem('account', stringifiedAccount)
    setAccount(data);
    // Sign In
    handleSignIn();
  }
  
  // Password Visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const renderLogin = () => {
    return (
      <div className='flex flex-col w-80 mt-10 gap-3'>
        <p>
          <span className='font-normal'>Email: </span>
          <span className='font-semibold'>{parsedAccount?.email}</span>
        </p>
        <p>
          <span className='font-normal'>Password: </span>
          <span className='relative'>
            <input
              type={showPassword ? 'text' : 'password'}
              className='pr-10'
              value={parsedAccount?.password}
              readOnly
            />
            <button
              className='absolute right-0 top-1/2 transform -translate-y-1/2 bg-transparent border-none'
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <EyeSlashIcon
                  className='h-5 w-5 text-gray-400 hover:text-gray-600'
                  aria-hidden='true'
                />
              ) : (
                <EyeIcon
                  className='h-5 w-5 text-gray-400 hover:text-gray-600'
                  aria-hidden='true'
                />
              )}
            </button>
          </span>
        </p>
        <Link
          to="/All">
          <button
            className='bg-[#d3bdff] border border-black disabled:bg-black/40 text-black  w-full rounded-lg py-3 mt-4 mb-2'
            disabled={!hasUserAnAccount}
            onClick={()=>handleSignIn()}
          >
            Log in
          </button>
        </Link>
        <div className='text-center'>
          <a className='text-sm hover:underline' href='/'>Forgot my password</a>
        </div>
        <button
          className='bg-[#eae0fd] border border-black disabled:text-black/40 disabled:border-black/40
          rounded-lg mt-6 py-3'
          disabled={hasUserAnAccount}
          onClick={() => setView('create-user-info')}
        >
          Sign up
        </button>
      </div>
    )
  }

  const renderSingUp = () => {
    return (
      <form ref={form} className='flex flex-col gap-4 w-80'>
        <div className='flex flex-col gap-1'>
          <label htmlFor='name' className='font-normal text-sm'>Your name:</label>
          <input
            type='text'
            id='name'
            name='name'
            defaultValue={parsedAccount?.name}
            placeholder='Awesome Person'
            className='rounded-lg border border-[#2b0081] placeholder:font-light
                      placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4'
          />
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor='email' className='font-normal text-sm'>Your email:</label>
          <input
            type='text'
            id='email'
            name='email'
            defaultValue={parsedAccount?.email}
            placeholder='awesome.person@astro.com'
            className='rounded-lg border border-[#2b0081] placeholder:font-light
                      placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4'
          />
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor='password' className='font-normal text-sm'>Your password:</label>
          <input
            type='password'
            id='password'
            name='password'
            defaultValue={parsedAccount?.password}
            placeholder='*******'
            className='rounded-lg border border-[#2b0081] placeholder:font-light
                      placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4'
          />
        </div>
        <Link to='/All'>
          <button
            className='bg-[#9274ce] text-white w-full rounded-lg py-3'
            onClick={()=> createAnAccount()}
          >
            Create Account
          </button>
        </Link>
      </form>
    )
  }

  const renderView = () => view === 'create-user-info' ? renderSingUp() : renderLogin();
  return (
      <Layout>
        <h1 className="font-medium text-xl text-center mt-[60px] mb-6 w-80">Welcome To Astro Place</h1>
        {renderView()}
      </Layout>
    )
}

export default SignIn;