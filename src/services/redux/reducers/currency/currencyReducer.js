import Types from "../../types";

export default function currencyReducer(state = [], action) {
  switch (action.type) {
    case Types.CURRENCY:
      return action.payload;
      break;
    default: {
      return state;
    }
  }
}
