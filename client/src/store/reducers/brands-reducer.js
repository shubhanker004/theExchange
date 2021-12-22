import {
  GET_ALL_BRANDS,
  ADD_BRAND
} from '../types';


export default function brandsReducer(state={},action){
  switch(action.type){
      case GET_ALL_BRANDS:
          return {...state, all: action.payload}

      case ADD_BRAND:
        return {...state, brand: action.payload}

      default:
          return state
  }
}