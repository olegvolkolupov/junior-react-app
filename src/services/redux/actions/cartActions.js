import Types from "../types";

export let addToCart = (product = {}, attributes = {}) => {
  return {
    type: Types.CART_ADD_ITEM,
    payload: {
      productForCart: {
        product: product,
        quantity: 1,
        selectedAttributes: attributes,
      },
    },
  };
};

export let setCartContent = (cart = []) => {
  return {
    type: Types.CART_CONTENT,
    payload: cart,
  }
}

export let checkOut = () => {
  return {
    type: Types.CHECK_OUT,
    payload: "",
  };
};

export let changeProductInCartAmount = (index = 0, amount = 0) => {
  return {
    type: Types.PRODUCT_AMOUNT,
    payload: {
      index,
      amount,
    },
  };
};

export let changeCartItemsAmount = (addOrRemoveOne = 0) => {
  return {
    type: Types.CART_AMOUNT,
    payload: addOrRemoveOne,
  };
};

export let setCartItemsAmount = (amount = 0) => {
  return {
    type: Types.START_CART_AMOUNT,
    payload: amount,
  };
};
