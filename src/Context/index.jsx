import { createContext, useState } from 'react'

export const ShoppingCartContext = createContext();

export const ShoppingCartProvider = ({children}) => {
    // Shopping Cart
    const [cartProducts, setCartProducts] = useState([]);
    const [openCartMenu, setOpenCartMenu] = useState(false);

    // Product Detail
    const [openProductDetail, setOpenProductDetail] = useState(false);
    const [productShow, setProductShow] = useState({});

    // Order
    const [order, setOrder] = useState([])
    const [cartChecked, setCartChecked] = useState(false);


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
                setOpenCartMenu,
                order,
                setOrder,
                cartChecked,
                setCartChecked
            }}
        >
            {children}
        </ShoppingCartContext.Provider>
    )
}