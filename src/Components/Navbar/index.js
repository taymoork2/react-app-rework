import React from 'react';
import { NavLink } from 'react-router-dom';
import { routes } from '../../routes';
import './assets/Navbar.css';

const Navbar = () => (
  <nav>
    <ul>
      {routes.filter(route => route.navBarTitle).map(route => <li><NavLink to={route.path} exact={route.exact} activeStyle={{ textDecoration: 'underline' }}><b>{route.navBarTitle}</b></NavLink></li>)}
    </ul>
  </nav>
);

export default Navbar;
