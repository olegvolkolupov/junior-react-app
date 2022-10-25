import Types from "../types";

export let setCategories = (catiegories) => {
  return {
    type: Types.CATEGORIES,
    payload: catiegories,
  };
};

export let setSelectedCategory = (catiegory) => {
  return {
    type: Types.SELECTED_CATEGORY,
    payload: catiegory,
  };
};
