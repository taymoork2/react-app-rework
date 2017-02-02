import React from 'react';
import Helmet from 'react-helmet';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { createAsyncComponent } from 'react-async-component';
import { createBrowserHistory } from 'history';
import { Layout } from './Containers';

const history = createBrowserHistory();

export const routes = [
  {
    title: 'App',
    navBarTitle: 'Get Started',
    path: `${process.env.PUBLIC_URL}/`,
    exact: true,
    component: createAsyncComponent({
      resolve: () => import('./Components/App'),
    }),
  },
  {
    title: 'Counter',
    navBarTitle: 'Counter Example',
    path: `${process.env.PUBLIC_URL}/counter`,
    component: createAsyncComponent({
      resolve: () => import('./Components/Counter'),
    }),
  },
];

const Match = route => (
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

const Routes = () => (
  <Router history={history}>
    <Layout>
      <Switch>
        {routes.map(route => <Match key={Math.random()} {...route} />)}
        <Route path="*" component={() => <Redirect to="/" />} />
      </Switch>
    </Layout>
  </Router>
);

export default Routes;
