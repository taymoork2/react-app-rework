import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { connectRouter } from 'connected-react-router/immutable';
import { Provider } from 'react-redux';
import Routes from './routes';
import store, { history, reducer } from './store';
import './index.css';

const renderAsync = App => {
  render(
    <AppContainer>
      <Provider store={store}>
        <App history={history} />
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  );
};

if (module.hot) {
  module.hot.accept('./index.js');
  module.hot.accept('./routes', () => {
    renderAsync(Routes);
  });
  module.hot.accept('./Reducers', () => {
    store.replaceReducer(connectRouter(history)(reducer));
  });
}

renderAsync(Routes);
