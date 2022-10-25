import Types from "../../types";

export default function categoriesReducer(state = [], action) {
  switch (action.type) {
    case Types.CATEGORIES:
      return action.payload;
      break;
    default: {
      return state;
    }
  }
}
