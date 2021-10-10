import React from "react";
import {connect} from "react-redux";
import {Link, withRouter} from "react-router-dom"

import {Icon16ShoppingCartOutline} from "@vkontakte/icons";

import {CartReducerInterface} from "src/store/cart/reducers";

import style from "./index.module.scss";

interface IProps extends CartReducerInterface {}

export class Header extends React.Component<IProps, any> {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { cart } = this.props;

    return (
      <header className={style.header}>
        <div className={style.container}>
          <div className={style.menu}>
            <Link to="/">
              <div className={style.item}>
                Главная
              </div>
            </Link>
          </div>
          <Link to="/cart">
            <div className={style.cart}>
              <Icon16ShoppingCartOutline fill="#fff" />
              Корзина
              {cart.array.length !== 0 && (
                <div className={style.count}>{cart.array.length}</div>
              )}
            </div>
          </Link>
        </div>
      </header>
    );
  }
}

export default connect((state: CartReducerInterface) => ({
  cart: state.cart
}))(withRouter(Header));
