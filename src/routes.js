import React, { Component, PropTypes } from 'react';
import { BrowserRouter, HashRouter, Match, Miss, Redirect } from 'react-router'; // eslint-disable-line no-unused-vars
import { RoutesProvider, MatchWithRoutes } from 'react-router-addons-routes';
import Helmet from 'react-helmet';
import { createAsyncComponent } from 'react-async-component';
import { Layout } from './Containers';

class Routes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      routes: [
        {
          title: 'App',
          pattern: `${process.env.PUBLIC_URL}/`,
          exactly: true,
          component: createAsyncComponent({
            resolve: () => import('./Components/App'),
            defer: true, // browser-only
          }),
        },
        {
          title: 'Counter',
          pattern: `${process.env.PUBLIC_URL}/counter`,
          component: createAsyncComponent({
            resolve: () => import('./Components/Counter'),
            defer: true, // browser-only
          }),
        },
      ],
    };
  }

  render() {
    const routes = this.state.routes;

    return (
      <BrowserRouter>
        <RoutesProvider routes={routes}>
          <Layout>
            {routes.map(route => <Route key={Math.random()} route={route} />)}
            <Miss component={() => <Redirect to="/" />} />
          </Layout>
        </RoutesProvider>
      </BrowserRouter>
    );
  }
}

const Route = ({ route }) => (
  <span>
    <Match {...route} render={() => <Helmet title={route.title} />} />
    <MatchWithRoutes {...route} />
  </span>
);

// Typechecking (Proptypes) is required for all Comoponents that have props
// It is disabled on this file because object is the correct type
// ESlint format says otherwise (but even they say it's not a hard rule to follow)
Route.propTypes = {
  route: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default Routes;
