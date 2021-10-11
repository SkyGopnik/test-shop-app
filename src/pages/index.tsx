import React from 'react';
import {connect} from "react-redux";

import classNames from "src/functions/classNames";
import {addToCart} from "src/store/cart/actions";

import {CartItem, CartReducerInterface} from "src/store/cart/reducers";

import style from "./index.module.scss";

const products = [
  {
    id: 1,
    name: "Nemoloko",
    description: "Растительный напиток Nemoloko овсяный, обогащенный кальцием и витамином В2, 3,2%, 1 л",
    img: "https://cdn1.ozone.ru/multimedia/1025743190.jpg",
    price: 50
  },
  {
    id: 2,
    name: "Nemoloko",
    description: "Растительный напиток Nemoloko овсяный, обогащенный кальцием и витамином В2, 3,2%, 1 л",
    img: "https://cdn1.ozone.ru/multimedia/1022185071.jpg",
    price: 200
  },
  {
    id: 3,
    name: "Nemoloko",
    description: "Растительный напиток Nemoloko овсяный, обогащенный кальцием и витамином В2, 3,2%, 1 л",
    img: "https://cdn1.ozone.ru/multimedia/1022185078.jpg",
    price: 150
  },
  {
    id: 4,
    name: "Nemoloko",
    description: "Растительный напиток Nemoloko овсяный",
    img: "https://cdn1.ozone.ru/s3/multimedia-i/6032795586.jpg",
    price: 100
  },
  {
    id: 5,
    name: "Nemoloko",
    description: "Растительный напиток Nemoloko овсяный, обогащенный кальцием и витамином В2, 3,2%, 1 л",
    img: "https://cdn1.ozone.ru/multimedia/1022185078.jpg",
    price: 50
  }
];

interface IProps extends CartReducerInterface {}

interface IState {
  search: string,
  items: Array<CartItem>
}

export class Index extends React.Component<IProps, IState> {
  public searchTimeout;

  constructor(props) {
    super(props);

    this.state = {
      search: "",
      items: [...products]
    };

    this.handleFilterSearch = this.handleFilterSearch.bind(this);
    this.handlePriceOrder = this.handlePriceOrder.bind(this);
  }

  onCartAdd(index) {
    const { addToCart } = this.props;
    const { items } = this.state;

    addToCart(items[index]);
  }

  handleFilterSearch(e) {
    const { value } = e.target;

    this.setState({
      search: value
    }, () => {
      clearTimeout(this.searchTimeout);

      this.searchTimeout = setTimeout(() => {
        const search = this.state.search.toLowerCase();

        if (search.length === 0) {
          this.setState({
            items: products
          });

          return;
        }

        this.setState({
          items: products.filter((item) => item.name.toLowerCase().indexOf(search) > -1)
        });
      }, 500);
    });
  }

  handlePriceOrder(e) {
    const { value } = e.target;
    const { items } = this.state;

    this.setState({
      search: value
    });

    if (value === "DEFAULT") {
      this.setState({
        items: [...products]
      });

      return;
    }

    this.setState({
      items: [...items.sort((a ,b) => value === "ASC" ? (a.price - b.price) : (b.price - a.price))]
    });
  }

  render() {
    const { items, search } = this.state;

    return(
      <section className={style.section}>
        <div className={style.container}>
          <div className={style.sectionInner}>
            <div className={style.list}>
              {items.length !== 0 ? (
                items.map((item, index) => (
                  <div className={style.item} key={item.id}>
                    <img src={item.img} alt=""/>
                    <div className={style.name}>{item.name} - {item.price} &#8381;</div>
                    <div className={style.description}>{item.description}</div>
                    <button
                      onClick={() => this.onCartAdd(index)}
                    >
                      В корзину
                    </button>
                  </div>
                ))
              ) : (
                <div className={classNames([style.item, style.placeholder])}>
                  <div className={style.title}>Ничего не найдено</div>
                  <div className={style.description}>Похоже товар который вы искали отсутствует, попробуйте позже</div>
                </div>
              )}
            </div>
            <div className={style.filter}>
              <div className={style.item}>
                <div className={style.caption}>Поиск</div>
                <input
                  type="text"
                  placeholder="Банан"
                  onChange={this.handleFilterSearch}
                />
              </div>
              <div className={style.item}>
                <div className={style.caption}>Цена</div>
                <select value={search} onChange={this.handlePriceOrder}>
                  <option value="DEFAULT">Не выбрано</option>
                  <option value="ASC">По возрастанию</option>
                  <option value="DESC">По убыванию</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default connect((state: CartReducerInterface) => ({
  cart: state.cart
}), {
  addToCart
})(Index);
