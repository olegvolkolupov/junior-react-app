import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import { connect } from "react-redux";

import AppRouter from "./components/AppRouter";
import Header from "./components/Header/Header";

import { getCategories, getCurrencies } from "./services/API/fetches";
import {
  setCategories,
  setSelectedCategory,
} from "./services/redux/actions/categoryActions";
import {
  setCurrency,
  setCurrencyId,
  setCurrencySymbol,
} from "./services/redux/actions/currencyActions";
import {
  setCartItemsAmount,
  setCartContent,
} from "./services/redux/actions/cartActions";

import "./global.css";

class App extends Component {
  async componentDidMount() {
    await this.props.setCategories(await getCategories());
    await this.props.setCurrency(await getCurrencies());

    // currencyId
    let currencyId = JSON.parse(localStorage.getItem("currencyId"));
    if (currencyId) {
      this.props.setCurrencyId(currencyId);
    }
    // currencySymbol
    let currencySymbol = JSON.parse(localStorage.getItem("currencySymbol"));
    if (currencySymbol) {
      this.props.setCurrencySymbol(currencySymbol);
    }
    // cart
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (cart) {
      this.props.setCartContent(cart);
    }
    // cartQuantity
    let cartQuantity = JSON.parse(localStorage.getItem("cartQuantity"));
    if (cartQuantity) {
      this.props.setCartItemsAmount(cartQuantity);
    }
  }

  componentDidUpdate(prevProps) {
    let { categories } = this.props;
    if (prevProps.categories !== categories) {
      this.props.setSelectedCategory(categories[0]);
    }
  }

  render() {
    return (
      <BrowserRouter>
        <div className="layout">
          <Header />
          <AppRouter />
        </div>
      </BrowserRouter>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    categories: state.categories,
  };
};

let mapDispatchToProps = {
  setCategories: setCategories,
  setSelectedCategory: setSelectedCategory,
  setCurrency: setCurrency,
  setCurrencyId: setCurrencyId,
  setCurrencySymbol: setCurrencySymbol,
  setCartContent: setCartContent,
  setCartItemsAmount: setCartItemsAmount,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
