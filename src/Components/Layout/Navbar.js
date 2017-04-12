/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import './assets/Navbar.css';

const Navbar = ({ routes }) => (
  <nav>
    <ul>
      {routes.filter(route => route.navBarTitle).map((route, i) => (
        <li key={i}>
          <NavLink
            to={route.path.match(/^[^:]+/)[0]}
            exact={route.exact}
            activeStyle={{ borderBottom: '2px solid #fff' }}
          >
            <b>{route.navBarTitle}</b>
          </NavLink>
        </li>
      ))}
    </ul>
  </nav>
);

Navbar.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

export default Navbar;
