import { useContext } from 'react';
import { BrowserRouter, Navigate, useRoutes } from 'react-router-dom';
import { ShoppingCartContext, ShoppingCartProvider } from '../../Context';
import Home from '../Home';
import SignIn from '../SignIn';
import MyOrder from '../MyOrder';
import MyOrders from '../MyOrders';
import NotFound from '../NotFound';
import Navbar from '../../Components/Navbar'
import CheckoutMenu from '../../Components/CheckoutMenu';
import LandingPage from '../LandingPage';
import MyAccount from '../MyAccount';
import './App.css';

const AppRoutes = () => {
  const { signOut, account } = useContext(ShoppingCartContext);

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

  let routes = useRoutes([
    { path: '/', element: <LandingPage /> },
    { path: '/All', element: hasUserAnAccount && !isUserSignOut ? <Home /> : <Navigate replace to = {'/sign-in'} /> },
    { path: '/Altazimuth',  element: hasUserAnAccount && !isUserSignOut ? <Home /> : <Navigate replace to = {'/sign-in'} />},
    { path: '/Equatorial',  element: hasUserAnAccount && !isUserSignOut ? <Home /> : <Navigate replace to = {'/sign-in'} /> },
    { path: '/Dobsonian',  element: hasUserAnAccount && !isUserSignOut ? <Home /> : <Navigate replace to = {'/sign-in'} />},
    { path: '/Accessories',  element: hasUserAnAccount && !isUserSignOut ? <Home /> : <Navigate replace to = {'/sign-in'} /> },
    { path: '/sign-in', element: <SignIn/>},
    { path: '/my-account', element: hasUserAnAccount && !isUserSignOut ? <MyAccount /> : <Navigate replace to = {'/sign-in'} />},
    { path: '/my-order',  element: hasUserAnAccount && !isUserSignOut ? <MyOrder /> : <Navigate replace to = {'/sign-in'} /> },
    { path: '/my-orders', element: hasUserAnAccount && !isUserSignOut ? <MyOrders /> : <Navigate replace to = {'/sign-in'} />  },
    { path: '/my-orders/:id', element: hasUserAnAccount && !isUserSignOut ? <MyOrder /> : <Navigate replace to = {'/sign-in'} /> },
    { path: '/my-orders/last', element: hasUserAnAccount && !isUserSignOut ? <MyOrder /> : <Navigate replace to = {'/sign-in'} /> },
    { path: '/*', element: <NotFound /> }
  ]);

  return routes;
}

const App = () => {
  return (
    <ShoppingCartProvider>
      <BrowserRouter>
        <AppRoutes />
        <Navbar />
        <CheckoutMenu />
      </BrowserRouter>  
    </ShoppingCartProvider>
    
  )
}

export default App