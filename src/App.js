import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import { connect } from "react-redux";

import AppRouter from "./components/AppRouter";
import Header from "./components/Header/Header";

import { getCategories } from "./services/API/fetches";
import {
  setCategories,
  setSelectedCategory,
} from "./services/redux/actions/categoryActions";

import "./global.css";

class App extends Component {
  async componentDidMount() {
    const categories = await getCategories();
    await this.props.setCategories(categories);
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
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
