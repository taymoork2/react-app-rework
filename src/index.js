import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { withAsyncComponents } from 'react-async-component';
import { connectRouter } from 'connected-react-router';
import { ReduxProvider as Provider } from './Containers';
import { store, history, reducer } from './Stores';
import './index.css';

if (module.hot) {
  module.hot.accept('./index.js');
  module.hot.accept('./routes', () => {
    withAsyncComponents((
      <AppContainer key={Math.random()}>
        <Provider store={store} history={history} />
      </AppContainer>
    )).then(({ appWithAsyncComponents }) =>
      render(appWithAsyncComponents, document.getElementById('root')),
    );
  });
  module.hot.accept('./Reducers', () => {
    store.replaceReducer(connectRouter(history)(reducer));
  });
}

withAsyncComponents((
  <AppContainer key={Math.random()}>
    <Provider store={store} history={history} />
  </AppContainer>
)).then(({ appWithAsyncComponents }) =>
  render(appWithAsyncComponents, document.getElementById('root')),
);

/*
ReactDOM.render((
  <AppContainer key={Math.random()}>
    <Provider store={store} history={history} />
  </AppContainer>
), document.getElementById('root'));

if (module.hot) {
  module.hot.accept('./Containers/ReduxProvider', () => {
    ReactDOM.render((
      <AppContainer key={Math.random()}>
        <Provider store={store} history={history} />
      </AppContainer>
    ), document.getElementById('root'));
  });
}
*/
