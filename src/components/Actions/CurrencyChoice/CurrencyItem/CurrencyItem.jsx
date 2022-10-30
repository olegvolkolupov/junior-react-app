import React, { Component } from 'react';

import styles from "./CurrencyItem.module.css";

export default class CurrencyItem extends Component {
  render() {
    let { currency, index, onCurrencyItemClick } = this.props;
    return (
      <li
        className={styles.currencyItem}
        data-index={index}
        onClick={onCurrencyItemClick}
      >
        {currency.symbol} {currency.label}
      </li>
    );
  }
}