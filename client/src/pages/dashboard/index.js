import React from 'react';
import SurveyList from '../surveys/survey-list';
import { Container } from 'semantic-ui-react';
import ResponsiveContainer from '../../components/responsive-container';

const Dashboard = props => {
  return (
    <ResponsiveContainer>
      <Container>
        <SurveyList />
      </Container>
    </ResponsiveContainer>
  );
};

export default Dashboard;
