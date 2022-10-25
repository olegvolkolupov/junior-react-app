import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import ProductItem from "./ProductItem/ProductItem";

import { PRODUCT_ROUTE } from "../../utils/routeConsts";

import styles from "./Products.module.css";

class Products extends Component {
  onMouseOver = (event) => {
    if (event.currentTarget.nodeName === "A") {
      event.currentTarget.classList.add("product-cart__mouseover");
    }
  };
  onMouseOut = (event) => {
    if (event.currentTarget.nodeName === "A") {
      event.currentTarget.classList.remove("product-cart__mouseover");
    }
  };

  render() {
    const { selectedCategory } = this.props;

    return (
      <>
        {selectedCategory.products &&
          selectedCategory.products.map((product) => (
            <li key={product.id} className={styles.productCard}>
              {product.inStock ? (
                <Link
                  to={PRODUCT_ROUTE + "/" + product.id }
                  className={styles.link}
                  onMouseOver={this.onMouseOver}
                  onMouseOut={this.onMouseOut}
                >
                  <ProductItem product={product} />
                </Link>
              ) : (
                <div>
                  <ProductItem product={product} />
                </div>
              )}
            </li>
          ))}
      </>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    selectedCategory: state.selectedCategory,
    currencyId: state.currencyId,
  };
};

export default connect(mapStateToProps)(Products);
