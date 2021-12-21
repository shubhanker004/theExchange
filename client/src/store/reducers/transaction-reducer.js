import {
  GET_TRANSACTION_DATA
} from '../types';


export default function transactionReducer(state = {}, action) {
  switch(action.type) {
    case GET_TRANSACTION_DATA:
      return {
        ...state, 
        data: action.payload
      }
      
    default:
      return state;
  }
} 