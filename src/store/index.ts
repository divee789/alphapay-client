import { createStore, compose, applyMiddleware, combineReducers } from 'redux';

//Middlewares
import thunk from 'redux-thunk';
import logger from 'redux-logger';

//Reducers
import authReducer from './reducers/auth';
import walletReducer from './reducers/wallet';
import transactionReducer from './reducers/transaction';
import paymentRequestReducer from './reducers/paymentRequest';
import uiReducer from './reducers/ui';

export const rootReducer = combineReducers({
  auth: authReducer,
  wallet: walletReducer,
  transaction: transactionReducer,
  paymentRequest: paymentRequestReducer,
  ui: uiReducer,
});

const middlewares = [thunk];

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
  middlewares.push(logger as any);
  options = composeEnhancers(applyMiddleware(...middlewares));
} else {
  options = applyMiddleware(...middlewares);
}

const store = createStore(rootReducer, options);

export default store;
