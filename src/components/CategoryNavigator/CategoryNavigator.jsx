import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import CategoryItem from "./CategoryItem";

import styles from "./CategoryNavigator.module.css";

class CategoryNavigator extends Component {

  render() {
    let { categoriesNames } = this.props;

    return (
      <div className={styles.container}>
        {categoriesNames.length > 0 &&
          categoriesNames.map((category) => (
            <Link key={category.name} to="/" className={styles.link}>
              <CategoryItem category={category} />
            </Link>
          ))}
      </div>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    categoriesNames: state.categoriesNames,
  }
};
  
export default connect(mapStateToProps)(CategoryNavigator);