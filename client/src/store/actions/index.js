import { 
  GET_PROD_BY_SOLD,
  GET_PROD_BY_DATE,
  SUCCESS_GLOBAL,
  ERROR_GLOBAL, 
  CLEAR_NOTIFICATION,
  AUTH_USER,
  SIGN_OUT,
  UPDATE_USER_PROFILE,
  USER_CHANGE_EMAIL,
  GET_PRODUCT_PAGINATE,
  REMOVE_PRODUCT,
  GET_ALL_BRANDS,
  PRODUCT_ADD,
  CLEAR_PRODUCT_ADD,
  GET_PROD_BY_ID,
  CLEAR_CURRENT_PRODUCT
} from '../types';

// User authentication

export const userAuthenticate = (user) => ({
  type: AUTH_USER,
  payload: user
});

// User sign out

export const userSignout = () => ({
  type: SIGN_OUT
});


// Update user profile

export const userUpdateProfile = (userdata) => ({
  type: UPDATE_USER_PROFILE,
  payload:userdata
});

export const userChangeEmail = (data) => ({
  type: USER_CHANGE_EMAIL,
  payload: data
});


// For featured products of the home page

export const productsBySold = ( data ) => ({
  type: GET_PROD_BY_SOLD,
  payload: data
});

export const productsByDate = ( data ) => ({
  type: GET_PROD_BY_DATE,
  payload: data
});


// Paginate products

export const productsByPaginate = (products) => ({
  type: GET_PRODUCT_PAGINATE,
  payload: products
});

// Remove products

export const productRemove = () => ({
  type: REMOVE_PRODUCT
});

// Add products

export const productAdd = (product) => ({
  type: PRODUCT_ADD,
  payload: product
});

export const clearProductAdd = () => ({
  type: CLEAR_PRODUCT_ADD,
});

export const clearCurrentProduct = () => ({
  type: CLEAR_CURRENT_PRODUCT
})

// Edit Product

export const productById = (product) => ({
  type: GET_PROD_BY_ID,
  payload: product
})


// Brands

export const getAllBrands = (brands) =>({
  type: GET_ALL_BRANDS,
  payload: brands
})


// For notification system

export const successGlobal = ( msg ) => ({
  type: SUCCESS_GLOBAL,
  payload: msg
});

export const errorGlobal = ( msg ) => ({
  type: ERROR_GLOBAL,
  payload: msg
});


// Clearing notifications after rendering

export const clearNotifications = () => {
  return (dispatch) => {
    dispatch({
      type: CLEAR_NOTIFICATION
    });
  }
}


