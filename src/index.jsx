import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import registerServiceWorker from './registerServiceWorker';
import App from './components/App';
import store from './store';

const consoleProxy = console.log;

console.log = msg => {
  document.getElementById('console').innerHTML = msg;
  consoleProxy(msg);
};

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
