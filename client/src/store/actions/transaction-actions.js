import axios from 'axios';

import * as actions from './index';
import { getAuthHeader, removeTokenCookie, getTokenCookie} from '../../utils/tools';

axios.defaults.headers.post['Content-Type'] = 'application/json';


export const getTransactionData = (args) => {
  return async(dispatch) =>{
    try{
      const transaction = await axios.post('/api/customer', args, getAuthHeader())
      dispatch(actions.getTransactionData(transaction.data));

    } catch(error) {
      dispatch(actions.errorGlobal(error.response.data.message));
    }
  }
}



