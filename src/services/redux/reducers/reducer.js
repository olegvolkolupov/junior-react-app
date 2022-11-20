import { combineReducers } from "redux";

import currencyReducer from './currency/currencyReducer';
import currencyIdReducer from './currency/currencyIdReducer';
import currencySymbolReducer from './currency/currencySymbolReducer';
import categoriesNamesReducer from './category/categoriesNamesReducer';
import productsForCurrentCategoryReducer from './category/productsForCurrentCategoryReducer';
import selectedCategoryReducer from './category/selectedCategoryReducer';
import cartReducer from './cart/cartReducer';
import cartItemsQuantityReducer from './cart/cartItemsQuantityReducer';

export default combineReducers({
  currency: currencyReducer,
  currencyId: currencyIdReducer,
  currencySymbol: currencySymbolReducer,
  categoriesNames: categoriesNamesReducer,
  productsForCurrentCategory: productsForCurrentCategoryReducer,
  selectedCategory: selectedCategoryReducer,
  cart: cartReducer,
  cartQuantity: cartItemsQuantityReducer,
});
