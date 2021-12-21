import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { QuantityPicker } from 'react-qty-picker';
import Button from '@mui/material/Button';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

import CartModal from 'utils/cartModal';
import { userAddToCart } from 'store/actions/user-actions';
import './productInfo.css'

const ProdNfo = (props) => {
  const user = useSelector(state => state.users);
  const [quantity, setQuantity] = useState(0);
  const [update, setUpdate] = useState(0);
  const [cookies, setCookie, removeCookie] = useCookies(['cartCookie']);
  const [modal, setModal] = useState(false);
  const [errorType, setErrorType] = useState(null);
  const dispatch = useDispatch();

  const handleClose = () => setModal(false);

  const handleAddToCart = (item, quantity) => {
    // removeCookie('cartCookie', { path: '/' });
    // console.log(cookies.cartCookie);
    if(!user.auth) {
      setModal(true);
      setErrorType('auth');
      return false;
    }
    if(!user.data.verified) {
      setModal(true);
      setErrorType('verify');
      return false;
    }

    if(JSON.parse(localStorage.getItem("theExchCartCookie")) == null) {
      localStorage.setItem('theExchCartCookie', JSON.stringify([{ ...item, qty: quantity }]));
    } else {
      let currCart = JSON.parse(localStorage.getItem("theExchCartCookie"));

      const exist = currCart.findIndex((cartItem) => cartItem._id === item._id);
      if (exist !== -1) {
        currCart[exist].qty = quantity;
      } else {
        currCart.push({ ...item, qty: quantity });
      }

      localStorage.setItem("theExchCartCookie", JSON.stringify([...currCart]));
    }
        
    if(update===0) setUpdate(update+1);
    if(update===1) setUpdate(update-1);
    dispatch(userAddToCart(item, quantity));
  }

    const showProdTags = (detail) => (
      <div className="product_tags" style={{marginTop:"30px", marginBottom:"30px", marginLeft: "45%", display:"inline-block"}}>
          <div className="tag">
              <div><LocalShippingIcon/></div>
              <div className="tag_text">
                  { detail.shipping ?
                      <div>Free shipping available</div>
                  :
                      <div>Free shipping not available for this item</div>
                  }
              </div>
          </div>
          
      </div>
    )


    const showProdActions = (detail) => (
      <div
        className="product_actions"
        style={{
          marginTop: "30px",

          display: "inline-block",
        }}
      >
        <div className="price">$ {detail.price}</div>
        <div className="cart" style={{ marginTop: "20px" }}>
          {/* <QuantityPicker width="10rem" smooth value="5" /> */}
          <h6>Select Quantity:</h6>
          <input
            type="number"
            style={{
              width: "120px",
              height:"40px",
              backgroundColor: "#f2f4f7",
              borderRadius: "10px",
              fontSize:"18px"
            }}
            placeholder=" # of boxes"
            min='1'
            max={detail.available}
            onChange={event => setQuantity(event.target.value)} 
          ></input>
          <h6
            style={{ color: "red", marginTop: "10px" }}
          >{`Only ${detail.available} boxes available.`}</h6>
          {detail.available ? (
            <div>
              <Button
                size="medium"
                variant="contained"
                style={{
                  backgroundColor: "#3F51B5",
                  color: "#FFFFFF",
                  marginTop: "10px",
                }}
                onClick={() => {
                  handleAddToCart(detail, quantity);
                }}
              >
                Add to Cart
              </Button>
            </div>
          ) : (
            <div>
              <Button
                size="small"
                variant="contained"
                style={{
                  backgroundColor: "#3F51B5",
                  color: "#FFFFFF",
                }}
                onClick={() => {
                  handleAddToCart(props.item);
                }}
                disabled
              >
                Add to Cart
              </Button>
            </div>
          )}
        </div>
      </div>
    );

    const showProdSpecs = (detail) => (
        <div className="product_actions" style={{marginTop:"30px"}}>
            <h3>Specs:</h3>
            <div>
                <div className="item">
                    <strong>Category:</strong> {detail.category ? detail.category : "N/A"}
                </div>
                <div className="item">
                    <strong>Brand:</strong> {detail.brand.name ? detail.brand.name : "N/A"}
                </div>
                <div className="item">
                    <strong>Model:</strong> {detail.model ? detail.model : "N/A"}
                </div>
                <div className="item">
                    <strong>Flavor:</strong> {detail.flavor ? detail.flavor : "N/A"}
                </div>
                <div className="item">
                    <strong>Puffs:</strong> {detail.puffs ? detail.puffs : "N/A"} 
                </div>
                <div className="item">
                    <strong>Nicotine Percentage:</strong> {detail.nicotinePercentage ? detail.nicotinePercentage : "N/A"}%
                </div>
                <div className="item">
                    <strong>Oil Content:</strong> {detail.oilContent ? `${detail.oilContent} mL` : "N/A"} 
                </div>
                <div className="item">
                    <strong>Charge Port:</strong> {detail.chargePort ? detail.chargePort : "N/A"}
                </div>
                <div className="item">
                    <strong>Box Quantity:</strong> {detail.boxQuantity ? `${detail.boxQuantity}` : "N/A"} 
                </div>
                <p></p>
                <div className="item">
                    <strong>Suggested Retail Price: {detail.suggestedRetailPrice ? `$${detail.suggestedRetailPrice}` : null}</strong>
                </div>
            </div>
        </div>
    )

    useEffect(()=>{
    
    },[update])


    const detail = props.detail;
    return (
      <div>
        <h2 style={{ marginTop: "50px" }}>
          {detail.brand.name} {detail.model} {detail.flavor}
        </h2>
        {showProdActions(detail)}
        {showProdTags(detail)}
        {showProdSpecs(detail)}

        <CartModal
          modal={modal}
          errorType={errorType}
          handleClose={handleClose}
        />
      </div>
    );

}


export default ProdNfo;