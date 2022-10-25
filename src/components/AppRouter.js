import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router";

import { routes } from "./utils/routes";
import { SHOP_ROUTE } from "./utils/routeConsts";

export default class AppRouter extends Component {
  render() {
    return (
      <Switch>
        {routes.map(({ path, Component }) => (
          <Route key={path} path={path} component={Component} exact />
        ))}
        <Redirect to={SHOP_ROUTE} />
      </Switch>
    );
  }
}
