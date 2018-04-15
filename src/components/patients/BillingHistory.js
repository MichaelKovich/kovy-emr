import React, {Component} from 'react';
import {connect} from 'react-redux';
import {retrieveBillingHistory} from '../../ducks/reducer';

import BillingItems from './subcomponents/BillingItems';
import './styles/spreadsheet.css';
import '../../App.css';

class BillingHistory extends Component {
  componentDidMount() {
    this.props.retrieveBillingHistory();
  }

  render() {
    const styles = {
      width: '50%',
      height: '80%',
      marginLeft: '25%',
      marginRight: '25%',
      marginTop: '1%',
      minHeight: '60vh',
      fontFamily: 'Raleway',
    };

    let mappedItems = [];

    const re = /\b(\d+)(\d{2})\b/;
    const subst = '$1.$2';

    if (this.props.billingHistory && this.props.billingHistory.length > 0) {
      mappedItems = this.props.billingHistory.map(item => (
        <BillingItems
          billid={item.billid}
          paid={item.paid}
          amount={`$${Number(JSON.stringify(item.amount).replace(re, subst))}`}
          description={item.description}
        />
      ));
    }

    return (
      <div style={styles}>
        <table id="billing-items">
          <thead>
            <tr>
              <th>ID</th>
              <th>Paid</th>
              <th>Amount</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>{mappedItems}</tbody>
        </table>
      </div>
    );
  }
}

export default connect(state => state, {retrieveBillingHistory})(BillingHistory);
