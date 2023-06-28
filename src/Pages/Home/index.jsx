import { useContext } from 'react';
import { ShoppingCartContext } from '../../Context';
import Layout from '../../Components/Layout';
import Card from '../../Components/Card';
import ProductDetail from '../../Components/ProductDetail';
import ProductModal from '../../Components/ProductModal';
import logoBlack from '../../Assets/astro-place-black.png';
import error404 from '../../Assets/error404.jpg';
import LoadingSkeletons from '../../Components/LoadingSkeletons';

function Home() {
  const { 
    filteredItems, 
    openProductDetail, 
    setSearchByTitle,
    setSearchByCategory,
    error, 
    loading
  } = useContext(ShoppingCartContext);

  const renderProductsView = () => {
    const currentCategoryPath = window.location.pathname;
    let categoryPath = currentCategoryPath.substring(currentCategoryPath.lastIndexOf('/') + 1);
    
    (categoryPath !== 'All')
      ? setSearchByCategory(categoryPath)
      : null;

    if (error){
      return (
        <div className='relative w-[50%] h-[400px] flex flex-col items-center justify-center mt-8'>
          <div className='flex-1 items-center justify-center text-center'>
            <p className='mt-2'>We are sorry!</p>
            <p className='mt-1'>The API is not responding, try refresing the page... 😿</p>
          </div>
          <div className='flex flex-col justify-center items-center'>
            <figure className='w-[300px] h-[300px] items-center justify-center mt-4 '>
              <img src={error404} className='w-full h-full object-contain rounded-lg'></img>
            </figure>
            <a className='text-xs text-gray-500' href="https://www.freepik.com/free-vector/404-error-lost-space-concept-illustration_20602747.htm#query=404%20page&position=30&from_view=keyword&track=ais">Image by storyset on Freepik</a> 
          </div>  
        </div>
      )
    }
    if (loading){  
      return (
        <div className='grid grid-flow-row gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-2'>
          {Array.from({ length: 20 }, (_, index) => (
            <LoadingSkeletons key={index} />
          ))}
        </div>
      );
    }else {
      if (filteredItems?.length>0) {
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
              <p className='mt-2'>We are sorry!</p>
              <p className='mt-1'>The product you are searching was not found 😿</p>
            </div>  
            <figure className='w-[300px] h-[300px] items-center justify-center mt-4 '>
              <img src={logoBlack} className='w-full h-full object-contain rounded-lg'></img>
            </figure>
          </div>
        )
      }
    }


  };

  return (
    <Layout>
      <span className='bg-transparent w-[calc(35%_-_40px)] relative flex justify-center items-center mt-[2vh] mb-2 rounded-lg'>
          <input 
              type = "text" 
              className='h-8 w-[500px] text-medium text-center font-sm rounded-lg border-2 border-solid border-[#ced5e4] focus:outline-[#ae8af7] placeholder-[#ced5e4]'
              placeholder="Search a product" 
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