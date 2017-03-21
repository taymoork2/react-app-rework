/* eslint-disable react/no-array-index-key */
import React, { PropTypes } from 'react';
import { NavLink } from 'react-router-dom';
import './assets/Navbar.css';

const Navbar = ({ routes }) => (
  <nav>
    <ul>
      {routes.filter(route => route.navBarTitle).map((route, i) => <li key={i}><NavLink to={route.path.match(/^[^:]+/)[0]} exact={route.exact} activeStyle={{ textDecoration: 'underline' }}><b>{route.navBarTitle}</b></NavLink></li>)}
    </ul>
  </nav>
);

Navbar.propTypes = {
  routes: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default Navbar;
