import PropTypes from 'prop-types';
import React from 'react';
import { Responsive } from 'semantic-ui-react';
import SideBarMobile from '../side-bar-mobile';

const MobileContainer = ({ children }) => (
  <Responsive maxWidth={Responsive.onlyMobile.maxWidth}>
    <SideBarMobile>{children}</SideBarMobile>
  </Responsive>
);
MobileContainer.propTypes = {
  children: PropTypes.node
};
export default MobileContainer;
