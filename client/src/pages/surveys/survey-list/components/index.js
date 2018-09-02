import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, Grid, Button, Icon } from 'semantic-ui-react';
import CustomModal from '../../../../components/custom-modal';
import modalStyles from '../../../../components/custom-modal/styles';
import colorsEnum from '../../../../helpers/colorsEnums';

export default class SurveyList extends Component {
  componentDidMount() {
    this.props.fetchSurveys();
  }

  deleteSurvey = () => {
    return null;
  };

  renderSurveys = () => {
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
                    onClick={this.props.openDeleteSurveyModal}
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
                    <Link to={`/survey/edit/${_id}`} style={{ color: '#fff' }}>
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
          isOnConfirmDisabled={false}
          isConfirmLoading={false}
          style={modalStyles.negative}
        >
          Are you sure?
        </CustomModal>
      </Grid>
    );
  }
}
