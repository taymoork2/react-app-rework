import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { connectRouter } from 'connected-react-router/immutable';
import { Provider } from 'react-redux';
import Routes from './routes';
import store, { reducer } from './store';
import './index.css';

const renderAsync = () => {
  render(
    <AppContainer>
      <Provider store={store}>
        <Routes />
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  );
};

if (module.hot) {
  module.hot.accept('./index.js');
  module.hot.accept('./routes', () => {
    renderAsync();
  });
  module.hot.accept('./Reducers', () => {
    store.replaceReducer(connectRouter(history)(reducer));
  });
}

renderAsync();
