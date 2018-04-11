import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";

import Store from './store';

import App from './components/App';
import registerServiceWorker from './registerServiceWorker';


const Root = () => (
    <Provider store={Store}>
        <App/>
    </Provider>
);

ReactDOM.render(<Root/>, document.getElementById('root'));
registerServiceWorker();