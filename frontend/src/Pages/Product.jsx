import React, { useContext } from 'react';
import {shopContext} from '../Context/ShopContext';
import {useParams} from 'react-router-dom';
import BreadCrumbs from '../Components/BreadCrumbs/BreadCrumbs.jsx';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay.jsx';
import DescriptionBox from '../Components/DescriptionBox/DescriptionBox.jsx';
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts.jsx';
function Product() {
    const {all_product} = useContext(shopContext); //string
    const {productId} = useParams();
    const product = all_product.find((e) => e.id === Number(productId)); //number
    return (
        <div>
            <BreadCrumbs product={product}/>  
            <ProductDisplay product={product}/> 
            <DescriptionBox/> 
            <RelatedProducts/> 
        </div>
    )
}
export default Product;