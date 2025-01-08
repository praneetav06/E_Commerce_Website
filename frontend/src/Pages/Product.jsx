import React, { useContext } from 'react';
import {shopContext} from '../Context/ShopContext';
import {useParams} from 'react-router-dom';
import BreadCrumbs from '../Components/BreadCrumbs/BreadCrumbs.jsx';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay.jsx';
function Product() {
    const {all_product} = useContext(shopContext); //string
    const {productId} = useParams();
    const product = all_product.find((e) => e.id === Number(productId)); //number
    return (
        <div>
            <BreadCrumbs product={product}/> 
            <ProductDisplay product={product}/>
        </div>
    )
}
export default Product;