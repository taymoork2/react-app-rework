import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { withAsyncComponents } from 'react-async-component';
import Routes from './routes';
import './index.css';

let app = (
  <AppContainer>
    <Routes />
  </AppContainer>
);

if (module.hot) {
  module.hot.accept('./index.js');
  module.hot.accept('./routes', () => {
    // If you use Webpack 2 in ES modules mode, you can
    // use <Routes /> here rather than require() a <HotRoutes />.
    const HotRoutes = require('./routes').default; // eslint-disable-line global-require
    app = (
      <AppContainer>
        <HotRoutes />
      </AppContainer>
    );
  });
}

withAsyncComponents(app).then(({ appWithAsyncComponents }) =>
  render(appWithAsyncComponents, document.getElementById('root')),
);

/*
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Routes from './routes';
import './index.css';

ReactDOM.render((
  <AppContainer>
    <Routes />
  </AppContainer>
), document.getElementById('root'));

if (module.hot) {
  module.hot.accept('./index.js');
  module.hot.accept('./routes', () => {
    // If you use Webpack 2 in ES modules mode, you can
    // use <Routes /> here rather than require() a <HotRoutes />.
    const HotRoutes = require('./routes').default; // eslint-disable-line global-require
    ReactDOM.render((
      <AppContainer>
        <HotRoutes />
      </AppContainer>
    ), document.getElementById('root'));
  });
}
*/
