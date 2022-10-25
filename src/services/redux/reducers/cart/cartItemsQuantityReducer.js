import Types from "../../types";

export default function cartItemsQuantityReducer(state = 0, action) {
  switch (action.type) {
    case Types.CART_AMOUNT:{
      if( action.payload === 1 || (action.payload === -1 && state > 0) ){
        state += action.payload;
      }
      return state;
      break;
    }
    default:
      return state;
  }
}
