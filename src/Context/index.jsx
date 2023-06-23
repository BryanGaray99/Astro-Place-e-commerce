import { createContext, useState } from 'react'

export const ShoppingCartContext = createContext();

export const ShoppingCartProvider = ({children}) => {
    // Shopping Cart
    const [cartProducts, setCartProducts] = useState([]);
    const [openCartMenu, setOpenCartMenu] = useState(false);

    // Product Detail
    const [openProductDetail, setOpenProductDetail] = useState(false);
    const [productShow, setProductShow] = useState({});

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