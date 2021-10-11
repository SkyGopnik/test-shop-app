import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CLEAR_CART
} from './actions';

export interface CartItem {
  id: number,
  name: string,
  description: string,
  img: string,
  price: number
}

export interface CartReducerInterface {
  cart?: {
    array: Array<CartItem>
  },
  addToCart?(item),
  removeFromCart?(index),
  clearCart?()
}

const defaultState = {
  array: []
};

export const cartReducer = (state = defaultState, action) => {
  const { type, payload } = action;

  if (type === ADD_TO_CART) {
    const newCart = [...state.array];

    newCart.push(action.payload);

    return {
      array: newCart
    };
  }

  if (type === REMOVE_FROM_CART) {
    const newCart = [...state.array];

    newCart.splice(payload, 1);

    return {
      array: newCart
    };
  }

  if (type === CLEAR_CART) {
    return {
      array: []
    };
  }

  return state;
};
