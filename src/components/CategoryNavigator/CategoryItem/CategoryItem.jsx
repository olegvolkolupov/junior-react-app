import React, { Component } from 'react'
import { connect } from "react-redux";

import { getProductsForCurrentCategory } from "../../../services/API/fetches";

import { setSelectedCategoryName, setProductsForCurrentCategory } from "../../../services/redux/actions/categoryActions";

import styles from "./CategoryItem.module.css";
const navItemStyle = styles.link;
const navActiveItemStyle = styles.link + " " + styles.activeLink;

class CategoryItem extends Component {

  async setSelectedCategory(category) {
    if (category.name !== this.props.selectedCategory.name) {
      this.props.setSelectedCategoryName(category);
      this.props.setProductsForCurrentCategory(
        await getProductsForCurrentCategory(category.name)
      );
    }
  }

  render() {
    const { category, selectedCategory } = this.props;

    return (
      <div
        className={
          category.name === selectedCategory.name
            ? navActiveItemStyle
            : navItemStyle
        }
        onClick={() => this.setSelectedCategory(category)}
      >
        <span className={styles.linkName}>{category.name}</span>
      </div>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    selectedCategory: state.selectedCategory,
  };
};
  
let mapDispatchToProps = {
  setSelectedCategoryName: setSelectedCategoryName,
  setProductsForCurrentCategory: setProductsForCurrentCategory,
};
  
export default connect(mapStateToProps, mapDispatchToProps)(CategoryItem);