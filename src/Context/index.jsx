import { createContext, useState } from 'react'

export const ShoppingCartContext = createContext();

export const ShoppingCartProvider = ({children}) => {
    // Shopping Cart
    const [cartProducts, setCartProducts] = useState([]);

    // Product Detail
    const [openProductDetail, setOpenProductDetail] = useState(false);
    const [productShow, setProductShow] = useState({});

    // Checkout Product
    const [openCartMenu, setOpenCartMenu] = useState(false);

    return (
        <ShoppingCartContext.Provider
            value ={{
                openProductDetail,
                setOpenProductDetail,
                productShow,
                setProductShow,
                cartProducts,
                setCartProducts,
                openCartMenu,
                setOpenCartMenu
            }}
        >
            {children}
        </ShoppingCartContext.Provider>
    )
}