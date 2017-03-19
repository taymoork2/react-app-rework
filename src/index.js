import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Routes from './routes';
import './index.css';

const renderAsync = () => {
  render(
    <AppContainer>
      <Routes />
    </AppContainer>,
    document.getElementById('root'),
  );
};

if (module.hot) {
  module.hot.accept('./index.js');
  module.hot.accept('./routes', () => {
    renderAsync();
  });
}

renderAsync();
