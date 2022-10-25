import React, { Component } from 'react'
import { connect } from "react-redux";

import { setSelectedCategory } from "../../../services/redux/actions/categoryActions";

import styles from "./CategoryMenu.module.css";
const navItemStyle = styles.link;
const navActiveItemStyle = styles.link + " " + styles.activeLink;

class CategoryMenu extends Component {
  render() {
    const { catiegories, selectedCategory, setSelectedCategory } = this.props;

    return catiegories.map((category) => (
      <button
        key={category.name}
        type="button"
        className={
          category.name === selectedCategory.name
            ? navActiveItemStyle
            : navItemStyle
        }
        onClick={() => setSelectedCategory(category)}
      >
        <span className={styles.linkName}>{category.name}</span>
      </button>
    ));
  }
}

let mapStateToProps = (state) => {
  return {
    catiegories: state.categories,
    selectedCategory: state.selectedCategory,
  };
};
  
let mapDispatchToProps = {
  setSelectedCategory: setSelectedCategory,
};
  
export default connect(mapStateToProps, mapDispatchToProps)(CategoryMenu);