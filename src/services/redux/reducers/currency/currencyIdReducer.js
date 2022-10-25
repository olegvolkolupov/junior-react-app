import Types from "../../types";

export default function currencyIdReducer(state = 0, action) {
  switch (action.type) {
    case Types.CURRENCY_ID:
      return action.payload;
      break;
    default: {
      return state;
    }
  }
}
