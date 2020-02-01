import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";

import App from "./components/App";
import ComponentType from './ComponentType';
import Login from "./components/auth/login/Login";
import Register from "./components/auth/register/Register";
import Spinner from "./components/ui/spinner/Spinner";

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

//importing action setupUser
import { setUser, clearUser } from "./store/actions/setUser";

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
  // Root will be in the connect()()
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.setUser(user);
        this.props.history.push("/");
      } else {
        this.props.history.push('/login');
        this.props.clearUser();
      }
    });
  }
  render() {
    return this.props.isLoading ? <Spinner /> : (
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Switch>
    );
  }
}
const mapStateToProps = (state:{user:{isLoading:boolean}}) => ({
  isLoading: state.user.isLoading
});

const RootWithAuth = withRouter(
  connect(
    mapStateToProps,
    { setUser, clearUser }
  )(Root)
);

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
export default Root;
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
