import React, { Component } from "react";

import styles from "./Backdrop.module.css";

export default class Backdrop extends Component {
  closeModal = () => {
    this.props.onBackdropClick();
  };

  render() {
    return (
      <div className={styles.backdrop} onClick={this.closeModal}>
        {this.props.children}
      </div>
    );
  }
}
