import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';
import modalStyles from './styles';
import colorsEnum from '../../helpers/colorsEnums';

class CustomModal extends Component {
  static propTypes = {
    showModal: PropTypes.bool,
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
    footer: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
    cancelButtonText: PropTypes.string,
    confirmButtonText: PropTypes.string,
    closeIcon: PropTypes.bool,
    onCancel: PropTypes.func,
    onConfirm: PropTypes.func,
    onClose: PropTypes.func,
    title: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
    headerIcon: PropTypes.string,
    headerIconColor: PropTypes.string,
    size: PropTypes.string,
    closeOnDocumentClick: PropTypes.bool,
    isOnConfirmDisabled: PropTypes.bool,
    isConfirmLoading: PropTypes.bool,
    style: PropTypes.oneOf(_.values(modalStyles))
  };

  static defaultProps = {
    showModal: false,
    closeOnDocumentClick: true,
    modalContent: 'Are you sure?',
    cancelButtonText: 'Cancel',
    children: null,
    confirmButtonText: 'Yes',
    closeIcon: true,
    onCancel: null,
    onConfirm: null,
    title: null,
    headerIcon: null,
    headerIconColor: colorsEnum.grey,
    size: 'mini',
    isOnConfirmDisabled: false,
    isConfirmLoading: false,
    style: modalStyles.basic
  };

  renderHeader = () => {
    if (!this.props.title) return null;
    return (
      <Header>
        {this.props.headerIcon && (
          <Icon
            name={this.props.headerIcon}
            color={this.props.headerIconColor}
          />
        )}
        <Header.Content>{this.props.title}</Header.Content>
      </Header>
    );
  };

  renderBody = () => {
    if (!this.props.children) return null;
    return <Modal.Content>{this.props.children}</Modal.Content>;
  };

  renderFooter = () => {
    if (this.props.footer) return this.props.footer;
    if (!(this.props.onConfirm || this.props.onCancel)) return null;
    const cancelButton = (
      <Button onClick={this.props.onCancel}>
        {this.props.cancelButtonText}
      </Button>
    );
    const confirmButton = (
      <Button
        onClick={this.props.onConfirm}
        {...{ [this.props.style]: true }}
        disabled={this.props.isOnConfirmDisabled}
        loading={this.props.isConfirmLoading}
      >
        <Icon name="checkmark" /> {this.props.confirmButtonText}
      </Button>
    );
    return (
      <Modal.Actions>
        {this.props.onCancel ? cancelButton : null}
        {this.props.onConfirm ? confirmButton : null}
      </Modal.Actions>
    );
  };

  render() {
    return (
      <Modal
        closeIcon={this.props.closeIcon}
        open={this.props.showModal}
        size={this.props.size}
        onClose={this.props.onClose}
        closeOnDocumentClick={this.props.closeOnDocumentClick}
      >
        {this.renderHeader()}
        {this.renderBody()}
        {this.renderFooter()}
      </Modal>
    );
  }
}

export default CustomModal;
