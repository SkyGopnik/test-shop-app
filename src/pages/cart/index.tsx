import React from "react";
import {connect} from "react-redux";

import {removeFromCart, clearCart} from "src/store/cart/actions";

import {CartReducerInterface} from "src/store/cart/reducers";

import style from "./index.module.scss";

interface IProps extends CartReducerInterface {

}

export class Index extends React.Component<IProps, any> {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { cart } = this.props;

    return (
      <div className={style.container}>
        <div className={style.cart}>
          {cart.array.length !== 0 ? (
            cart.array.map((item, index) => (
              <div className={style.item} key={index}>
                <img src={item.img} alt=""/>
                <div className={style.name}>{item.name} - {item.price} &#8381;</div>
                <div className={style.description}>{item.description}</div>
              </div>
            ))
          ) : (
            <div className={style.placeholder}>
              Товаров нет
            </div>
          )}
        </div>
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
