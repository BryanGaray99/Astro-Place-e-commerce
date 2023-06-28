import { useContext } from 'react';
import { ShoppingCartContext } from '../../Context';
import Layout from '../../Components/Layout';
import Card from '../../Components/Card';
import ProductDetail from '../../Components/ProductDetail';
import ProductModal from '../../Components/ProductModal';
import logoBlack from '../../Assets/astro-place-black.png';

function Home() {
  const { 
    items, 
    filteredItems, 
    openProductDetail, 
    searchByTitle,
    searchByCategory,
    setSearchByTitle,
    setSearchByCategory,
  } = useContext(ShoppingCartContext);

  const currentCategoryPath = window.location.pathname;
  let categoryPath = currentCategoryPath.substring(currentCategoryPath.lastIndexOf('/') + 1);
  // console.log(categoryPath);
  setSearchByCategory(categoryPath);
  
  const renderProductsView = () => {
    if (filteredItems?.length >0) {
      return (
        <div className='grid grid-flow-row gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-2'>
          {filteredItems?.map(item => (
            <Card key={item.id} data={item}/>
          ))}
        </div>
      );
    } else {
      return (
        <div className='relative w-[50%] h-[400px] flex flex-col items-center justify-center mt-4'>
          <div className='flex-1 items-center justify-center text-center'>
            <p className='font-montserrat mt-2'>We are sorry!</p>
            <p className='font-montserrat mt-1'>The product you are searching was not found 😿</p>
          </div>  
          <figure className='w-[300px] h-[300px] items-center justify-center mt-4 '>
            <img src={logoBlack} className='w-full h-full object-contain rounded-lg'></img>
          </figure>
        </div>
      )
    }
  };

  return (
    <Layout>
      <span className='bg-transparent w-[calc(35%_-_40px)] relative flex justify-center items-center mt-2 mb-2 rounded-lg'>
          <input 
              type = "text" 
              className='h-8 w-[500px] text-medium text-center font-sm rounded-lg border-2 border-solid border-[#ced5e4] focus:outline-[#ae8af7] placeholder-[#ced5e4] font-montserrat'
              placeholder="Buscar un producto" 
              onChange={(event) =>
                  {
                    setSearchByTitle(event.target.value);
                  }}
          />
      </span>
      {renderProductsView()}
      {openProductDetail && (
        <ProductModal>
            <ProductDetail />
        </ProductModal>
      )}
    </Layout>
  );
}

export default Home