import React from 'react';

import ProductsCard from './products-card';
import './card-blocks.css';


const CardBlock = ({ items, title }) => {

  const renderCards = () => (
    items ?
      items.map((item)=>(
        <div className='cardsLeftMargin'> 
        <ProductsCard
          key={item._id}
          item={item}
        />
        </div>
      ))
    :null
  )


  return(
    <div>
      {title ? 
      <div className="title">{title}</div>
      :null}

      <div className='featured-product-adjustment'>  
      <div style={{
        display:'flex',
        flexWrap:'wrap',
        marginLeft:"2vw"
      }}> 
        { renderCards()}
      </div>
      </div>
    </div>
  )

}

export default CardBlock;