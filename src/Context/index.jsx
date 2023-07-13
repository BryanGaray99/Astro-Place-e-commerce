import { createContext, useEffect, useState } from 'react'
import apiUrl from '../API';
import AuthLocalStorage from './AuthLocalStorage';

export const ShoppingCartContext = createContext();

export const ShoppingCartProvider = ({children}) => {

    const { account, setAccount, signOut, setSignOut } = AuthLocalStorage(); 
    
    // Show Navbar
    const [showNavBar, setShowNavBar] = useState(true);
    
    // Loading and error products
    const [ loading, setLoading] = useState(true);
    const [ error, setError] = useState(false);
    const [isFetching, setIsFetching] = useState(true);
    const [fetchError, setFetchError] = useState(null);
   
    // Items
    const [items, setItems] = useState(null);
    const [filteredItems, setFilteredItems] = useState(null);

    // Search Items
    const [searchByTitle, setSearchByTitle] = useState(null);
    const [searchByCategory, setSearchByCategory] = useState(null);

    // Shopping Cart
    const [cartProducts, setCartProducts] = useState([]);
    const [openCartMenu, setOpenCartMenu] = useState(false);

    // Product Detail
    const [openProductDetail, setOpenProductDetail] = useState(false);
    const [productShow, setProductShow] = useState({});

    // Orders
    const [order, setOrder] = useState([])
    const [cartChecked, setCartChecked] = useState(false);
    const [isNewOrder, setIsNewOrder] = useState(false);

    // Mobile Menu
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    // Visitors
    const [visitors, setVisitors] = useState([]);
    const [openVisitors, setOpenVisitors] = useState(false);

    // GET products (items)
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(`${apiUrl}/products`);
          const data = await response.json();
          setItems(data);
        } catch (error) {
          console.error(`Error inesperado: ${error}`)
          setFetchError(error.message);
        } finally {
          setIsFetching(false);
        }
      };
    
      fetchData();
    }, []);
    
    useEffect(() => {
      if (items) {
        setLoading(false);
      }
    }, [items]);
    // console.log(items);

    // Filtered Items by Title
    const filterItemsByTitle = (items, searchByTitle) => { 
      // Hago un filtrado de  los items si existen. Por cada item, el título del ítem lo paso a Lower Case
      // Si incluye el texto buscado en minúsculas entonces lo filtra.
      return items?.filter(item => item.title.toLowerCase().includes(searchByTitle.toLowerCase()));
    };

    // Filtered Items by Category
    const filterItemsByCategory = (items, searchByCategory) => { 
      return items?.filter(item => item.category.name.includes(searchByCategory));
    };

    const filterBy = (searchType, items, searchByTitle, searchByCategory) => {
      if (searchType === 'By_All'){
        return filterItemsByCategory(items, searchByCategory).filter(item => item.title.toLowerCase().includes(searchByTitle.toLowerCase()));
      };
      if (searchType === 'By_title'){
        return filterItemsByTitle(items, searchByTitle)
      };
      if (searchType === 'By_category'){
        return filterItemsByCategory(items, searchByCategory)
      };
      if (!searchType){
        return items;
      };
    }

    useEffect(() =>{
      if (searchByTitle && searchByCategory) setFilteredItems(filterBy('By_All', items, searchByTitle, searchByCategory));
      if (searchByTitle && !searchByCategory) setFilteredItems(filterBy('By_title', items, searchByTitle, searchByCategory));
      if (!searchByTitle && searchByCategory) setFilteredItems(filterBy('By_category', items, searchByTitle, searchByCategory));
      if (!searchByTitle && !searchByCategory) setFilteredItems(filterBy(null, items, searchByTitle, searchByCategory));
    }, [items, searchByTitle, searchByCategory])

    // POST Visitors
    const addVisitor = async (visitor) => {
      const response = await fetch(`${apiUrl}/visitors`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(visitor),
      });
  
      if (response.ok) {
        const newVisitor = await response.json();
        setVisitors((prevVisitors) => [...prevVisitors, newVisitor]);
      } else {
        const error = await response.json();
        console.error("Error adding visitor:", error);
      }
    };

    // GET Visitors
    useEffect(() => {
      const fetchVisitors = async () => {
        try {
          const response = await fetch(`${apiUrl}/visitors`);
          const visitorsData = await response.json();
          setVisitors(visitorsData);
        } catch (error) {
          console.error(`Error inesperado: ${error}`)
          setFetchError(error.message);
        } finally {
          setIsFetching(false);
        }
      };
    
      fetchVisitors();
      const interval = setInterval(fetchVisitors, 5000);
      return () => clearInterval(interval);
    }, []);

    useEffect(() => {
      if (visitors) {
        setLoading(false);
      }
    }, [visitors]);

    // Orders in Local Storage
    useState(() => {
      const savedOrder = localStorage.getItem("order");
      if (savedOrder) {
        setOrder(JSON.parse(savedOrder));
      }
    }, []);

    // Add order and save in local storage
    const addOrder = (newOrder) => {
      const updatedOrder = [...order, newOrder];
      setOrder(updatedOrder);
      localStorage.setItem("order", JSON.stringify(updatedOrder));
    };

    // Delete order
    const removeOrder = (index) => {
      const updatedOrder = order.filter((_, i) => i !== index);
      setOrder(updatedOrder);
      localStorage.setItem("order", JSON.stringify(updatedOrder));
    };

    return (
        <ShoppingCartContext.Provider
            value ={{
                account,
                setAccount,
                signOut,
                setSignOut,
                showNavBar,
                setShowNavBar,
                loading,
                error,
                isFetching,
                fetchError,
                items,
                setItems,
                filteredItems,
                setFilteredItems,
                searchByTitle,
                setSearchByTitle,
                searchByCategory,
                setSearchByCategory,
                openProductDetail,
                setOpenProductDetail,
                productShow,
                setProductShow,
                cartProducts,
                setCartProducts,
                openCartMenu,
                setOpenCartMenu,
                order,
                setOrder,
                addOrder,
                removeOrder,
                cartChecked,
                setCartChecked,
                isNewOrder,
                setIsNewOrder,
                showMobileMenu,
                setShowMobileMenu, 
                visitors,
                addVisitor,
                openVisitors,
                setOpenVisitors
            }}
        >
            {children}
        </ShoppingCartContext.Provider>
    )
}