import React from "react";
import * as ReactDOM from "react-dom/client";

import { Provider } from "react-redux";
import store from "./services/redux/store";

import { ApolloProvider } from "@apollo/client";
import { client } from "./services/http/client";

import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <App />
    </Provider>
  </ApolloProvider>
);
