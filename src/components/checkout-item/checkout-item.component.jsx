import { CheckoutItemContainer, ImageContainer, Item, Arrow, Quantity, Value, RemoveButton } from './checkout-item.styles.jsx'
import { useContext } from 'react'
import { CartContext } from '../../contexts/cart.context'

const CheckoutItem = ({cartItem}) => {
    const { name, imageUrl, price, quantity } = cartItem
    const { clearItemFromCart, addItemToCart, removeItemToCart } = useContext(CartContext)

    const clearItemHandler = () => clearItemFromCart(cartItem)
    const addItemHanlder = () => addItemToCart(cartItem)
    const removeItemHandler = () => removeItemToCart(cartItem)

    return (
        <CheckoutItemContainer>
            <ImageContainer>
                <img src={imageUrl} alt={`${name}`}/>
            </ImageContainer>
            <Item>{name}</Item>
            <Quantity>
                <Arrow onClick={removeItemHandler}>&#10094;</Arrow>
                <Value>{quantity}</Value>
                <Arrow onClick={addItemHanlder}>&#10095;</Arrow>
            </Quantity>
            <Item>{price}</Item>
            <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
        </CheckoutItemContainer>
    )
}

export default CheckoutItem