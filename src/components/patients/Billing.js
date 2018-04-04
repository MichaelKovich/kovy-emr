import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {retrieveBillingItems} from '../../ducks/reducer';

import Loading from '../subcomponents/Loading';
import './styles/patients.css';

class Billing extends Component {
  constructor() {
    super();

    this.state = {
      amount: 0,
      billid: 0,
    }
  }

  componentDidMount() {
    this.props.retrieveBillingItems();
  }

  render() {
    let mappedItems = [];

    if (this.props.billingItems && this.props.billingItems.length > 0) {
      mappedItems = this.props.billingItems.map(item => (
        <option value={item.amount} billid={item.billid}>
          Amount: ${item.amount} | {item.description}
        </option>
      ));
    }

    // IMPLEMENT A WAY TO SEND THE BILLID AND HAVE IT MARKED AS PAID = TRUE IN THE DATABASE
      // Start by checking what the checkout button sends as a request to the specified endpoint
    // Check the Stripe checkout process (HTTPS required, will have to host first)
    // Check logic again and then get this on Heroku for testing purposes.

    return (
      <div className="medications-c2">
        <form action="/patients/billing/charge" method="POST">
        <div class="form-group">
          <label for="exampleFormControlSelect1">Outstanding Bills:</label>
          <select class="form-control" id="exampleFormControlSelect1" required onChange={(event) => this.setState({amount: event.target.value, billid: event.target.billid})}>
            <option disabled selected>Please select the bill you would like to pay.</option>
            {mappedItems}
          </select>
        </div>
        <div class="form-group">
          <script
            src="https://checkout.stripe.com/checkout.js" class="stripe-button"
            data-key="pk_test_iueyBCm4l0DmYEeCjwFL51iY"
            data-amount={this.state.balance}
            data-name="Iyashi EMR"
            data-description="Widget"
            data-image="https://stripe.com/img/documentation/checkout/marketplace.png"
            data-locale="auto">
          </script>
        </div>
        </form>
      </div>
    )
  }
}

export default connect(state => state, {retrieveBillingItems})(Billing);