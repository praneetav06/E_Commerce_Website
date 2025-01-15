import React from "react";
import './BreadCrumbs.css';
import arrow_icon from '../Assets/breadcrum_arrow.png';
const BreadCrumbs = (props) => { //mount the component in product page
    const {product} = props;
    return (
        <div className="breadcrumb">
            HOME <img src={arrow_icon} alt="arrow_icon" /> SHOP <img src={arrow_icon} alt="arrow_icon" /> category <img src={arrow_icon} alt="arrow_icon" /> name
        </div>
    )
}
export default BreadCrumbs;
