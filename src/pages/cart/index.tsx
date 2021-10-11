import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom"

import {removeFromCart, clearCart} from "src/store/cart/actions";

import {CartReducerInterface} from "src/store/cart/reducers";

import style from "./index.module.scss";

interface IProps extends CartReducerInterface {

}

export class Index extends React.Component<IProps, any> {
  constructor(props, context) {
    super(props, context);

    this.state = {
      phone: ""
    };
  }

  render() {
    const { cart, removeFromCart, clearCart } = this.props;
    const { phone } = this.state;

    const disabled = cart.array.length === 0 || phone.length === 0;

    return (
      <div className={style.container}>
        <div className={style.cartInner}>
          <div className={style.list}>
            {cart.array.length !== 0 ? (
              cart.array.map((item, index) => (
                <div className={style.item} key={index}>
                  <img src={item.img} alt=""/>
                  <div className={style.name}>{item.name} - {item.price} &#8381;</div>
                  <div className={style.description}>{item.description}</div>
                  <div className={style.close} onClick={() => removeFromCart(index)}>X</div>
                </div>
              ))
            ) : (
              <div className={style.placeholder}>
                <div className={style.title}>Ничего не найдено</div>
                <div className={style.description}>Сначала добавьте товары в корзину</div>
              </div>
            )}
          </div>
          <div className={style.order}>
            <div className={style.item}>
              <div className={style.caption}>Телефон для связи</div>
              <input
                value={phone}
                type="text"
                placeholder="+7 985 876 12 53"
                disabled={cart.array.length === 0}
                onChange={(e) => this.setState({
                  phone: e.target.value
                })}
              />
            </div>
            <div className={style.item}>
              <Link to="/">
                <button disabled={disabled} onClick={() => clearCart()}>
                  Подтвердить заказ
                </button>
              </Link>
            </div>
          </div>
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
