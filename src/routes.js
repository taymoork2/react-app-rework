/* eslint-disable react/no-array-index-key */
import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router/immutable';
import { createAsyncComponent } from 'react-async-component';
import { Layout } from './Containers';

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
      resolve: () => import('./Containers/Counter'),
    }),
  },
  {
    navBarTitle: 'Dashboard Example',
    path: `${process.env.PUBLIC_URL}/dashboard/:id?`,
    component: createAsyncComponent({
      resolve: () => import('./Containers/Dashboard'),
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

const Routes = ({ history }) => (
  <Router history={history}>
    <Layout>
      <Switch>
        {routes.map((route, i) => <Match key={i} {...route} />)}
        <Route path="*" component={() => <Redirect to="/" />} />
      </Switch>
    </Layout>
  </Router>
);

Routes.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default Routes;
