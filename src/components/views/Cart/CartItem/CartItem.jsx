import React, { Component } from "react";
import { connect } from "react-redux";

import Attributes from "./Attributes";

import {changeProductInCartAmount, changeCartItemsAmount, checkOut} from "../../../../services/redux/actions/cartActions"

import arrowLeft from "../../../icons/arrow-left.svg";
import arrowRight from "../../../icons/arrow-right.svg";

import styles from "./CartItem.module.css";

class CartItem extends Component {
  state = {
    galleryIdx: 0,
  }

  changeQuantity = (productInCartIdx, plusOrMinusOne) => {
    this.props.changeProductInCartAmount(productInCartIdx, plusOrMinusOne);
    this.props.changeCartItemsAmount(plusOrMinusOne);
    this.props.checkOut();
  };

  nextImage = () => {
    this.setState((state) => {
      if (state.galleryIdx === this.props.item.product.gallery.length - 1) {
        return {
          galleryIdx: 0,
        };
      }
      return {
        galleryIdx: state.galleryIdx + 1,
      };
    });
  };

  prevImage = () => {
    this.setState((state) => {
      if (state.galleryIdx === 0) {
        return {
          galleryIdx: this.props.item.product.gallery.length - 1,
        };
      }
      return {
        galleryIdx: state.galleryIdx - 1,
      };
    });
  }

  render() {
    let { galleryIdx } = this.state;
    let { item, itemIndex, currencyId } = this.props;
    let {product, quantity, selectedAttributes} = item;
    return (
      <div className={styles.mainContainer}>
        <div className={styles.infoAndAmountContainer}>
          <div className={styles.infoContainer}>
            <span className={styles.name}>{product.name}</span>
            <span className={styles.brand}>{product.brand}</span>
            <div className={styles.price}>
              {product.prices[currencyId].currency.symbol}
              {product.prices[currencyId].amount}
            </div>
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
          <div className={styles.amountContainer}>
            <button
              className={styles.plusMinusBtns}
              type="button"
              onClick={() => this.changeQuantity(itemIndex, 1)}
            >
              +
            </button>
            <div className={styles.itemAmount}>{quantity}</div>
            <button
              className={styles.plusMinusBtns}
              type="button"
              onClick={() => this.changeQuantity(itemIndex, -1)}
            >
              -
            </button>
          </div>
        </div>
        <div className={styles.imageContainer}>
          <img
            className={styles.image}
            src={product.gallery[galleryIdx]}
            alt="preview"
          />
          {product.gallery.length > 1 && (
            <div className={styles.arrowsContainer}>
              <img
                className={styles.nextImageArrow}
                src={arrowLeft}
                alt="left"
                onClick={this.prevImage}
              />
              <img
                className={styles.nextImageArrow}
                src={arrowRight}
                alt="right"
                onClick={this.nextImage}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    currencyId: state.currencyId,
  };
};

let mapDispatchToProps = {
  changeProductInCartAmount: changeProductInCartAmount,
  changeCartItemsAmount: changeCartItemsAmount,
  checkOut: checkOut,
};

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
