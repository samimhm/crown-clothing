import { Link } from 'react-router-dom'

import { CategoryPreviewContainer, Title, Preview} from './category-preview.styles.jsx'
import ProductCard from '../product-card/product-card.component'
const CategoryPreview = ({ title, products}) => {
    return (
        <CategoryPreviewContainer>
            <h2>
                <Title><Link to={`${title.toLowerCase()}`}>{title.toUpperCase()}</Link></Title>
            </h2>
            <Preview>
                {
                    products
                    .filter((_, idx) =>  idx < 4)
                    .map(product => 
                        <ProductCard key={product.id} product={product}/>
                        )
                }
            </Preview>
        </CategoryPreviewContainer>
    )
}

export default CategoryPreview