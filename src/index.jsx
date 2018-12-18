import React  from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import _ from 'lodash';

import registerServiceWorker from './registerServiceWorker';

import App from './components/App';
import reducers from './reducers';

_.extend(window, { _, Redux: { createStore, combineReducers } });


ReactDOM.render(
    <Provider store={createStore(reducers)}>
        <App />
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
