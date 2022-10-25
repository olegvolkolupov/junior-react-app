import React, { Component } from "react";

import CurrencyChoice from "./CurrencyChoice";
import Cart from "./Cart";

import styles from "./Actions.module.css";

export default class Actions extends Component {
  render() {
    return (
      <div className={styles.container}>
        <CurrencyChoice />
        <Cart />
      </div>
    );
  }
}