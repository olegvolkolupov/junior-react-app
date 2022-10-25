import React, { Component } from "react";
import { connect } from "react-redux";

import CategoryMenu from "./CategoryMenu";

import styles from "./CategoryNavigator.module.css";

class CategoryNavigator extends Component {
  render() {
    return (
      <div className={styles.categories}>
        {this.props.catiegories.length > 0 && <CategoryMenu />}
      </div>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    catiegories: state.categories,
  }
}

export default connect(mapStateToProps)(CategoryNavigator);