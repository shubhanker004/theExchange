import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from 'react-cookie';
import { PayPalButton } from 'react-paypal-button-v2';
import { Divider } from '@mui/material';

import DashboardLayout from "hoc/dashboardLayout";
import Loader from "utils/loader";
import CartDetail from "./cartDetail";
import  { userPurchaseSuccess } from 'store/actions/user-actions';


const UserCart = (props) => {
  const [loading, setLoading] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(['cartCookie']);
  const [update, setUpdate] = useState(0);
  const notifications = useSelector((state) => state.notifications);
  const dispatch = useDispatch();

  let currCart = [];
  const removeItem = (position) => {
    currCart = JSON.parse(localStorage.getItem("theExchCartCookie"));
    currCart.splice(position, 1);
    localStorage.setItem("theExchCartCookie", JSON.stringify([...currCart]));
    if(update===0) setUpdate(update+1);
    if(update===1) setUpdate(update-1);
  };

  const calculateTotal = () => {
    let total = 0;
    JSON.parse(localStorage.getItem("theExchCartCookie")).forEach((item) => {
      total += parseFloat(item.price * item.qty * 10, 10);
    });
    return total;
  };

  const generateUnits = () => (
    [{
      description:"Vapes",
      amount:{
        currency_code:"USD",
        value:calculateTotal(),
        breakdown:{
          item_total:{
            currency_code:"USD",
            value:calculateTotal()
          }
        }
      },
      items:generateItems()
    }]
  );

  const generateItems = () => {
    let items =  JSON.parse(localStorage.getItem("theExchCartCookie")).map((item)=>({
      unit_amount:{
        currency_code:"USD",
        value: item.price*10
      },
      quantity:item.qty,
      name: item.brand.name+" "+item.model+" "+item.flavor
    }));
    return items;
  }

  useEffect(() => {
    if(notifications && notifications.success) {
      props.history.push('/dashboard');
    }
    if(notifications && notifications.error) {
      setLoading(false);
    }
  },[notifications, props.history])
 
  useEffect(()=>{
    
  },[update])

  return (
    <DashboardLayout title="Your Cart">
      {JSON.parse(localStorage.getItem("theExchCartCookie")) ? (
        <>
          <div style={{ fontSize: "23px", color: "grey", marginLeft: "50%" }}>
            <div>
              Total amount to pay:{" "}
              <strong style={{ fontSize: "30px", color: "black" }}>
                ${calculateTotal()}
              </strong>{" "}
              /-
            </div>
          </div>
          <CartDetail
            products={JSON.parse(localStorage.getItem("theExchCartCookie"))}
            removeItem={(position) => removeItem(position)}
          />

          {loading ? (
            <Loader />
          ) : (
            <div >
              <div style={{
                  marginTop: "60px",
                  marginBottom: "60px",
                  marginLeft: "15vw",
                }}
              >
              <PayPalButton
                options={{
                  clientId:
                    "AQOOJPclDvlfoZX1LCR0S16xEkeQZMKsvuYjSio_i070KlNI64KbqRlbsXSUniaWPzN0r9_du-MnQB3z",
                  currency: "USD",
                  disableFunding:['paylater', 'credit']
                }}
                createOrder={(data, actions)=>{
                  return actions.order.create({
                    purchase_units: generateUnits()
                  })
                }}
                onSuccess={(details, data)=>{
                  console.log(details);
                  console.log(data);
                  console.log(details.purchase_units)
                  dispatch(userPurchaseSuccess(details, data));
                  setLoading(true);
                }}
                onCancel={(data)=>{
                  setLoading(false);
                  return(<strong>:(<br/>Your transaction was cancelled and thus not completed!</strong>);
                }}
                onError={(data)=>{
                  setLoading(false);
                  return(<strong>:(<br/>Your transaction could not be completed due to some unknown error!</strong>);
                }}
              />
              </div>
              {/* <Divider style={{ marginTop: "20px", marginBottom: "50px"}} >OR</Divider> */}
              {/* <div style={{marginLeft:"18%",marginBottom:"50px", fontWeight:"700", fontSize:"20px"}}>OR</div>
              <btn
                style={{
                  marginTop: "60px",
                  marginBottom: "60px",
                  marginLeft: "15%",
                  // marginRight: "2vw",
                  // width:"60vw",
                  backgroundColor: "black",
                  color: "white",
                  textAlign: "center",
                  fontWeight: "600",
                  fontSize: "26px",
                  borderRadius: "4px",
                  padding: "10px",
                  cursor: "pointer"
                }}
              >
                CASH
              </btn> */}
            </div>
          )}
        </>
      ) : (
        <div>There is nothing in your cart</div>
      )}
    </DashboardLayout>
  );
};

export default UserCart;
