import { combineReducers } from 'redux';

import { cartReducer } from './cart/reducers';

export default combineReducers({
  cart: cartReducer
});
