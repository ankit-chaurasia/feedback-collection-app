import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Responsive, Segment, Visibility, Container } from 'semantic-ui-react';
import PageHeaderDesktop from '../page-header/components';

class DesktopContainer extends Component {
  state = {};
  static propTypes = {
    children: PropTypes.node
  };
  hideFixedMenu = () => this.setState({ fixed: false });
  showFixedMenu = () => this.setState({ fixed: true });

  render() {
    const { children } = this.props;
    const { fixed } = this.state;

    return (
      <Responsive minWidth={Responsive.onlyTablet.minWidth}>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            inverted
            textAlign="center"
            style={{ padding: '0' }}
            vertical
          >
            <PageHeaderDesktop fixed={fixed} />
          </Segment>
        </Visibility>
        <Container>
          <Segment style={{ padding: '5em 0em' }} vertical>
            {children}
          </Segment>
        </Container>
      </Responsive>
    );
  }
}

export default DesktopContainer;
