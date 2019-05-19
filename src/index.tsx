import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";

import App, { ComponentType } from "./components/App";
import Login from "./components/auth/login/Login";
import Register from "./components/auth/register/Register";

import "semantic-ui-react";
import { Provider, connect } from "react-redux";
import thunk from "redux-thunk";
import { applyMiddleware, compose, createStore } from "redux";

import rootReducer from "./store/reducers";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter
} from "react-router-dom";

import {setUser} from './store/actions/setUser';

import firebase from "./firebase";

export const composeEnhancers =
  (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

// ENZYME COURSE MIDDLEWARES EDIT to export to testUtil.tsx
export const middlewares = [thunk];

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

class Root extends ComponentType {
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.setUser(user);
        this.props.history.push("/");
      }
    });
  }
  render() {
    return (
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Switch>
    );
  }
}
const RootWithAuth = withRouter(connect(null,{setUser})(Root));

if (document.getElementById("root")) {
  ReactDOM.render(
    <Provider store={store}>
      <Router>
        <RootWithAuth />
      </Router>
    </Provider>,
    document.getElementById("root")
  );
}
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
