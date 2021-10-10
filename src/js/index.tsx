import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware  } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import 'src/style/index.scss';

import Header from "src/components/Header";

// Главный файл
import Index from 'src/pages';
import Cart from 'src/pages/Cart';

// Главный reducer
import rootReducer from 'src/store/reducers';

// Главный объект стора
export const store = createStore(rootReducer, applyMiddleware(thunk));

// Use scroll helper
const root = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Header />
      <Switch>
        <Route path="/" component={Index} exact />
        <Route path="/cart" component={Cart} />
      </Switch>
    </Router>
  </Provider>,
  root
);
