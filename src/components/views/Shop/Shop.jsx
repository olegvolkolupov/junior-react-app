import React, { Component } from "react";
import { connect } from "react-redux";

import Products from "../Products";

import styles from "./Shop.module.css";

class Shop extends Component {
  render() {
    return (
      <div className={styles.container}>
        <p className={styles.categoryName}>{this.props.selectedCategoryName}</p>
        <ul className={styles.productCardsContainer}>
          <Products />
        </ul>
      </div>
    );
  }
}

let mapStateToProps = (state) => {
  let {selectedCategory} = state;
  if(!selectedCategory.name){
    return {
      selectedCategoryName: "",
    };
  }
  let name = selectedCategory.name[0].toUpperCase() + selectedCategory.name.slice(1);
  return {
    selectedCategoryName: name,
  };
};

export default connect(mapStateToProps)(Shop);