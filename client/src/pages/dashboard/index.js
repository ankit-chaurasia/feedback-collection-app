import React from 'react';
import { Link } from 'react-router-dom';
import SurveyList from './surveys/SurveyList';
import ResponsiveContainer from '../../components/responsive-container';

const Dashboard = props => {
  return (
    <ResponsiveContainer>
      <SurveyList />
      <div className="fixed-action-btn">
        <Link to="/surveys/new" className="btn-floating btn-large red">
          <i className="large material-icons">add</i>
        </Link>
      </div>
    </ResponsiveContainer>
  );
};

export default Dashboard;
