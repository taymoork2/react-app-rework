import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router';
import { createAsyncComponent } from 'react-async-component';
import { Layout } from './Containers';

export default class Routes extends React.Component {
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
    const history = this.props.history;

    return (
      <Router history={history}>
        <Layout>
          <Switch>
            {routes.map(route => <Match key={Math.random()} {...route} />)}
            <Route path="*" component={() => <Redirect to="/" />} />
          </Switch>
        </Layout>
      </Router>
    );
  }
}

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
