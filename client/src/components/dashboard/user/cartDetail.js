import React from "react";
import { renderCardImage } from "utils/tools";
import { Divider, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import "./cartDetail.css";

const CartDetail = ({ products, removeItem }) => {

  const renderItems = () => (
    <div className="shopping-cart">
    
      <div className="title1">{products.length} {products.length===1 ? 'item' : 'items'} in your cart</div>
      {products
        ? products.map((product, index) => (
            <div><div className="item1">
              <div className="buttons">
                <span className="delete-btn">
                  <IconButton
                    aria-label="delete"
                    onClick={() => {
                      removeItem(index);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </span>
              </div>

              <div className="image">
                <img src={renderCardImage(product.images)} alt="" />
              </div>

              <a href={`/product_detail/${product._id}`} style={{textDecoration:'none'}}>
                <div className="description">
                  <span style={{fontWeight:"700"}}>
                    {product.brand.name} {product.model}
                  </span>
                  <span style={{fontWeight:"600"}}>{product.flavor}</span>
                  <span style={{fontWeight:"600"}}>{`${product.puffs} puffs`}</span>
                </div>
              </a>

              <div className="quantity"><strong style={{fontWeight:"600"}}>{`${product.qty} boxes`}</strong></div>

              <div className="total-price"><strong style={{fontWeight:"400"}}>{`$${product.price}/pc`}</strong></div>

              <div className="total-price2">
                <strong style={{fontWeight:"700"}}>{`$${product.price*product.qty*10}`}</strong>
              </div>
              
            </div>
            <Divider style={{marginTop:"10px"}}/></div>
          ))
        : null}
        
    </div>
  );

  return <div>{renderItems()}</div>;
};

export default CartDetail;
