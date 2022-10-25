import Types from "../../types";

export default function currencySymbolReducer(state = "$", action) {
  switch (action.type) {
    case Types.CURRENCY_SYMBOL:
      return action.payload;
      break;
    default: {
      return state;
    }
  }
}