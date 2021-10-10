import React from "react";
import {connect} from "react-redux";

import Header from "src/components/Header";

import {removeFromCart, clearCart} from "src/store/cart/actions";

import {CartReducerInterface} from "src/store/cart/reducers";

import style from "./index.module.scss";

export class Index extends React.Component<any, any> {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div>
        d
      </div>
    );
  }
}

export default connect((state: CartReducerInterface) => ({
  cart: state.cart
}), {
  removeFromCart,
  clearCart
})(Index);
