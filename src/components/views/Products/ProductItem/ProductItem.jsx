import React, { Component } from "react";
import { connect } from "react-redux";

import { addToCart } from "../../../../services/redux/actions/cartActions";
import { changeCartItemsAmount } from "../../../../services/redux/actions/cartActions";

import emptyCart from "../../../icons/empty-cart.svg";

import styles from "./ProductItem.module.css";

const cardStyleOutOfStock =
  styles.productCardImage + " " + styles.productCardImageOutOfStock;
const nameStyleOutOfStock = styles.productName + " " + styles.productOutOfStock;
const priceStyleOutOfStock =
  styles.productPrice + " " + styles.productOutOfStock;

class ProductItem extends Component {

  state = {
    isCartIconVisible: false
  }
  componentDidMount() {
    this.setState({
      isCartIconVisible: false
    })
  }
  componentDidUpdate(prevProps) { 
    let { cart, cartQuantity } = this.props;
    if(cart !== prevProps.cart) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
    if(cartQuantity !== prevProps.cartQuantity) {
      localStorage.setItem("cartQuantity", JSON.stringify(cartQuantity));
    }
  } 

  onMouseOver = () => {
    this.setState({
      isCartIconVisible: true
    })
  };
  onMouseOut = () => {
    this.setState({
      isCartIconVisible: false
    })
  };

  addProductToCart = (event, product) => {
    event.preventDefault();
    let defaultAttributes = {};
    product.attributes.forEach(({id, items}) => {
      defaultAttributes[id] = items[0].id;
    });

    this.props.addProductToCart(product, defaultAttributes);
    this.props.addOneToCartQuantity(1);
  }

  render() {
    const { product, currencyId } = this.props;
    const { inStock, name, brand, prices, gallery } = product;
    return (
      <div
        className={styles.productCardElement}
        onMouseOver={this.onMouseOver}
        onMouseOut={this.onMouseOut}
      >
        <div className={styles.imageContainer}>
          <img
            className={inStock ? styles.productCardImage : cardStyleOutOfStock}
            src={gallery[0]}
            alt={`${name} ${brand}`}
          />
          {!inStock && (
            <div className={styles.outOfStockText}>OUT OF STOCK</div>
          )}
          {this.state.isCartIconVisible && inStock && (
            <div
              className={styles.cartIconContainer}
              onClick={(event) => this.addProductToCart(event, product)}
            >
              <img className={styles.cartIcon} src={emptyCart} alt="cart" />
            </div>
          )}
        </div>
        <div className={styles.layoutSpacerBase} />
        <div className={styles.nameAndPriceContainer}>
          <div className={inStock ? styles.productName : nameStyleOutOfStock}>
            <span>{name}</span>
            <span>{brand}</span>
          </div>
          <div className={styles.productPriceContainer}>
            <div
              className={inStock ? styles.productPrice : priceStyleOutOfStock}
            >
              <span>{prices[currencyId].currency.symbol}</span>
              <span>{prices[currencyId].amount}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    currencyId: state.currencyId,
    cart: state.cart,
    cartQuantity: state.cartQuantity,
  };
};

let mapDispatchToProps = {
  addProductToCart: addToCart,
  addOneToCartQuantity: changeCartItemsAmount,
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductItem);
