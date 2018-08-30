import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Responsive, Segment, Visibility } from 'semantic-ui-react';
import HomepageHeading from '../home-page-heading';
import PageHeaderDesktop from '../page-header/desktop';

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
            style={{ minHeight: 700, padding: '1em 0em' }}
            vertical
          >
            <PageHeaderDesktop fixed={fixed} />
            <HomepageHeading />
          </Segment>
        </Visibility>

        {children}
      </Responsive>
    );
  }
}

export default DesktopContainer;
