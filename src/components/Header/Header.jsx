import React, { Component } from "react";

import CategoryNavigator from "../CategoryNavigator";
import Actions from "../Actions";

import logo from "../icons/a-logo.svg";
import styles from "./Header.module.css";

export default class Header extends Component {
  render() {
    return (
      <div className={styles.container}>
        <CategoryNavigator />
        <div className={styles.logo}>
          <img className={styles.logoImg} src={logo} />
        </div>
        <Actions />
      </div>
    );
  }
}
