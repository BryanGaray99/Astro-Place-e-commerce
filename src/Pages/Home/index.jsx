import { useEffect, useState } from 'react';
import Layout from '../../Components/Layout';
import Card from '../../Components/Card';
import apiUrl from '../../API';

function Home() {
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
      <div className='grid grid-flow-row gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {
          items?.map(item => (
            <Card key={item.id} data={item}/>
          ))
        }
      </div>
    </Layout>
  );
}

export default Home