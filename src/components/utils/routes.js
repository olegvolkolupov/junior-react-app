import Shop from "../views/Shop";
import ProductDetail from "../views/ProductDetail";
import Cart from "../views/Cart";

import { SHOP_ROUTE, PRODUCT_ROUTE, CART_ROUTE } from "./routeConsts";

export const routes = [
  {
    path: SHOP_ROUTE,
    Component: Shop,
  },
  {
    path: PRODUCT_ROUTE + "/:id",
    Component: ProductDetail,
  },
  {
    path: CART_ROUTE,
    Component: Cart,
  },
];
