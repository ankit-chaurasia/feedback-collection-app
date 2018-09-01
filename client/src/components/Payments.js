import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import { handleStripeToken } from '../actions/paymentActions';

class Payments extends Component {
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
        <span className="btn">Add Credits</span>
      </StripeCheckout>
    );
  }
}

export default connect(
  null,
  { handleStripeToken }
)(Payments);
