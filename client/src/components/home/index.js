import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Featured from './featured';
import FreeShippingPromo from 'utils/promotions/freeShippingPromotion';
import CardBlock from 'utils/products/card-blocks';
import { productsBySort } from 'store/actions/product-actions';
import Loader from 'utils/loader';


const freeShipping = {
  img:'/images/featured/freeShipping.jpg',
  linkTitle: "Shop Now",
  linkTo: '/shop'
};

const Home = () => {
  const { bySold, byDate} = useSelector(state => state.products);
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(productsBySort({
      limit:8,sortBy:'itemSold',order:'desc',where:'bySold'
    }));

    dispatch(productsBySort({
      limit:8,sortBy:'date',order:'desc',where:'byDate'
    }));
  },[dispatch])

  // console.log(bySold);

  return (
    <div>
      <Featured />

    <div style={{marginLeft:'3%'}}>
      { bySold ?
          <CardBlock
            items={bySold}
            title="Best Selling Products"
          />
      :<Loader />}
      </div>

      <FreeShippingPromo items={freeShipping}/>

      <div style={{marginLeft:'3%'}}>
      { byDate ?
          <CardBlock
            items={byDate}
            title="Our Latest Products"
          />
      :<Loader />}
      </div>
    </div>
  );

}

export default Home;