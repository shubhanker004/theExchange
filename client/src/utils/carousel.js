import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button'

import './carousel.css';


const Carousels = ({items}) => {

  return(
    <Carousel variant="dark">
      <Carousel.Item>
        <div className="carousel-adjustment">
          <img
            className="d-block w-100"
            src={items[0].img}
            alt={items[0].lineOne}
          />
          {/* <div className="tag-adjustment">
            <Carousel.Caption>
              <h5>{items[0].lineOne}</h5>
              <p>{items[0].lineTwo}</p>
              <div className="btn-adjustment"><Button variant="dark" href="/shop">Shop Now</Button></div>
            </Carousel.Caption>
          </div> */}
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className="carousel-adjustment">
          <img
            className="d-block w-100"
            src={items[1].img}
            alt={items[1].lineOne}
          />
          {/* <div className="tag-adjustment">
            <Carousel.Caption>
              <h5>{items[1].lineOne}</h5>
              <p>{items[1].lineTwo}</p>
              <div className="btn-adjustment"><Button variant="dark" href="/shop">Shop Now</Button></div>
            </Carousel.Caption>
          </div> */}
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className="carousel-adjustment">
          <img
            className="d-block w-100"
            src={items[2].img}
            alt={items[2].lineOne}
          />
          {/* <div className="tag-adjustment">
            <Carousel.Caption>
              <h5>{items[2].lineOne}</h5>
              <p>{items[2].lineTwo}</p>
              <div className="btn-adjustment"><Button variant="dark" href="/shop">Shop Now</Button></div>
            </Carousel.Caption>
          </div> */}
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className="carousel-adjustment">
          <img
            className="d-block w-100"
            src={items[3].img}
            alt={items[3].lineOne}
          />
          {/* <div className="tag-adjustment">
            <Carousel.Caption>
              <h5>{items[3].lineOne}</h5>
              <p>{items[3].lineTwo}</p>
              <div className="btn-adjustment"><Button variant="dark" href="/shop">Shop Now</Button></div>
            </Carousel.Caption>
          </div> */}
        </div>
      </Carousel.Item>
    </Carousel>
  );

}

export default Carousels;