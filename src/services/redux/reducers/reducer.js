import { combineReducers } from "redux";

import currencyReducer from './currency/currencyReducer';
import currencyIdReducer from './currency/currencyIdReducer';
import currencySymbolReducer from './currency/currencySymbolReducer';
import categoriesReducer from './category/categoriesReducer';
import selectedCategoryReducer from './category/selectedCategoryReducer';
import cartReducer from './cart/cartReducer';
import cartItemsQuantityReducer from './cart/cartItemsQuantityReducer';

export default combineReducers({
  currency: currencyReducer,
  currencyId: currencyIdReducer,
  currencySymbol: currencySymbolReducer,
  categories: categoriesReducer,
  selectedCategory: selectedCategoryReducer,
  cart: cartReducer,
  cartQuantity: cartItemsQuantityReducer,
});
