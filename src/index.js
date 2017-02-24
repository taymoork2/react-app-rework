import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { withAsyncComponents } from 'react-async-component';
import { connectRouter } from 'connected-react-router/immutable';
import { ReduxProvider as Provider } from './Containers';
import Routes from './routes';
import { store, history, reducer } from './Stores';
import './index.css';

const renderAsync = () => {
  withAsyncComponents((
    <AppContainer>
      <Provider store={store}>
        <Routes history={history} />
      </Provider>
    </AppContainer>
  )).then(({ appWithAsyncComponents }) =>
    render(appWithAsyncComponents, document.getElementById('root')),
  );
};

renderAsync();

if (module.hot) {
  module.hot.accept('./index.js');
  module.hot.accept('./routes', () => {
    renderAsync();
  });
  module.hot.accept('./Reducers', () => {
    store.replaceReducer(connectRouter(history)(reducer));
  });
}
