import React from 'react';
import Helmet from 'react-helmet';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { createAsyncComponent } from 'react-async-component';
import { createBrowserHistory } from 'history';
import { Layout } from './Containers';
// import { App, Counter } from './Components';

const history = createBrowserHistory();

const routes = [
  {
    title: 'App',
    path: `${process.env.PUBLIC_URL}/`,
    exact: true,
    component: createAsyncComponent({
      resolve: () => import('./Components/App'),
    }),
  },
  {
    title: 'Counter',
    path: `${process.env.PUBLIC_URL}/counter`,
    component: createAsyncComponent({
      resolve: () => import('./Components/Counter'),
    }),
  },
];

const Routes = () => (
  <Router history={history}>
    <Layout>
      <Switch>
        {routes.map(route => <RouteWithSubRoutes key={Math.random()} {...route} />)}
        <Route path="*" component={() => <Redirect to="/" />} />
      </Switch>
    </Layout>
  </Router>
);

const RouteWithSubRoutes = route => (
  <div>
    <Helmet title={route.title} />
    <Route
      path={route.path}
      exact={route.exact}
      render={props => (
        <route.component {...props} routes={route.routes}>
          <Helmet title={route.title} />
        </route.component>
      )}
    />
  </div>
);

export default Routes;
