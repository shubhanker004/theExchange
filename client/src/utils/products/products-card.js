import * as React from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

import { renderCardImage } from '../tools';


const handleAddToCart = () => {
  alert("Add to cart!");
}

export default function ProductsCard( props ) {
  return (
    <Card sx={{ maxWidth: 337 }}>
      <CardMedia
        component="img"
        alt= {props.item.flavor}
        height="380"
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
        <Button size="medium" variant="contained" style={{backgroundColor: '#3F51B5', color: '#FFFFFF'}} onClick={() => {handleAddToCart(props.item)}}><AddShoppingCartIcon /></Button>
      </CardActions>
    </Card>
  );
}