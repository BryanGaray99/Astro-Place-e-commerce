import Home from '../Home';
import MyAccount from '../MyAccount';
import MyOrder from '../MyOrder';
import MyOrders from '../MyOrders';
import NotFound from '../NotFound';
import SignIn from '../SignIn';
import './App.css';


function App() {

  return (
    <>
      <div className='bg-zinc-300'> 
        Hola mi gente
      </div>
      <Home />
      <SignIn />
      <MyAccount />
      <MyOrder />
      <MyOrders />
      <NotFound />
    </>
  )
}

export default App
