import * as actions from "./index";
import axios from "axios";

import { getAuthHeader } from '../../utils/tools';

export const getAllBrands = () => {
  return async(dispatch) => {
    try {
      const brands = await axios.get(`/api/brands/all`);
      dispatch(actions.getAllBrands(brands.data));
    } catch (error) {
      dispatch(actions.errorGlobal(error.response.data.message));
    }
  };
};

export const addBrand = (data) => {
  return async(dispatch) => {
    try {
      const brand = await axios.post('/api/brands/brand',{brandname:data}, getAuthHeader());
      dispatch(actions.addBrand(brand));
      dispatch(actions.successGlobal(`${data} was added successfully.`))
    } catch(error) {
      dispatch(actions.errorGlobal(error.response.data.message))
    }
  }
}
