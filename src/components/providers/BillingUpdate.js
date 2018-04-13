import React, {Component} from 'react';
import {connect} from 'react-redux';
import {retrievePatients, retrieveBillingItemsMaster} from '../../ducks/reducer';

import axios from 'axios';
import '../../App.css';

class BillingUpdate extends Component {
  constructor() {
    super();

    this.state = {
      billid: 0,
      paid: false,
      amount: 0,
      description: '',
      mappedBills: [],
    };

    this.mapBills = this.mapBills.bind(this);
    this.initialBillState = this.initialBillState.bind(this);
    this.updateBill = this.updateBill.bind(this);
  }

  componentDidMount() {
    this.props.retrievePatients();
    this.props.retrieveBillingItemsMaster();
  }

  mapBills(patientID) {
    const {billingItemsMaster} = this.props;
    const re = /\b(\d+)(\d{2})\b/;
    const subst = '$1.$2';

    const mappedBills = billingItemsMaster
      .filter(bill => +bill.patientid === +patientID)
      .map(bill => (
        <option value={bill.billid}>
          Amount: ${Number(JSON.stringify(bill.amount).replace(re, subst))} | {bill.description}
        </option>
      ));

    this.setState({
      billid: 0,
      paid: false,
      amount: 0,
      description: '',
    });
    this.setState({mappedBills});
    return mappedBills;
  }

  initialBillState(id) {
    if (id === 'holder') {
      return this.setState({
        billid: 0,
        paid: false,
        amount: 0,
        description: '',
      });
    }

    const selectedBill = this.props.billingItemsMaster.filter(bill => +bill.billid === +id);

    const {
      billid, paid, amount, description,
    } = selectedBill[0];

    this.setState({
      billid,
      paid,
      amount,
      description,
    });
  }

  updateBill() {
    const {
      billid, paid, amount, description,
    } = this.state;

    axios
      .put('/providers/data/update-bill', {
        billid,
        paid,
        amount,
        description,
      })
      .then()
      .catch(err => console.log(err));
  }

  render() {
    const styles = {
      width: '50%',
      height: '80%',
      marginLeft: '25%',
      marginRight: '25%',
      marginTop: '1%',
      minHeight: '60vh',
      display: 'flex',
      flexDirection: 'column',
      flexWrap: 'nowrap',
      justifyContent: 'center',
      alignItems: 'stretch',
      alignContent: 'center',
      fontFamily: 'Raleway',
    };

    let mappedPatients = [];
    const {patients} = this.props;

    const re = /\b(\d+)(\d{2})\b/;
    const subst = '$1.$2';

    if (patients && patients.length > 0) {
      mappedPatients = patients.map(patient => (
        <option value={patient.userid}>
          {patient.userid} | {patient.given_name} {patient.family_name}
        </option>
      ));
    }

    return (
      <div style={styles}>
        <form onSubmit={this.updateBill}>
          <h2>Update Bill</h2>
          <hr />
          <div className="form-group">
            <label htmlFor="exampleFormControlSelect1">Patient:</label>
            <select
              className="form-control"
              id="exampleFormControlSelect1"
              onChange={event => this.mapBills(event.target.value)}
            >
              <option selected>Please select a patient.</option>
              {mappedPatients}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="exampleFormControlSelect1">Bill:</label>
            <select
              value={this.state.billid}
              className="form-control"
              id="exampleFormControlSelect1"
              onChange={event => this.initialBillState(event.target.value)}
            >
              <option value="holder">Please select a bill.</option>
              {this.state.mappedBills}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1">Bill Description:</label>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              value={this.state.description}
              maxLength="60"
              required
              onChange={event => this.setState({description: event.target.value})}
              rows="1"
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1">Amount:</label>
            <input
              className="form-control"
              id="exampleFormControlTextarea1"
              maxLength="9"
              type="number"
              min="0"
              step="0.01"
              required
              rows="1"
              value={`${JSON.stringify(this.state.amount).replace(re, subst)}`}
              onChange={event =>
                this.setState({amount: Number(event.target.value.replace(/[$,.]/g, ''))})
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleFormControlSelect1">Paid:</label>
            <select
              value={this.state.paid}
              className="form-control"
              id="exampleFormControlSelect1"
              onChange={event => this.setState({paid: event.target.value})}
            >
              <option value>True</option>
              <option value={false}>False</option>
            </select>
          </div>
          <button type="submit" className="btn btn-secondary">
            Apply
          </button>
        </form>
      </div>
    );
  }
}

export default connect(state => state, {retrievePatients, retrieveBillingItemsMaster})(BillingUpdate);
