/* eslint-disable react/no-multi-comp */

import React, { PropTypes } from 'react';
import { Route, Miss, Redirect } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router';
import Helmet from 'react-helmet';
import { createAsyncComponent } from 'react-async-component';
import { Layout } from './Containers';
// import { App, Counter } from './Components';

class Routes extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  };

  constructor(props) {
    super(props);
    this.state = {
      routes: [
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
      ],
    };
  }

  render() {
    const routes = this.state.routes;

    return (
      <Router history={this.props.history}>
        <Layout>
          {routes.map(route => <RouteWithSubRoutes key={Math.random()} {...route} />)}
          <Miss component={() => <Redirect to="/" />} />
        </Layout>
      </Router>
    );
  }
}

const RouteWithSubRoutes = route => (
  <Route
    path={route.path}
    exact={route.exact ? 'exact' : ''}
    render={props => (
      <route.component {...props} routes={route.routes}>
        <Helmet title={route.title} />
      </route.component>
    )}
  />
);

// Typechecking (Proptypes) is required for all Comoponents that have props
// It is disabled on this file because object is the correct type
// ESlint format says otherwise (but even they say it's not a hard rule to follow)
Route.propTypes = {
  route: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default Routes;
