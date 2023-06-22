import { createContext, useState } from 'react'

export const ShoppingCartContext = createContext();

export const ShoppingCartProvider = ({children}) => {
    // Shopping Cart
    const [count, setCount] = useState(0);
    const [cartProducts, setCartProducts] = useState([]);

    // Product Detail
    const [openProductDetail, setOpenProductDetail] = useState(false);
    const [productShow, setProductShow] = useState({});

    // Checkout Product
    const [isCheckoutMenu, setIsCheckOutMenu] = useState(false);
    const openCheckoutMenu = () => setIsCheckOutMenu(true);
    const closeCheckoutMenu = () => setIsCheckOutMenu(false);

    return (
        <ShoppingCartContext.Provider
            value ={{
                count,
                setCount,
                openProductDetail,
                setOpenProductDetail,
                productShow,
                setProductShow,
                cartProducts,
                setCartProducts,
                isCheckoutMenu,
                openCheckoutMenu,
                closeCheckoutMenu,
            }}
        >
            {children}
        </ShoppingCartContext.Provider>
    )
}