/* eslint react/forbid-prop-types: 0, react/require-default-props: 0 */
import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';

const ReduxProvider = ({ store, children }) => (
  <Provider store={store}>
    { children }
  </Provider>
);

ReduxProvider.propTypes = {
  store: PropTypes.object.isRequired,
  children: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default ReduxProvider;
