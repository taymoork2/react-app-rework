import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { withAsyncComponents } from 'react-async-component';
import Routes from './routes';
import './index.css';

const renderAsync = (Component) => {
  withAsyncComponents((
    <AppContainer>
      <Component />
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
}
