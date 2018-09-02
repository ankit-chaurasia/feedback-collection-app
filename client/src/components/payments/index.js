import React, { Component } from 'react';
import PropTypes from 'prop-types';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import { handleStripeToken } from '../../actions/paymentActions';

class Payments extends Component {
  static propTypes = {
    title: PropTypes.string
  };
  static defaultProps = {
    title: 'Add Credits'
  };
  render() {
    return (
      <StripeCheckout
        name="Emaily"
        description="$5 for 5 email credits"
        amount={500}
        currency="USD"
        token={token => this.props.handleStripeToken(token)}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
        <span>{this.props.title}</span>
      </StripeCheckout>
    );
  }
}

export default connect(
  null,
  { handleStripeToken }
)(Payments);
