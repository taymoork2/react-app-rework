/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

const UserDetails = ({ id }) => (
  <div>
    <Helmet title={id} />
    <h1>{id}</h1>
  </div>
);

UserDetails.propTypes = {
  id: PropTypes.string,
};

export default UserDetails;
