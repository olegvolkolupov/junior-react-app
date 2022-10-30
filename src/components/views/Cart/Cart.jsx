import { Component } from "react";
import { connect } from "react-redux";

import { v4 as uuidv4 } from "uuid";

import CartItem from "./CartItem";

import styles from "./Cart.module.css";

class Cart extends Component {
  state = {
    sum: (0.0).toFixed(2),
    tax: (0.0).toFixed(2),
    currencySymbol: "",
  };

  componentDidMount() {
    let { cartItems, currencyId } = this.props;
    if (cartItems.length === 0) {
      return;
    }
    this.countSumAndTax();
    this.setState({
      currencySymbol: cartItems[0].product.prices[currencyId].currency.symbol,
    });
  }

  componentDidUpdate(prevProps) {
    const { cartItemsQuantity, currencyId, cartItems } = this.props;
    
    if (cartItemsQuantity !== prevProps.cartItemsQuantity) {
      this.countSumAndTax();
      localStorage.setItem("cartQuantity", JSON.stringify(cartItemsQuantity));
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }

    if (currencyId !== prevProps.currencyId) {
      this.countSumAndTax();
      if (cartItems.length === 0) {
        this.setState({
          currencySymbol: "",
        });
      } else {
        this.setState({
          currencySymbol:
            cartItems[0].product.prices[currencyId].currency.symbol,
        });
      }
    }
  }

  countSumAndTax = () => {
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
      tax: ((total * 21) / 100).toFixed(2),
    });
  };

  render() {
    let { sum, currencySymbol, tax } = this.state;
    let { cartItems, cartItemsQuantity } = this.props;
    return (
      <div className={styles.container}>
        <span className={styles.pageTitle}>Cart</span>
        <div className={styles.line} />
        {cartItems.length > 0 &&
          cartItems.map((item, idx) => (
            <div key={uuidv4()} className={styles.item}>
              <CartItem item={item} itemIndex={idx} />
              <div className={styles.line} />
            </div>
          ))}
        <div className={styles.billAndOrder}>
          <div className={styles.bill}>
            <div className={styles.billLabels}>
              <span className={styles.taxLabel}>Tax 21%:</span>
              <span className={styles.quantityLabel}>Quantity:</span>
              <span className={styles.totalLabel}>Total:</span>
            </div>
            <div className={styles.billSums}>
              <span className={styles.taxSum}>
                {currencySymbol}
                {tax}
              </span>
              <span className={styles.quantitySum}>{cartItemsQuantity}</span>
              <span className={styles.totalSum}>
                {currencySymbol}
                {sum}
              </span>
            </div>
          </div>
          <button className={styles.order} type="button">
            ORDER
          </button>
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

export default connect(mapStateToProps)(Cart);
