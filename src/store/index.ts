import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
// import reducer from './reducer';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';


import thunk from 'redux-thunk';

import logger from 'redux-logger'



import authReducer from './reducers/auth'
import walletReducer from './reducers/wallet'
import transactionReducer from './reducers/transaction'



const rootReducer = combineReducers({
    auth: authReducer,
    wallet: walletReducer,
    transaction: transactionReducer
})

const persistConfig = {
    key: 'root',
    storage: storage,
    stateReconciler: autoMergeLevel2,
    blacklist: []// see "Merge Process" section for details.
};


declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

let composeEnhancers
let store
//Configuring ReduxDevTools
if (process.env.NODE_ENV === 'development') {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const pReducer = persistReducer(persistConfig, rootReducer);
    store = createStore(pReducer, composeEnhancers(
        applyMiddleware(thunk, logger))
    )
} else {
    const pReducer = persistReducer(persistConfig, rootReducer);
    store = createStore(pReducer, applyMiddleware(thunk))
}

persistStore(store)

export default store;