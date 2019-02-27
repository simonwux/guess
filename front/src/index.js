import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { BrowserRouter, Router, Route, Switch } from "react-router-dom";

import "assets/scss/guess-react.scss";

// pages for this product
import AllRoutes from "views/AllRoutes.jsx";

import * as serviceWorker from "./serviceWorker";

var hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <AllRoutes history={hist} />
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
