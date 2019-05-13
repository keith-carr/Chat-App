import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import App from './components/App';
import Login from './components/auth/login/Login';
import Register from './components/auth/register/Register';

import 'semantic-ui-react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { applyMiddleware, compose, createStore } from 'redux';

import rootReducer from './store/reducers';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

export const composeEnhancers =
  (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

// ENZYME COURSE MIDDLEWARES EDIT to export to testUtil.tsx
export const middlewares = [thunk];

const store = createStore(rootReducer, composeEnhancers(
     applyMiddleware(thunk)
));

const Root = () =>
    <Router>
        <Switch>
            <Route exact path='/' component={App} />
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
        </Switch>
    </Router>


if( document.getElementById('root') ) {
    ReactDOM.render(  <Provider store={store}><Root /></Provider>, document.getElementById('root'));
    }
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
