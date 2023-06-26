import React, {useContext} from 'react';
import Layout from '../../Components/Layout';
import { ShoppingCartContext } from '../../Context';
import MyOrderCard from '../../Components/MyOrderCard';
import { totalPrice } from '../../Utils/sum';

function MyOrder() {
  const {order} = useContext(ShoppingCartContext);
  const lastOrderProducts = order?.slice(-1)[0].products;

  return (
    <Layout>
      <p className='mt-4 text-lg font-medium'>My Order</p>
      <div className='mt-4 px-2 flex-1 w-[50%]'>
        {
          // Para mostrar el último elemento, cortamos el array, indicamos la posición (-1 del final al inicio)
          // y ahora hay un array con un objeto, entonces tomamos el de posición 0. Con eso tenemos un array con la 
          // última orden en el card debemos renderizar productos no órdenes, así que escribimos adicionalment
          // .products.map, para ingresar al array de productos y mapearlo
          lastOrderProducts.map(product => (
            <MyOrderCard
              key={product.id}
              id={product.id}
              title={product.title}
              imageUrl={product.image}
              price={product.price}
              quantity={product.quantity}
            />
          ))
        }
      </div>
      <p className='flex px-6 mt-2 mb-4 w-[50%] items-center justify-between'>
          <span className='font-medium text-lg'>Total:</span>
          <span className='font-medium text-lg'>${totalPrice(lastOrderProducts)}</span>
      </p>
    </Layout>
  );
}

export default MyOrder