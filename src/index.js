import React from 'react';
import {render} from 'react-dom';
import './styles/App.css'
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk        from 'redux-thunk';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { syncHistory, routeReducer }     from 'react-router-redux';
import reducer from './reducers/reducer_r'

const reduxRouterMiddleware = syncHistory(hashHistory)
const createStoreWithMiddleware = applyMiddleware(
    thunk,
    reduxRouterMiddleware
)(createStore)

const store = createStoreWithMiddleware(reducer)

render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <IndexRoute component={App} />
            <Route path="/user/:accessToken/:refreshToken" component={User} />
            <Route path="/error/:errorMsg" component={Error} />
        </Router>
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
