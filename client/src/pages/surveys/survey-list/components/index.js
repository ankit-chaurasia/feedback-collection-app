import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, Grid, Button, Icon, Message } from 'semantic-ui-react';
import CustomModal from '../../../../components/custom-modal';
import modalStyles from '../../../../components/custom-modal/styles';
import colorsEnum from '../../../../helpers/colorsEnums';
import Payments from '../../../../components/payments';

export default class SurveyList extends Component {
  componentDidMount() {
    this.props.fetchSurveys();
  }

  deleteSurvey = () => {
    const { deleteSurvey, currSurveyId } = this.props;
    deleteSurvey(currSurveyId);
  };

  renderSurveys = () => {
    if (this.props.surveyList.length) {
      return this.props.surveyList
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
                    <Icon name="thumbs up outline" color="green" />: {yes} |
                    <Icon name="thumbs down outline" color="red" />: {no}
                    <Button
                      animated="fade"
                      color="red"
                      floated="right"
                      size="mini"
                      onClick={() => this.props.openDeleteSurveyModal(_id)}
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
                      <Link
                        to={`/survey/edit/${_id}`}
                        style={{ color: '#fff' }}
                      >
                        <Button.Content visible>Edit</Button.Content>
                        <Button.Content hidden>
                          <Icon name="edit" />
                        </Button.Content>
                      </Link>
                    </Button>
                  </Card.Content>
                </Card>
              </Grid.Column>
            </Grid.Row>
          );
        });
    } else {
      return (
        <Message size="massive" compact>
          <Message.Content>
            <Message.Header>
              <Icon name="inbox" />
              Want to create a survey? Just in two steps
            </Message.Header>
            <Message.List>
              <Message.Item>
                Add credits to your account. Click{' '}
                <a style={{ cursor: 'pointer' }}>
                  <Payments title="here" />
                </a>{' '}
                to add credits.
              </Message.Item>
              <Message.Item>
                Once you have enough credits, Click{' '}
                <Link to="/surveys/new">here</Link> to create a survey
              </Message.Item>
            </Message.List>
          </Message.Content>
        </Message>
      );
    }
  };

  render() {
    return (
      <Grid container stackable verticalAlign="middle">
        {this.renderSurveys()}
        <CustomModal
          title="Delete Survey"
          headerIcon="trash alternate"
          headerIconColor={colorsEnum.red}
          showModal={this.props.showSurveyDeleteModal}
          onCancel={this.props.closeDeleteSurveyModal}
          onClose={this.props.closeDeleteSurveyModal}
          onConfirm={this.deleteSurvey}
          isOnConfirmDisabled={this.props.deleteSurveyPending}
          isConfirmLoading={this.props.deleteSurveyPending}
          style={modalStyles.negative}
        >
          Are you sure?
        </CustomModal>
      </Grid>
    );
  }
}
