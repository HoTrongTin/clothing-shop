import { createStore, applyMiddleware} from 'redux';

// to use asynchronous code in redux
import thunk from 'redux-thunk'

// connect redux with localStorage
import { persistStore } from 'redux-persist'

// dùng để debug redux
import logger from 'redux-logger';

import rootReducer from './root-reducer';

const middlewares = [thunk];

if(process.env.NODE_ENV === 'development'){
    middlewares.push(logger)
}

// create store với rootReducer và middleware dùng để logging các thao tác với redux
export const store = createStore(rootReducer, applyMiddleware(...middlewares));

// create redux store in localStorage
export const persistor = persistStore(store);

export default { store, persistor };