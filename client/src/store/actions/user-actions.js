import axios from 'axios';

import * as actions from './index';
import { getAuthHeader, removeTokenCookie, getTokenCookie} from '../../utils/tools';


axios.defaults.headers.post['Content-Type'] = 'application/json';

export const userRegister = (values) => {
  return async(dispatch) => {
    try {
      const user = await axios.post('/api/auth/register', {
        email: values.email,
        password: values.password
      });
      dispatch(actions.userAuthenticate({
        data: user.data.user,
        auth: true
      }));
      dispatch(actions.successGlobal("Welcome Customer! Please check your email to verify your account."))
    } catch(error){
      dispatch(actions.errorGlobal(error.response.data.message))
    }
  }
}


export const userSignIn = (values) => {
  return async(dispatch) => {
    try {
      const user = await axios.post('/api/auth/signin', {
        email: values.email,
        password: values.password
      });
      dispatch(actions.userAuthenticate({
        data: user.data.user,
        auth: true
      }));
      dispatch(actions.successGlobal('Welcome Customer!'))
    } catch(error){
      dispatch(actions.errorGlobal(error.response.data.message))
    }
  }
}


export const userIsAuth = () => {
  return async(dispatch) => {
    try{
      const site = await axios.get('/api/site');
      dispatch(actions.getSiteVars(site.data));

      if(!getTokenCookie()) {
        throw new Error();
      } 

      const user = await axios.get('/api/auth/isauth', getAuthHeader());

      dispatch(actions.userAuthenticate({data: user.data, auth: true}));

    } catch(error) {
      dispatch(actions.userAuthenticate({data:{}, auth: false}));
    }
  }
}


export const userSignOut = () => {
  return async(dispatch) => {
    removeTokenCookie();
    dispatch(actions.userSignout());
    dispatch(actions.successGlobal('You are successfully logged out.'))
  } 
}


export const userUpdateProfile = (data) => {
  return async(dispatch, getState) => {
    try{
      const profile = await axios.patch('/api/users/profile',data, getAuthHeader());

      profile.data=data;

      const userData = {
        ...getState().users.data,
        firstName: profile.data.firstName,
        lastName: profile.data.lastName,
        address: profile.data.address,
        phone: profile.data.phone
      }
      dispatch(actions.userUpdateProfile(userData))
      dispatch(actions.successGlobal("Your profile was updated successfully."))

    } catch(error) {
      dispatch(actions.errorGlobal(error.response.data.message))
    }
  }
}


export const userChangeEmail = (data) => {
  return async (dispatch) => {
    try {
      await axios.patch(
        `/api/users/email`,
        {
          email: data.email,
          newemail: data.newemail,
        },
        getAuthHeader()
      );

      dispatch(actions.userChangeEmail(data.newemail));
      dispatch(
        actions.successGlobal("Please check your email to verify your new email address.")
      );
    } catch (error) {
      dispatch(actions.errorGlobal(error.response.data.message));
    }
  };
}; 


export const userAddToCart = (product, quantity = 1) => {
  return async(dispatch, getState)=>{
    try{
        dispatch(actions.successGlobal(`${quantity} ${product.brand.name} ${product.model} ${product.flavor} ${product.puffs} puffs is added to your cart.`))
    } catch(error){
        dispatch(actions.errorGlobal(error.response))
    }
  }
}

export const userPurchaseSuccess = (details, data) => {
  return async(dispatch) => {
    try {
      const user = await axios.post('/api/transaction', {
        orderID: data.orderID,
        payerID: data.payerID,
        paymentID: data.paymentID,
        purchase_units: details.purchase_units
      }, getAuthHeader());
      localStorage.clear();
      dispatch(actions.successGlobal('Thank you for doing business with us. We appreciate that.'));
      dispatch(actions.userPurchaseSuccess(user.data));
    } catch(error) {
      dispatch(actions.errorGlobal(error.response.data.message))
    }
  }
}




