/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router/immutable';
import Helmet from 'react-helmet';
import Loadable from 'react-loadable';
import Loading from 'react-loading';
import { Layout } from './Containers';
import { history } from './store';

const LoadingComponent = () => <Loading type="balls" color="#61dafb" />;

export const routes = [
  {
    title: 'App',
    navBarTitle: 'Get Started',
    path: `${process.env.PUBLIC_URL}/`,
    exact: true,
    component: Loadable({
      loader: () => import('./Components/App'),
      LoadingComponent,
    }),
  },
  {
    title: 'Counter',
    navBarTitle: 'Counter Example',
    path: `${process.env.PUBLIC_URL}/counter`,
    component: Loadable({
      loader: () => import('./Containers/Counter'),
      LoadingComponent,
    }),
  },
  {
    title: 'Todos',
    navBarTitle: 'Todos Example',
    path: `${process.env.PUBLIC_URL}/todo/:id?`,
    component: Loadable({
      loader: () => import('./Containers/Todos'),
      LoadingComponent,
    }),
  },
  {
    title: 'Dashboard',
    navBarTitle: 'Dashboard Example',
    path: `${process.env.PUBLIC_URL}/dashboard/:id?`,
    component: Loadable({
      loader: () => import('./Containers/Dashboard'),
      LoadingComponent,
    }),
  },
];

const Match = route => (
  <div>
    <Helmet title={route.title} />
    <Route
      path={route.path}
      exact={route.exact}
      strict={route.strict}
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
    <Layout routes={routes}>
      <Switch>
        {routes.map((route, i) => <Match key={i} {...route} />)}
        <Route path="*" component={() => <Redirect to="/" />} />
      </Switch>
    </Layout>
  </Router>
);

export default Routes;
