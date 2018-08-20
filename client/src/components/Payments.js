import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';

export default class Payments extends Component {
  render() {
    return (
      <StripeCheckout
        name="Emaily"
        description="$5 for 5 email credits"
        amount={500}
        currency="USD"
        token={token => console.log(token)}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
        <button className="btn">Add Credits</button>
      </StripeCheckout>
    );
  }
}
