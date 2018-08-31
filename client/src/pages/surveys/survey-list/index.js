import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSurveys } from '../../../actions';
import { Button, Card, Grid } from 'semantic-ui-react';

class SurveyList extends Component {
  componentDidMount() {
    this.props.fetchSurveys();
  }
  renderSurveys = () => {
    return this.props.surveys
      .reverse()
      .map(({ _id, title, body, dateSent, yes, no }) => {
        return (
          <Grid.Row key={_id}>
            <Grid.Column width={16}>
              <Card href="#card-example-link-card" fluid={true}>
                <Card.Content>
                  <Card.Header>{title}</Card.Header>
                  <Card.Meta>
                    Send On: {new Date(dateSent).toLocaleDateString()}
                  </Card.Meta>
                  <Card.Description>{body}</Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <div className="ui two buttons">
                    <Button basic color="green">
                      YES: {yes}
                    </Button>
                    <Button basic color="red">
                      NO: {no}
                    </Button>
                  </div>
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid.Row>
        );
      });
  };

  render() {
    return (
      <Grid container stackable verticalAlign="middle">
        {this.renderSurveys()}
      </Grid>
    );
  }
}

const mapStateToProps = ({ surveys }) => ({
  surveys
});

export default connect(
  mapStateToProps,
  { fetchSurveys }
)(SurveyList);