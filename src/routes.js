/* eslint-disable react/no-array-index-key */
import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router/immutable';
import Loadable from 'react-loadable';
import Loading from 'react-loading';
import { Layout } from './Containers';

export const routes = [
  {
    title: 'App',
    navBarTitle: 'Get Started',
    path: `${process.env.PUBLIC_URL}/`,
    exact: true,
    component: Loadable({
      loader: () => import('./Components/App'),
      LoadingComponent: () => <Loading type="balls" color="#61dafb" />,
    }),
  },
  {
    title: 'Counter',
    navBarTitle: 'Counter Example',
    path: `${process.env.PUBLIC_URL}/counter`,
    component: Loadable({
      loader: () => import('./Containers/Counter'),
      LoadingComponent: () => <Loading type="balls" color="#61dafb" />,
    }),
  },
  /* {
    navBarTitle: 'Dashboard Example',
    path: `${process.env.PUBLIC_URL}/dashboard/:id?`,
    component: Loadable({
      loader: () => import('./Containers/Dashboard'),
      LoadingComponent: () => <Loading type="balls" color="#61dafb" />,
    }),
  },*/
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
