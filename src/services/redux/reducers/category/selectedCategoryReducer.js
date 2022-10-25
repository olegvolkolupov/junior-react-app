import Types from "../../types";

export default function selectedCategoryReducer(state = {}, action) {
  switch (action.type) {
    case Types.SELECTED_CATEGORY:
      return action.payload;
      break;
    default: {
      return state;
    }
  }
}
