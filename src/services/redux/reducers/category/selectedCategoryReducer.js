import Types from "../../types";

export default function selectedCategoryReducer(state = {}, action) {
  switch (action.type) {
    case Types.SELECTED_CATEGORY_NAME:
      return action.payload;
      break;
    default: {
      return state;
    }
  }
}
