import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Carousel from "react-bootstrap/Carousel";

import { productById } from "store/actions/product-actions";
import { clearCurrentProduct } from "store/actions";
import ProdNfo from "./productInfo";
import Loader from "utils/loader";


import "./index.css";

const ProductDetail = (props) => {
  const products = useSelector((state) => state.products);
 
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(productById(props.match.params.id));
  }, [dispatch, props.match.params.id]);

  useEffect(() => {
    dispatch(clearCurrentProduct());
  }, [dispatch]);

  return (
    <div>
      <div className="container">
        <h1
          style={{ marginTop: "30px" }}
        >
        Product Detail
        </h1>
      </div>

      <div className="container">
        <div>
          {products && products.byId ? (
            <div>
              <Carousel variant="dark">
                {products.byId.images
                  ? products.byId.images.map((im) => (
                      <Carousel.Item>
                        <div className="carousel-adjustment">
                          <img
                            className="d-block w-100"
                            src={`${im}`}
                            alt={`${products.byId.brand} ${products.byId.model} ${products.byId.flavor} ${products.byId.puffs}puffs`}
                          />
                        </div>
                      </Carousel.Item>
                    ))
                  : null}
              </Carousel>
              <div className="product_detail_wrapper">
                <ProdNfo detail={products.byId}/>
              </div>
            </div>
          ) : (
            <Loader />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
