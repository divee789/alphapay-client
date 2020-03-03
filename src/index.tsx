import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
//Store
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
//Persistence
import { PersistGate } from 'redux-persist/lib/integration/react';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';


//TODO
//remove react bootstrap from npm packages

//Asynchronous
import thunk from 'redux-thunk';

import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import logger from 'redux-logger'
//Reducers
import authReducer from './store/reducers/auth'
import courseReducer from './store/reducers/course'




const rootReducer = combineReducers({
    auth: authReducer,
    course: courseReducer
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
//Configuring ReduxDevTools
// if (process.env.NODE_ENV === 'development') {
composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const pReducer = persistReducer(persistConfig, rootReducer);
// }
const store = createStore(pReducer, composeEnhancers(
    applyMiddleware(thunk, logger))
)
const persistor = persistStore(store);




const app = (
    <Provider store={store}>
        <PersistGate loading={<h1>Hi There</h1>} persistor={persistor}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </PersistGate>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();