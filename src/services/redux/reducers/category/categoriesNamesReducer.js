import Types from "../../types";

export default function categoriesNamesReducer(state = [], action) {
  switch (action.type) {
    case Types.CATEGORIES_NAMES:
      return action.payload;
      break;
    default: {
      return state;
    }
  }
}
