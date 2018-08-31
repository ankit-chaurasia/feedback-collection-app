import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSurveys } from '../../../actions';
import { Card, Grid, Button, Icon } from 'semantic-ui-react';

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
              <Card fluid={true}>
                <Card.Content>
                  <Card.Header>{title}</Card.Header>
                  <Card.Meta>
                    Send On: {new Date(dateSent).toLocaleDateString()}
                  </Card.Meta>
                  <Card.Description>{body}</Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <Icon name="thumbs up outline" color="green" />
                  YES: {yes} | <Icon name="thumbs down outline" color="red" />
                  NO: {no}
                  <Button
                    animated="fade"
                    color="red"
                    floated="right"
                    size="mini"
                  >
                    <Button.Content visible>Delete</Button.Content>
                    <Button.Content hidden>
                      <Icon name="remove circle" />
                    </Button.Content>
                  </Button>
                  <Button
                    animated="fade"
                    color="blue"
                    floated="right"
                    size="mini"
                  >
                    <Button.Content visible>Edit</Button.Content>
                    <Button.Content hidden>
                      <Icon name="edit" />
                    </Button.Content>
                  </Button>
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
