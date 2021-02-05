import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ModalProvider } from './context/Modal';
import './index.css';
import App from './App';

import configureStore from './store';
import * as sessionActions from './store/session';
import * as partyActions from './store/party';
import * as memberActions from './store/member';
import * as itemActions from './store/member';

const store = configureStore();

if (process.env.NODE_ENV !== "production") {

  window.csrfFetch = fetch;
  window.store = store;
  window.sessionActions = sessionActions;
  window.partyActions = partyActions;
  window.memberActions = memberActions;
  window.itemActions = itemActions;
}

function Root() {
  return (
    <ModalProvider>
      <Provider store={store}>
        <BrowserRouter>
          <App/>
        </BrowserRouter>
      </Provider>
    </ModalProvider>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Root id="root"/>
  </React.StrictMode>,
  document.getElementById('root')
);
