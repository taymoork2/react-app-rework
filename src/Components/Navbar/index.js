import React from 'react';
import { NavLink } from 'react-router-dom';
import './assets/Navbar.css';

const Navbar = () => (
  <nav>
    <ul>
      <li><NavLink to={`${process.env.PUBLIC_URL}/`} activeStyle={{ textDecoration: 'underline' }}><b>Get Started</b></NavLink></li>
      <li><NavLink to={`${process.env.PUBLIC_URL}/counter`} activeStyle={{ textDecoration: 'underline' }}><b>Counter Example</b></NavLink></li>
    </ul>
  </nav>
);

export default Navbar;
