import React, { Component } from "react";
import { connect } from "react-redux";
import parse from "html-react-parser";

import { getProductDetail } from "../../../services/API/fetches";
import { addToCart } from "../../../services/redux/actions/cartActions";
import { changeCartItemsAmount } from "../../../services/redux/actions/cartActions";
import Attributes from "./Attributes";

import styles from "./ProductDetail.module.css";

class ProductDetail extends Component {
  state = {
    product: {},
    bigImage: "",
    selectedAttributes: {},
  };

  async componentDidMount() {
    this.setState({
      product: await getProductDetail(this.props.match.params.id),
    });
  }

  componentDidUpdate(prevProps, prevState) {
    let { product } = this.state;
    if (product !== prevState.product) {
      if (product.gallery && product.gallery.length > 0)
        this.setState({
          bigImage: product.gallery[0],
        });
      if (product.attributes && product.attributes.length > 0) {
        this.setDefaultSelectedAttributes();
      }
    }
    
    let { cart, cartQuantity } = this.props;
    if(cart !== prevProps.cart) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
    if(cartQuantity !== prevProps.cartQuantity) {
      localStorage.setItem("cartQuantity", JSON.stringify(cartQuantity));
    }
  }

  setBigImage = (imageSrc) => {
    this.setState({
      bigImage: imageSrc,
    });
  };

  setDefaultSelectedAttributes = () => {
    this.setState(({product, selectedAttributes}) => {
      product.attributes.forEach(({ id, items }) => {
        selectedAttributes[id] = items[0].id;
      });
    });
  };

  changeSelectedAttribute = (attributeId, itemId) => {
    this.setState(({selectedAttributes}) => {
      for(let attrKey in selectedAttributes) {
        if(attrKey === attributeId) {
          selectedAttributes[attrKey] = itemId;
        }
      }
    })
  };

  addProductToCart = () => {
    this.props.addProductToCart(this.state.product, this.state.selectedAttributes);
    this.props.addOneToCartQuantity(1);
  };

  render() {
    const { gallery, name, brand, description, attributes, prices } =
      this.state.product;
    const { currencyId } = this.props;

    return (
      <div className={styles.container}>
        <div className={styles.galleryIcons}>
          {gallery &&
            gallery.length > 0 &&
            gallery.map((item) => (
              <div
                key={item}
                className={styles.iconContainer}
                onClick={() => this.setBigImage(item)}
              >
                <img className={styles.icon} src={item} alt="icon" />
              </div>
            ))}
        </div>
        <div className={styles.bigImageContainer}>
          <img
            className={styles.bigImage}
            src={this.state.bigImage}
            alt="Preview"
          />
        </div>
        <div className={styles.fullDescriptionContainer}>
          <div className={styles.name}>{name}</div>
          <div className={styles.brand}>{brand}</div>
          <div className={styles.attributes}>
            {attributes &&
              attributes.length > 0 &&
              attributes.map((attribute) => (
                <Attributes key={attribute.id} attribute={attribute} changeSelectedAttribute={this.changeSelectedAttribute} />
              ))}
          </div>
          <div className={styles.priceContainer}>
            <div className={styles.priceTitle}>PRICE:</div>
            <div className={styles.price}>
              {prices && prices.length > 0 && (
                <>
                  <span>{prices[currencyId].currency.symbol}</span>
                  <span>{prices[currencyId].amount}</span>
                </>
              )}
            </div>
          </div>
          <button
            className={styles.addToCartBtn}
            type="button"
            onClick={() => this.addProductToCart()}
          >
            ADD TO CART
          </button>
          {description && (
            <div className={styles.description}>{parse(description)}</div>
          )}
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
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
