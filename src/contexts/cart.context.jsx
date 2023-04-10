import { createContext, useEffect, useState } from "react"

const addCardItem = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find(item => { return item.id === productToAdd.id})

    if(existingCartItem) {
        return cartItems.map( cartItem => cartItem.id === productToAdd.id ?
            {...cartItem, quantity: cartItem.quantity + 1}
            : cartItem
        )
    }

    return [...cartItems, {...productToAdd, quantity: 1}]
}

export const CartContext =  createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    cartCount: 0
})

export const CartProvider = ({children}) => {
    const [ isCartOpen, setIsCartOpen ] = useState(false)
    const [ cartItems, setCartItems ] = useState([])
    const [ cartCount, setCartCount ] = useState(0)

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
        setCartCount(newCartCount)
    }, [cartItems])

    const addItemToCart = (productToAdd) => {
        setCartItems(addCardItem(cartItems, productToAdd))
    }

    const value = { isCartOpen, setIsCartOpen, cartItems, addItemToCart, cartCount }

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}