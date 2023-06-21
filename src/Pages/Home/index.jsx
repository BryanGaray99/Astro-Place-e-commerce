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
      <div className='grid gap-4 grid-cols-4 w-full max-w-screen-xl'>
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