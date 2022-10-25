import { combineReducers } from "redux";

import categoriesReducer from './category/categoriesReducer';
import selectedCategoryReducer from './category/selectedCategoryReducer';
import currencyIdReducer from './currency/currencyIdReducer';
import currencySymbolReducer from './currency/currencySymbolReducer';
import cartReducer from './cart/cartReducer';
import cartItemsQuantityReducer from './cart/cartItemsQuantityReducer';

export default combineReducers({
  categories: categoriesReducer,
  selectedCategory: selectedCategoryReducer,
  currencyId: currencyIdReducer,
  currencySymbol: currencySymbolReducer,
  cart: cartReducer,
  cartQuantity: cartItemsQuantityReducer,
});
