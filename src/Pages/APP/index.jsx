import { BrowserRouter, useRoutes } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ShoppingCartProvider } from '../../Context';
import Home from '../Home';
import MyOrder from '../MyOrder';
import MyOrders from '../MyOrders';
import NotFound from '../NotFound';
import Navbar from '../../Components/Navbar'
import CheckoutMenu from '../../Components/CheckoutMenu';
import LandingPage from '../LandingPage';
import './App.css';

const AppRoutes = () => {
  let routes = useRoutes([
    { path: '/', element: <LandingPage /> },
    { path: '/All', element: <Home /> },
    { path: '/Altazimuth', element: <Home /> },
    { path: '/Equatorial', element: <Home /> },
    { path: '/Dobsonian', element: <Home /> },
    { path: '/Accessories', element: <Home /> },
    { path: '/my-order', element: <MyOrder /> },
    { path: '/my-orders', element: <MyOrders /> },
    { path: '/my-orders/:id', element: <MyOrder /> },
    { path: '/my-orders/last', element: <MyOrder /> },
    { path: '/*', element: <NotFound /> }
  ]);

  return routes;
}

const App = () => {
  return (
    <ShoppingCartProvider>
      <BrowserRouter>
        <Helmet>
          <title>Astro Place</title>
          <meta name="description" content="Mock e-commerce by Bryan Garay" />
          <meta property="og:title" content="Astro Place" />
          <meta property="og:description" content="Mock e-commerce by Bryan Garay" />
          <meta property="og:image" content="https://i.ibb.co/SPhpvHY/public-image.jpg"/>
        </Helmet>
        <AppRoutes />
          <Navbar />
          <CheckoutMenu />
      </BrowserRouter>  
    </ShoppingCartProvider>
    
  )
}

export default App