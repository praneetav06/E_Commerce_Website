import React from "react";
import './BreadCrumbs.css';
import arrow_icon from '../Assets/breadcrum_arrow.png';
const BreadCrumbs = (props) => { //mount the component in product page
    const {product} = props;
    return (
        <div className="breadcrumb">
            HOME <img src={arrow_icon} alt="arrow_icon" /> SHOP <img src={arrow_icon} alt="arrow_icon" /> {product.category} <img src={arrow_icon} alt="arrow_icon" /> {product.name}
        </div>
    )
}
export default BreadCrumbs;
