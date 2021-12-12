import React from 'react';

import Carousels from 'utils/carousel';


const Featured = () => {

  const carouselItems = [
    {
      img:'/images/featured/kangvape3000featured.jpeg',
      lineOne: "Kangvape",
      lineTwo: "Now in 3000 puffs",
      lineTitle: "Shop Now",
      linkTo: '/shop'
    },
    {
      img:'/images/featured/hyde_featured_4flavors.png',
      lineOne: "Hyde",
      lineTwo: "All New Hyde",
      lineTitle: "Shop Now",
      linkTo: '/shop'
    },
    {
      img:'/images/featured/whiff_featured.jpg',
      lineOne: "Whiff",
      lineTwo: "Latest in stock",
      lineTitle: "Shop Now",
      linkTo: '/shop'
    },
    {
      img:'/images/featured/flyingMonkeyFeatured.png',
      lineOne: "Flying Monkey",
      lineTwo: "See Delta Products",
      lineTitle: "Shop Now",
      linkTo: '/shop'
    }
    
  ]


  return(
    <div className="featured_container">
      <Carousels items={carouselItems}/>
    </div>
  )
}

export default Featured;