import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import { Navbar } from '../../Components';
import logo from './assets/logo.svg';
import './assets/Layout.css';

// This is an example of a stateless function [Redux]
// All it does is take in props and displays them (no manipulation of data)
const Layout = ({ children, routes }) => (
  <div className="App">
    <Helmet title="" titleTemplate="Redux App | %s" />
    <header>
      <img src={logo} className="logo" alt="logo" />
      <h1>Welcome to React+Redux</h1>
      <Navbar routes={routes} />
    </header>
    <div className="main">
      {children}
    </div>
  </div>
);

Layout.propTypes = {
  children: PropTypes.element.isRequired,
  routes: PropTypes.arrayOf(PropTypes.shape), // eslint-disable-line react/require-default-props
};

export default Layout;
