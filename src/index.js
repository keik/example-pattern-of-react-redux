// @flow

import "babel-polyfill";
import * as React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { HashRouter, Link, Route } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import reduxLogger from "redux-logger";

import App from "./components/App";
import User from "./components/User";
import Users from "./components/Users";
import rootReducer from "./modules";

const store = createStore(rootReducer, applyMiddleware(...[reduxLogger]));

const routes = (
  <Provider store={store}>
    <HashRouter>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav>
        <hr />
        <Route exact path="/" component={App} />
        <Route exact path="/users" component={Users} />
        <Route path="/users/:userId" component={User} />
      </div>
    </HashRouter>
  </Provider>
);

ReactDOM.render(routes, (document.querySelector("#app"): any));
