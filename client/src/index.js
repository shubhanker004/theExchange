import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { CookiesProvider } from 'react-cookie';

import ReduxStore from './store';
import Routes from './routes';


ReactDOM.render(
  <React.StrictMode>
    <CookiesProvider>
      <Provider store={ReduxStore()}>
        <Routes />
      </Provider>
    </CookiesProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

