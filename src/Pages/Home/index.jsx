import { useEffect, useState, useContext } from 'react';
import { ShoppingCartContext } from '../../Context';
import Layout from '../../Components/Layout';
import Card from '../../Components/Card';
import apiUrl from '../../API';
import ProductDetail from '../../Components/ProductDetail';
import ProductModal from '../../Components/ProductModal';

function Home() {
  const { openModal } = useContext(ShoppingCartContext);
  const [items, setItems] = useState(null);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/products`);
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error(`Error inesperado: ${error}`);
      }
    }
    fetchData()
  }, [])

  return (
    <Layout>
      <div className='grid grid-flow-row gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-2'>
        {
          items?.map(item => (
            <Card key={item.id} data={item}/>
          ))
        }
      </div>
      {openModal && (
        <ProductModal>
            <ProductDetail />
        </ProductModal>
      )}
    </Layout>
  );
}

export default Home