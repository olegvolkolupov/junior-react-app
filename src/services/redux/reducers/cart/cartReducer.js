import Types from "../../types";

function isEqual(obj1, obj2) {
  let result = true;
  let keys = Object.keys(obj1);
  for(let key of keys){
    if(obj1[key] !== obj2[key]){
      result = false;
    }
  }
  return result;
}

function findSameProductInState(state, { product, selectedAttributes }) {
  if (state.length === 0) {
    return undefined;
  };

  let {id} = product;
  for (let item of state) {
    if (item.product.id === id && isEqual(item.selectedAttributes, selectedAttributes)) {
      return item;
    }
  };
  return undefined;
}

export default function cartReducer(state = [], { type, payload }) {
  switch (type) {
    case Types.CART_ADD_ITEM: {
      const { productForCart } = payload;
      let sameProduct = findSameProductInState(state, productForCart);
      if (!sameProduct) {
        return [...state, productForCart];
      } else {
        ++sameProduct.quantity;
        return state;
      }
      break;
    };
    case Types.CART_CONTENT: {
      return payload;
      break;
    }
    case Types.CHECK_OUT:
      return state.filter(({ quantity }) => quantity !== 0);
      break;
    case Types.PRODUCT_AMOUNT: {
      const{index, amount} = payload;
      if (amount === 1 || state[index].quantity > 0) {
        state[index].quantity += amount;
      }
      return state;
      break;
    }
    default: {
      return state;
    }
  }
}
