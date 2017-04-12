import React from 'react';
import PropTypes from 'prop-types';
import { UserList, UserDetails } from '../../Components';

const Dashboard = ({ match }) => (
  <div className="dashboard">
    <UserList />
    <UserDetails id={match.params.id} />
  </div>
);

Dashboard.propTypes = {
  match: PropTypes.object, // eslint-disable-line
};

export default Dashboard;
