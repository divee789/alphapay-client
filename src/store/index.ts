import { createStore, compose, applyMiddleware, combineReducers } from 'redux';

//Middlewares
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import requestMiddleware from './middlewares/request';

//Reducers
import authReducer from './reducers/auth';
import walletReducer from './reducers/wallet';
import transactionReducer from './reducers/transaction';
import uiReducer from './reducers/ui';

const rootReducer = combineReducers({
  auth: authReducer,
  wallet: walletReducer,
  transaction: transactionReducer,
  ui: uiReducer,
});

const middlewares = [thunk, requestMiddleware()];

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

let composeEnhancers;
let options;
//Configuring ReduxDevTools
if (process.env.REACT_APP_NODE_ENV === 'development') {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  middlewares.push(logger);
  options = composeEnhancers(applyMiddleware(...middlewares));
} else {
  options = applyMiddleware(...middlewares);
}

const store = createStore(rootReducer, options);

export default store;
