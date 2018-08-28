import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSurveys } from '../../actions';

class SurveyList extends Component {
  componentDidMount() {
    this.props.fetchSurveys();
  }
  renderSurveys = () => {
    return this.props.surveys.map(({ _id, title, body, dateSent, yes, no }) => {
      return (
        <div className="row" key={_id}>
          <div className="col s12">
            <div className="card blue-grey darken-1">
              <div className="card-content white-text">
                <span className="card-title">{title}</span>
                <p>{body}</p>
                <p className="right">
                  Sent on: {new Date(dateSent).toLocaleDateString()}
                </p>
              </div>
              <div className="card-action">
                <a href="#">yes: {yes}</a>
                <a href="#">No: {no}</a>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  render() {
    return <div>{this.renderSurveys()}</div>;
  }
}

const mapStateToProps = ({ surveys }) => ({
  surveys
});

export default connect(
  mapStateToProps,
  { fetchSurveys }
)(SurveyList);
