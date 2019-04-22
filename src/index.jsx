import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import store from './store';
import { CONSOLE_LOG } from './actions/types';
import './styles/App.css';
import './helpers/global';

const consoleProxy = console.log;

console.log = msg => {
  store.dispatch({ type: CONSOLE_LOG, payload: msg });
  consoleProxy(msg);
};

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
