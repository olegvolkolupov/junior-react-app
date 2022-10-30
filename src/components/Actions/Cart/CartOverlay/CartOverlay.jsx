import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { v4 as uuidv4 } from "uuid";

import { CART_ROUTE } from "../../../utils/routeConsts";

import {changeCartItemsAmount, changeProductInCartAmount, checkOut} from "../../../../services/redux/actions/cartActions"

import Attributes from "./Attributes";

import styles from "./CartOverlay.module.css";

class CartOverlay extends Component {
  state = {
    sum: (0.0).toFixed(2),
    currencySymbol: "",
  };
  componentDidMount() {
    let { cartItems, currencyId } = this.props;
    if (cartItems.length === 0) {
      return;
    }
    this.countSum();
    this.setState({
      currencySymbol: cartItems[0].product.prices[currencyId].currency.symbol,
    });
  };
  componentDidUpdate(prevProps) { 
    let { cartItems, cartItemsQuantity } = this.props;
    if(cartItems !== prevProps.cartItems || cartItemsQuantity !== prevProps.cartItemsQuantity) {
      localStorage.setItem("cart", JSON.stringify(cartItems));
      localStorage.setItem("cartQuantity", JSON.stringify(cartItemsQuantity));
    }
  } 

  countSum = () => {
    let { cartItems, currencyId } = this.props;
    if (cartItems.length === 0) {
      return;
    }
    let total = 0;
    cartItems.forEach(({ product, quantity }) => {
      total += product.prices[currencyId].amount * quantity;
    });
    this.setState({
      sum: total.toFixed(2),
    });
  }

  changeQuantity = (event, productInCartIdx, plusOrMinusOne, currentAmountOfProduct) => {
    event.stopPropagation();
    if(currentAmountOfProduct === 0 && plusOrMinusOne === -1){
      return;
    }
    this.props.changeProductInCartAmount(productInCartIdx, plusOrMinusOne);
    this.props.changeCartItemsAmount(plusOrMinusOne);
    this.countSum();
  };

  handleCheckOut = (event) => {
    event.stopPropagation();

    this.props.checkOut();
  }

  closeModal = () => {
    this.props.onBackdropClick();
  };

  render() {
    let { sum, currencySymbol } = this.state;
    let { cartItems, cartItemsQuantity, currencyId } = this.props;
    return (
      <div className={styles.backdrop} onClick={this.closeModal}>
        <div className={styles.overlay}>
          <div className={styles.itemsContainer}>
            <div className={styles.myBagTitle}>
              <span className={styles.myBag}>My Bag,</span>
              <span className={styles.itemsQuantity}>
                {cartItemsQuantity} items
              </span>
            </div>
            <div className={styles.productsDetailsContainer}>
              {cartItems.length > 0 ? (
                cartItems.map(
                  ({ product, quantity, selectedAttributes }, idx) => (
                    <div key={uuidv4()} className={styles.productContainer}>
                      <div className={styles.infoWrap}>
                        <div className={styles.info}>
                          <div className={styles.titleAndPriceContainer}>
                            <div className={styles.title}>
                              <span className={styles.name}>
                                {product.name}
                              </span>
                              <span className={styles.brand}>
                                {product.brand}
                              </span>
                            </div>
                            <span className={styles.price}>
                              {product.prices[currencyId].currency.symbol}
                              {product.prices[currencyId].amount}
                            </span>
                            {product.attributes.length > 0 && (
                              <div className={styles.attributes}>
                                {product.attributes.map((attribute) => (
                                  <Attributes
                                    key={attribute.id}
                                    attribute={attribute}
                                    selectedAttributes={selectedAttributes}
                                  />
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className={styles.quantityChanger}>
                          <button
                            className={styles.plusMinusBtns}
                            type="button"
                            onClick={(event) =>
                              this.changeQuantity(event, idx, 1, quantity)
                            }
                          >
                            +
                          </button>
                          <span className={styles.quantity}>{quantity}</span>
                          <button
                            className={styles.plusMinusBtns}
                            type="button"
                            onClick={(event) =>
                              this.changeQuantity(event, idx, -1, quantity)
                            }
                          >
                            -
                          </button>
                        </div>
                      </div>
                      <div className={styles.imageWrap}>
                        <img
                          className={styles.image}
                          src={product.gallery[0]}
                          alt="preview"
                        />
                      </div>
                    </div>
                  )
                )
              ) : (
                <div>There's no products yet</div>
              )}
            </div>
            <div className={styles.totalPriceContainer}>
              <span className={styles.total}>Total</span>
              <span className={styles.price}>
                {currencySymbol}
                {sum}
              </span>
            </div>
          </div>
          <div className={styles.buttons}>
            <Link to={CART_ROUTE} className={styles.link}>
              <span className={styles.viewBag}>VIEW BAG</span>
            </Link>
            <button
              className={styles.checkoutButton}
              type="button"
              onClick={(event) => {this.handleCheckOut(event)}}
            >
              CHECK OUT
            </button>
          </div>
        </div>
      </div>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    cartItems: state.cart,
    cartItemsQuantity: state.cartQuantity,
    currencyId: state.currencyId,
  };
};

let mapDispatchToProps = {
  changeProductInCartAmount: changeProductInCartAmount,
  changeCartItemsAmount: changeCartItemsAmount,
  checkOut: checkOut,
}

export default connect(mapStateToProps, mapDispatchToProps)(CartOverlay);
