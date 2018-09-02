import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Label,
  Container,
  Icon,
  Menu,
  Segment,
  Sidebar,
  Image
} from 'semantic-ui-react';
import Payments from '../payments';
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
            <Menu.Item
              link
              icon="sign-in"
              as="a"
              href="/auth/google"
              name="Log in"
            />
            <Menu.Item link icon="signup" as="a" name="Sign Up" />
          </React.Fragment>
        );
      default:
        return (
          <React.Fragment>
            <Menu.Item
              link
              as={Link}
              to="/surveys/new"
              name="Create New Survey"
              icon="plus circle"
            />
            <Menu.Item
              link
              as={Link}
              to="/surveys/"
              name="My Surveys"
              icon="list"
            />
            <Menu.Item>
              <Label color="teal">{this.props.auth.credits}</Label>
              Credits
            </Menu.Item>
            <Menu.Item link>
              <Icon name="payment" />
              <Payments />
            </Menu.Item>
            <Menu.Item
              link
              icon="sign-out"
              as="a"
              href="/api/logout"
              name="Logout"
            />
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
