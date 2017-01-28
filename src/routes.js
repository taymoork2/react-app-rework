/* eslint-disable react/no-multi-comp */

import React, { PropTypes } from 'react';
import { BrowserRouter, HashRouter, Match, Miss, Redirect } from 'react-router'; // eslint-disable-line no-unused-vars
import { RoutesProvider, MatchWithRoutes } from 'react-router-addons-routes';
import Helmet from 'react-helmet';
import { createAsyncComponent } from 'react-async-component';
import { Layout } from './Containers';
// import { App, Counter } from './Components';

/* function asyncComponent(getComponent) {
  return class AsyncComponent extends React.Component {
    static Component = null;
    state = { Component: AsyncComponent.Component };

    componentWillMount() {
      if (!this.state.Component) {
        getComponent().then((Component) => {
          AsyncComponent.Component = Component;
          this.setState({ Component });
        });
      }
    }

    render() {
      const { Component } = this.state;

      if (Component) {
        return <Component {...this.props} />;
      }
      return null;
    }
  };
}*/

class Routes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      routes: [
        {
          title: 'App',
          pattern: `${process.env.PUBLIC_URL}/`,
          exactly: true,
          /* component: App,*/
          /* component: asyncComponent(() => {
            import('./Components/App').then(module => module.default)
          }), */
          component: createAsyncComponent({
            resolve: () => import('./Components/App'),
          }),
        },
        {
          title: 'Counter',
          pattern: `${process.env.PUBLIC_URL}/counter`,
          /* component: Counter,*/
          /* component: asyncComponent(() => {
            import('./Components/Counter').then(module => module.default)
          }), */
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
