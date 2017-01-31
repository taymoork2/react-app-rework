import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { withAsyncComponents } from 'react-async-component';
import Routes from './routes';
import './index.css';

withAsyncComponents((
  <AppContainer>
    <Routes />
  </AppContainer>
)).then(({ appWithAsyncComponents }) =>
  render(appWithAsyncComponents, document.getElementById('root')),
);

if (module.hot) {
  module.hot.accept('./index.js');
  module.hot.accept('./routes', () => {
    withAsyncComponents((
      <AppContainer>
        <Routes />
      </AppContainer>
    )).then(({ appWithAsyncComponents }) =>
      render(appWithAsyncComponents, document.getElementById('root')),
    );
  });
}
