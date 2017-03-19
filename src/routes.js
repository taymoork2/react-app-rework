import React from 'react';
import Helmet from 'react-helmet';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Loadable from 'react-loadable';
import Loading from 'react-loading';
import { createBrowserHistory } from 'history';
import { Layout } from './Containers';

const history = createBrowserHistory();

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
      loader: () => import('./Components/Counter'),
      LoadingComponent: () => <Loading type="balls" color="#61dafb" />,
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
