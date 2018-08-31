import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Container, Menu, Image } from 'semantic-ui-react';
import Payments from '../.././Payments';
import '../stylesheets/index.scss';

class PageHeaderDesktop extends Component {
  renderContent = () => {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <React.Fragment>
            <Button as="a" inverted={!this.props.fixed} href="/auth/google">
              Log in
            </Button>
            <Button
              as="a"
              inverted={!this.props.fixed}
              primary={this.props.fixed}
              style={{ marginLeft: '0.5em' }}
            >
              Sign Up
            </Button>
          </React.Fragment>
        );
      default:
        return (
          <React.Fragment>
            <Button as="a" inverted={!this.props.fixed} color="green">
              <Payments />
            </Button>
            <div style={{ margin: '0 10px' }}>
              Credits: {this.props.auth.credits}
            </div>
            <Button
              as="a"
              href="/api/logout"
              inverted={!this.props.fixed}
              primary={this.props.fixed}
              style={{ marginLeft: '0.5em' }}
            >
              Logout
            </Button>
          </React.Fragment>
        );
    }
  };

  render() {
    const { fixed } = this.props;
    return (
      <Menu
        fixed={fixed ? 'top' : null}
        inverted={!fixed}
        pointing={!fixed}
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
          <Menu.Item position="right">{this.renderContent()}</Menu.Item>
        </Container>
      </Menu>
    );
  }
}

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps)(PageHeaderDesktop);
