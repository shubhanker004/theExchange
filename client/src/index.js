import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import ReduxStore from './store';
import Routes from './routes';


ReactDOM.render(
    <React.StrictMode>
      <Provider store={ReduxStore()}>
        <Routes />
      </Provider>
    </React.StrictMode>,
  document.getElementById('root')
);

