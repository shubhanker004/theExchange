import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { QuantityPicker } from 'react-qty-picker';

import { userAddToCart } from 'store/actions/user-actions';
import CartModal from 'utils/cartModal';
import { renderCardImage } from '../tools';



export default function ProductsCard( props ) {

  const [quantity, setQuantity] = useState(0);
  const [modal, setModal] = useState(false);
  const [update, setUpdate] = useState(0);
  const [errorType, setErrorType] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(['cartCookie']);
  const user = useSelector(state => state.users);
  const dispatch = useDispatch();

  const handleClose = () => setModal(false);
  const handleAddToCart = (item) => {
    // removeCookie('cartCookie', { path: '/' });
    // console.log(cookies.cartCookie);
    if(!user.auth) {
      setModal(true);
      setErrorType('auth');
      return false;
    }
    // if(!user.data.verified) {
    //   setModal(true);
    //   setErrorType('verify');
    //   return false;
    // }

    if(JSON.parse(localStorage.getItem("theExchCartCookie")) == null) {
      localStorage.setItem('theExchCartCookie', JSON.stringify([{ ...item, qty: 1 }]));
    } else {
      let currCart = JSON.parse(localStorage.getItem("theExchCartCookie"));

      const exist = currCart.findIndex((cartItem) => cartItem._id === item._id);
      if (exist !== -1) {
        currCart[exist].qty += 1;
      } else {
        currCart.push({ ...item, qty: 1 });
      }

      localStorage.setItem("theExchCartCookie", JSON.stringify([...currCart]));
    }
      
    if(update===0) setUpdate(update+1);
    if(update===1) setUpdate(update-1);
    dispatch(userAddToCart(item));
  }

  useEffect(()=>{
    
  },[update])

  return (
    <div>
    <Card sx={{ width: 280 }}>
      <CardMedia
        component="img"
        alt= {props.item.flavor}
        height="280"
        image= {renderCardImage(props.item.images)}
      />
      <CardContent>
        <Typography gutterBottom variant="BUTTON TEXT" component="div" sx={{display:'flex', justifyContent:'center', color:'#3F51B5'}}>
          {props.item.brand.name} {' '}{props.item.model}
        </Typography>
        <Typography gutterBottom variant="h5" component="div" sx={{display:'flex', justifyContent:'center', fontWeight:'bold'}}>
        {props.item.flavor}
        </Typography>
        <Typography gutterBottom variant="h6" component="div" sx={{display:'flex', justifyContent:'center'}}>
          ${props.item.price}
        </Typography>
      </CardContent>
      
      <CardActions sx={{display:'flex', justifyContent:'center'}}>
        <Button size="medium" variant="contained" style={{backgroundColor: '#333333', color: '#FFFFFF', marginRight: '20px'}} component={Link} to={`/product_detail/${props.item._id}`} >See Details</Button>
        {props.item.available ?
          <Button size="medium" variant="contained" style={{backgroundColor: '#3F51B5', color: '#FFFFFF'}} onClick={() => {handleAddToCart(props.item)}}><AddShoppingCartIcon /></Button>
         :
         <Button size="medium" variant="contained" disabled style={{backgroundColor: '#3F51B5', color: '#FFFFFF'}} onClick={() => {handleAddToCart(props.item)}}><AddShoppingCartIcon /></Button>
          }
      </CardActions>
    </Card>
    <CartModal 
      modal={modal}
      errorType={errorType}
      handleClose={handleClose}
    />
    </div>
  );
}