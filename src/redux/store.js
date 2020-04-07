import { createStore, applyMiddleware} from 'redux';

// dùng để debug redux
import logger from 'redux-logger';

import rootReducer from './root-reducer';

const middlewares = [logger];

// create store với rootReducer và middleware dùng để logging các thao tác với redux
const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;