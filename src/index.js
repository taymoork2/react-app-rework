import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { withAsyncComponents } from 'react-async-component';
import { connectRouter } from 'connected-react-router';
import { ReduxProvider as Provider } from './Containers';
import Routes from './routes';
import { store, history, reducer } from './Stores';
import './index.css';

const renderAsync = (Route) => {
  withAsyncComponents((
    <AppContainer>
      <Provider store={store}>
        <Route history={history} />
      </Provider>
    </AppContainer>
  )).then(({ appWithAsyncComponents }) =>
    render(appWithAsyncComponents, document.getElementById('root')),
  );
};

renderAsync(Routes);

if (module.hot) {
  module.hot.accept('./index.js');
  module.hot.accept('./routes', () => {
    renderAsync(Routes);
  });
  module.hot.accept('./Reducers', () => {
    store.replaceReducer(connectRouter(history)(reducer));
  });
}
