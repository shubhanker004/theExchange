import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import { QuantityPicker } from 'react-qty-picker';
import Button from '@mui/material/Button';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

import './productInfo.css'

const ProdNfo = (props) => {

  const handleAddToCart = () => {
    alert("Add to cart!");
  }
    const showProdTags = (detail) => (
        <div className="product_tags" style={{marginTop:"50px"}}>
            <div className="tag">
                <div><LocalShippingIcon/></div>
                <div className="tag_text">
                    { detail.shipping ?
                        <div>Free shipping is available</div>
                    :
                        <div>No free shipping for this item</div>
                    }
                </div>
            </div>
            { detail.available > 0 ?
                <div className="tag">
                    <div><DoneOutlineIcon/></div>
                    <div className="tag_text">
                        <div><strong>{detail.available}</strong> boxes available.</div>
                    </div>
                </div>
                :
                <div className="tag">
                    <div><DoneOutlineIcon/></div>
                    <div className="tag_text">
                        <div>Sorry, product not Available at the moment</div>
                    </div>
                </div>
            }
        </div>
    )


    const showProdActions = (detail) => (
        <div className="product_actions" style={{marginTop:"50px"}}>
            <div className="price">$ {detail.price}</div>
            <div className="cart" style={{marginTop:"20px"}}>
            <strong>Select Quantity</strong> 
            <QuantityPicker width='10rem' smooth min="1" max={detail.available} value="5"/>
            <Button size="large" variant="contained" style={{backgroundColor: '#3F51B5', color: '#FFFFFF', marginTop:"30px"}} onClick={() => {handleAddToCart(props.item)}}><AddShoppingCartIcon /></Button>
            </div>
        </div>
    )

    const showProdSpecs = (detail) => (
        <div style={{marginTop:"30px"}}>
            <h2>Specs:</h2>
            <div>
                <div className="item">
                    <strong>Category:</strong> {detail.category}
                </div>
                <div className="item">
                    <strong>Brand:</strong> {detail.brand.name}
                </div>
                <div className="item">
                    <strong>Model:</strong> {detail.model}
                </div>
                <div className="item">
                    <strong>Flavor:</strong> {detail.flavor}
                </div>
                <div className="item">
                    <strong>Nicotine Percentage:</strong> {detail.nicotinePercentage}%
                </div>
                <p></p>
                <div className="item">
                    <strong>Suggested Retail Price: ${detail.suggestedRetailPrice}</strong>
                </div>
            </div>
        </div>
    )


    const detail = props.detail
    return(
        <div>
            <h3 style={{marginTop:"50px"}}>{detail.brand.name} {detail.model} {detail.flavor}</h3>
            { showProdSpecs(detail)}
            { showProdTags(detail)}
            { showProdActions(detail)}
        </div>
    )

}


export default ProdNfo;