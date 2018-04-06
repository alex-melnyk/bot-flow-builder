import {applyMiddleware} from "redux";
import ReduxLogger from 'redux-logger';
import ReduxThunk from 'redux-thunk';

let middleware = [ReduxThunk];

if (process.NODE_ENV !== 'production') {
    middleware = [...middleware, ReduxLogger];
}

export default applyMiddleware(...middleware);