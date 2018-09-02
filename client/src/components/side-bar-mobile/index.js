import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Button,
  Container,
  Icon,
  Menu,
  Segment,
  Sidebar,
  Image
} from 'semantic-ui-react';
import Payments from '../Payments';
import './stylesheets/index.css';

class SideBarMobile extends Component {
  state = {};

  handlePusherClick = () => {
    const { sidebarOpened } = this.state;
    if (sidebarOpened) this.setState({ sidebarOpened: false });
  };

  handleToggle = () =>
    this.setState({ sidebarOpened: !this.state.sidebarOpened });

  renderContent = () => {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <React.Fragment>
            <Menu.Item>
              <a href="/auth/google">Log in</a>
            </Menu.Item>
            <Menu.Item>
              <a>Sign Up</a>
            </Menu.Item>
          </React.Fragment>
        );
      default:
        return (
          <React.Fragment>
            <Menu.Item>
              <Link to="/surveys/new">Create New Survey</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/surveys">My Surveys</Link>
            </Menu.Item>
            <Menu.Item>
              <div style={{ margin: '0 10px' }}>
                Credits: {this.props.auth.credits}
              </div>
            </Menu.Item>
            <Menu.Item>
              <Button as="a" inverted={!this.props.fixed} color="green">
                <Payments />
              </Button>
            </Menu.Item>
            <Menu.Item>
              <a href="/api/logout">Logout</a>
            </Menu.Item>
          </React.Fragment>
        );
    }
  };

  render() {
    const { sidebarOpened } = this.state;
    return (
      <Sidebar.Pushable>
        <Sidebar
          as={Menu}
          animation="uncover"
          inverted
          vertical
          visible={sidebarOpened}
        >
          {this.renderContent()}
        </Sidebar>

        <Sidebar.Pusher
          dimmed={sidebarOpened}
          onClick={this.handlePusherClick}
          style={{ minHeight: '100vh' }}
        >
          <Segment
            inverted
            textAlign="center"
            vertical
            style={{ padding: '0' }}
          >
            <Container>
              <Menu inverted pointing secondary size="large">
                <Menu.Item
                  onClick={this.handleToggle}
                  className="hamburgerIcon"
                >
                  <Icon name="sidebar" />
                </Menu.Item>
                <Menu.Item header>
                  <Link to="/" className="siteLogo">
                    <Image
                      size="mini"
                      src={`${process.env.PUBLIC_URL}/favicon.ico`}
                      style={{ marginRight: '1.5em' }}
                    />
                    <div className="title">EMAILY</div>
                  </Link>
                </Menu.Item>
              </Menu>
            </Container>
          </Segment>
          <Container>
            <Segment style={{ padding: '5em 0em' }} vertical>
              {this.props.children}
            </Segment>
          </Container>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    );
  }
}

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps)(SideBarMobile);
