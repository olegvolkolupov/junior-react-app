import Types from "../../types";

export default function productsForCurrentCategoryReducer(state = [], action) {
  switch (action.type) {
    case Types.PRODUCTS_FOR_CURRENT_CATEGORY:
      return action.payload;
      break;
    default: {
      return state;
    }
  }
}
