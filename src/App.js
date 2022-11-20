import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import { connect } from "react-redux";

import AppRouter from "./components/AppRouter";
import Header from "./components/Header/Header";

import { getCurrencies, getCategoriesNames, getProductsForCurrentCategory } from "./services/API/fetches";
import {
  setCategoriesNames,
  setSelectedCategoryName,
  setProductsForCurrentCategory,
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
    await this.props.setCategoriesNames(await getCategoriesNames());
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

  async componentDidUpdate(prevProps) {
    let { categoriesNames } = this.props;
    if (prevProps.categoriesNames !== categoriesNames) {
      this.props.setSelectedCategoryName(categoriesNames[0]);
      this.props.setProductsForCurrentCategory(await getProductsForCurrentCategory(categoriesNames[0].name));
console.log(await getProductsForCurrentCategory("clothes"));
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
    categoriesNames: state.categoriesNames,
  };
};

let mapDispatchToProps = {
  setCategoriesNames: setCategoriesNames,
  setSelectedCategoryName: setSelectedCategoryName,
  setProductsForCurrentCategory: setProductsForCurrentCategory,
  setCurrency: setCurrency,
  setCurrencyId: setCurrencyId,
  setCurrencySymbol: setCurrencySymbol,
  setCartContent: setCartContent,
  setCartItemsAmount: setCartItemsAmount,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
