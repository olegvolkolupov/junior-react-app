import React, { Component } from 'react'
import { connect } from "react-redux";

import CartOverlay from "./CartOverlay";

import cart from "../../icons/empty-cart_black.svg";

import styles from "./Cart.module.css";

class Cart extends Component {
  state = {
    isCartOverlayVisible: false,
  };

  toggleCartOverlayVisibility = () => {
    this.setState({
      isCartOverlayVisible: !this.state.isCartOverlayVisible,
    })
  }

  render() {
    let {isCartOverlayVisible} = this.state;
    let { cartItemsQuantity } = this.props;
    return (
      <div className={styles.container}>
        <button
          className={styles.cart}
          type="button"
          onClick={this.toggleCartOverlayVisibility}
        >
          <img src={cart} />
          {cartItemsQuantity > 0 && (
            <div className={styles.cartQuantity}>{cartItemsQuantity}</div>
          )}
        </button>
        {isCartOverlayVisible && (
          <>
            <div className={styles.backdropTransparent} onClick={this.toggleCartOverlayVisibility} />
            <div className={styles.backdropDarkened} onClick={this.toggleCartOverlayVisibility} />
            <CartOverlay onBackdropClick={this.toggleCartOverlayVisibility} />
          </>
        )}
      </div>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    cartItemsQuantity: state.cartQuantity,
  };
};

export default connect(mapStateToProps)(Cart);