import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUser } from '../actions/userActions';

import Landing from '../pages/landing';
import Dashboard from '../pages/dashboard';
import SurveyNew from '../pages/surveys/survey-new';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <div className="container">
            <Route exact path="/" component={Landing} />
            <Route exact path="/surveys" component={Dashboard} />
            <Route path="/surveys/new" component={SurveyNew} />
            <Route path="/survey/edit/:surveyId" component={SurveyNew} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(
  null,
  { fetchUser }
)(App);
