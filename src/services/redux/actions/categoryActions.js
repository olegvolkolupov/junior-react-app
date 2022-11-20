import Types from "../types";

export let setCategoriesNames = (names) => {
  return {
    type: Types.CATEGORIES_NAMES,
    payload: names,
  };
};

export let setProductsForCurrentCategory = (products) => {
  return {
    type: Types.PRODUCTS_FOR_CURRENT_CATEGORY,
    payload: products,
  };
};

export let setSelectedCategoryName = (catiegoryName) => {
  return {
    type: Types.SELECTED_CATEGORY_NAME,
    payload: catiegoryName,
  };
};
