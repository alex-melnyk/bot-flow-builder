import {createStore} from "redux";

import Middleware from './middleware';
import Reducers from './reducers';

export default createStore(Reducers, undefined, Middleware);