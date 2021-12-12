import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

import './freeShippingPromotion.css';

const FreeShippingPromotion = ({items}) => {


  const renderPromotion = () => (
    items ?
    <div>
    <div className="shipping_promotion_img"
      style={{
        background:`url(${items.img})`
      }}
    >
    </div>
    <div className="bttn">
      <Button size="Large" variant="contained" style={{backgroundColor: '#333333', color: '#FFFFFF', marginRight: '20px'}} component={Link} to={items.linkTo} >Shop Now</Button>
    </div>
    </div>
    :null
  )

  return(
    <div className="shipping_promotion">
      {renderPromotion()}
    </div>
  )



}

export default FreeShippingPromotion;