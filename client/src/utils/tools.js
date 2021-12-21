import { toast } from 'react-toastify';
import cookie from 'react-cookies';

// what image to be displayed on the product card
export const renderCardImage = (image) => {
  if(image.length > 0){
      return image[0]
  }else{
      return '/images/no-image.png'
  }
}


// to show the toast

export const showToast = (type, msg) => {

  switch(type) {
    case 'SUCCESS':
      toast.success(msg,{
        position:toast.POSITION.BOTTOM_RIGHT
      })
    break;
    case 'ERROR':
      toast.error(msg,{
        position:toast.POSITION.BOTTOM_RIGHT
      })
    break;
    default:
      return false;
  }
}

// display form error

export const errorHelper = (formik,value) => ({
  error: formik.errors[value] && formik.touched[value] ? true : false,
  helperText: formik.errors[value] && formik.touched[value] ? formik.errors[value]:null
});



// cookie manager to auto sign in users

export const getTokenCookie = () => {return(cookie.load('atl-sup-token'));};
export const removeTokenCookie = () =>  cookie.remove('atl-sup-token', {path: '/'});
export const getAuthHeader = () => {
  return { headers: { 'Authorization': `Bearer ${getTokenCookie()}`}}
}