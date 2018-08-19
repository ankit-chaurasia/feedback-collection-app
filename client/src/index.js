import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import App from './components/App';

const store = createStore(() => [], {}, applyMiddleware());

const provider = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(provider, document.getElementById('root'));
registerServiceWorker();
