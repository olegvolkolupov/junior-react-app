import React, { Component } from "react";

import styles from "./CurrencyChoiceModal.module.css";

export default class CurrencyChoiceModal extends Component {
  closeModal = () => {
    this.props.onBackdropClick();
  };

  render() {
    return (
      <div className={styles.backdrop} onClick={this.closeModal}>
        <div className={styles.modal}>{this.props.children}</div>
      </div>
    );
  }
}
