import React, {Component} from 'react';
import {connect} from 'react-redux';
import {retrieveBillingItems} from '../../ducks/reducer';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

import '../../App.css';

class Billing extends Component {
  constructor() {
    super();

    this.state = {
      amount: 0,
      billid: 0,
    };

    this.onToken = this.onToken.bind(this);
  }

  componentDidMount() {
    this.props.retrieveBillingItems();
  }

  selectBill(value) {
    const matchBillID = element => element.billid == value;
    const ind = this.props.billingItems.findIndex(matchBillID);

    this.setState({
      amount: +this.props.billingItems[ind].amount,
      billid: value,
    });
  }

  onToken(token) {
    if (this.state.amount === 0) {
      return alert('Please select a bill first!');
    }
    console.log(this.state);

    axios
      .post('/patients/billing/charge', {
        amount: this.state.amount,
        stripeToken: token,
        billid: this.state.billid,
        email: this.props.username,
      })
      .then(res => this.props.retrieveBillingItems())
      .catch(err => console.log(err));
  }

  render() {
    const styles = {
      width: '40%',
      height: '80%',
      marginLeft: '30%',
      marginRight: '30%',
      marginTop: '1%',
      minHeight: '60vh',
      fontFamily: 'Raleway',
    };

    let mappedItems = [];

    const re = /\b(\d+)(\d{2})\b/;
    const subst = '$1.$2';

    if (this.props.billingItems && this.props.billingItems.length > 0) {
      mappedItems = this.props.billingItems.map(item => (
        <option value={item.billid}>
          Amount: ${Number(JSON.stringify(item.amount).replace(re, subst))} | {item.description}
        </option>
      ));
    }

    return (
      <div style={styles}>
        <form>
          <div className="form-group">
            <label htmlFor="exampleFormControlSelect1" style={{fontSize: '120%'}}>
              Outstanding Bills:
            </label>
            <select
              className="form-control"
              id="exampleFormControlSelect1"
              required
              onChange={event => this.selectBill(event.target.value)}
            >
              <option disabled selected>
                Please select the bill you would like to pay.
              </option>
              {mappedItems}
            </select>
          </div>
        </form>
        <StripeCheckout
          token={this.onToken}
          stripeKey="pk_test_iueyBCm4l0DmYEeCjwFL51iY"
          amount={this.state.amount}
          name="Iyashi EMR"
          email={this.props.username}
        />
      </div>
    );
  }
}

export default connect(state => state, {retrieveBillingItems})(Billing);
