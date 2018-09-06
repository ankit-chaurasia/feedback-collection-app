import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Label, Container, Menu, Image } from 'semantic-ui-react';
import Payments from '../../payments';
import LoginModal from './login-modal';
import SignUpModal from './sign-up-modal';
import '../stylesheets/index.css';

class PageHeaderDesktop extends Component {
  state = {
    showLoginModal: false,
    showSignUpModal: false
  };
  renderContent = () => {
    switch (this.props.auth._id) {
      case null:
        return;
      case undefined:
        return (
          <React.Fragment>
            <Menu.Item
              link
              icon="sign-in"
              name="Log in"
              onClick={this.openLoginModal}
            />
            <Menu.Item
              link
              icon="signup"
              name="Sign Up"
              onClick={this.openSignUpModal}
            />
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
            />
            <Menu.Item link as={Link} to="/surveys/" name="My Surveys" />
            <Menu.Item>
              Credits: <Label color="teal">{this.props.auth.credits}</Label>
            </Menu.Item>
            <Menu.Item link>
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

  closeLoginModal = () => {
    this.setState(() => ({
      showLoginModal: false
    }));
  };

  openLoginModal = () => {
    this.setState(() => ({
      showLoginModal: true,
      showSignUpModal: false
    }));
  };

  renderLoginModal = () => {
    return (
      <LoginModal
        openSignUpModal={this.openSignUpModal}
        showLoginModal={this.state.showLoginModal}
        closeLoginModal={this.closeLoginModal}
      />
    );
  };

  closeSignUpModal = () => {
    this.setState(() => ({
      showSignUpModal: false
    }));
  };

  openSignUpModal = () => {
    this.setState(() => ({
      showSignUpModal: true,
      showLoginModal: false
    }));
  };

  renderSignUpModal = () => {
    return (
      <SignUpModal
        openLoginModal={this.openLoginModal}
        showSignUpModal={this.state.showSignUpModal}
        closeSignUpModal={this.closeSignUpModal}
      />
    );
  };

  render() {
    const { fixed } = this.props;
    return (
      <Menu
        fixed={fixed ? 'top' : null}
        inverted={!fixed}
        secondary={!fixed}
        size="large"
      >
        <Container>
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
          <Menu.Menu position="right">{this.renderContent()}</Menu.Menu>
        </Container>
        {this.renderLoginModal()}
        {this.renderSignUpModal()}
      </Menu>
    );
  }
}

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps)(PageHeaderDesktop);
