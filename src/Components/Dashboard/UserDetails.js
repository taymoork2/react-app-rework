/* eslint-disable react/require-default-props */
import React, { PropTypes } from 'react';
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
