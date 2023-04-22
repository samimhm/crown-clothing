import {ProductCardContainer, Img, Footer} from './product-card.styles.jsx'
import Button, {BUTTON_TYPE_CLASSES} from '../button/button.component'
import { useContext } from 'react'
import { CartContext } from '../../contexts/cart.context'

const ProductCard = ({ product }) => {
    const { name, price, imageUrl } = product
    const { addItemToCart } = useContext(CartContext)

    const addToCart = () => addItemToCart(product)

    return (
        <ProductCardContainer>
            <Img src={imageUrl} alt={`${name}`}/>
            <Footer>
                <span className='name'>{name}</span>
                <span className='price'>{price}</span>
            </Footer>
            <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={addToCart}>Add to cart</Button>
        </ProductCardContainer>
    )
}

export default ProductCard