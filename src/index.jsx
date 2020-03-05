/* eslint-disable no-console */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import store from './store';
import { commonTypes } from './store/types';
import './styles/App.css';
import './helpers/global';

const consoleProxy = console.log;

console.log = msg => {
  store.dispatch({ type: commonTypes.CONSOLE_LOG, payload: msg });
  consoleProxy(msg);
};

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
