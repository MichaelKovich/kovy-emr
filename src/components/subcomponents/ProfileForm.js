import React, {Component} from 'react';
import axios from 'axios';

class ProfileForm extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      given_name: '',
      family_name: '',
      picture: '',
      address: '',
      city: '',
      state: '',
      zip: 0,
      phone: 0,
      notifications: false,
    };

    this.updateProfile = this.updateProfile.bind(this);
  }

  updateProfile() {
    console.log(this.props.userid);

    const {
      given_name,
      family_name,
      picture,
      address,
      city,
      stateabbrev,
      zip,
      phone,
      notifications,
    } = this.state;

    axios
      .put('/data/update-profile', {
        given_name: given_name || this.props.given_name,
        family_name: family_name || this.props.family_name,
        picture: picture || this.props.picture,
        address: address || this.props.address,
        city: city || this.props.city,
        state: stateabbrev || this.props.stateabbrev,
        zip: zip || this.props.zip,
        phone: phone || this.props.phone,
        notifications: notifications || this.props.notifications,
      })
      .then()
      .catch(err => console.log(err));
  }

  render() {
    const {
      given_name,
      family_name,
      picture,
      address,
      city,
      stateabbrev,
      zip,
      phone,
      notifications,
    } = this.props;

    return (
      <form onSubmit={this.updateProfile}>
        <div className="form-group">
          <label htmlFor="exampleFormControlInput1">First Name:</label>
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            required
            value={this.state.given_name || given_name}
            onChange={event => this.setState({given_name: event.target.value})}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleFormControlInput1">Last Name:</label>
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            required
            value={this.state.family_name || family_name}
            onChange={event => this.setState({family_name: event.target.value})}
          />
        </div>
        {/* REACT S3 UPLOADER RIGHT HERE */}
        {/* DISPLAY USER'S PHOTO HERE */}
        <div className="form-group">
          <label htmlFor="exampleFormControlInput1">Address:</label>
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            required
            value={this.state.address || address}
            onChange={event => this.setState({address: event.target.value})}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleFormControlInput1">City:</label>
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            required
            value={this.state.city || city}
            onChange={event => this.setState({city: event.target.value})}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleFormControlSelect1">State:</label>
          <select
            className="form-control"
            id="exampleFormControlSelect1"
            required
            value={this.state.stateabbrev || stateabbrev}
            onChange={event => this.setState({stateabbrev: event.target.value})}
          >
            <option value="AL">Alabama</option>
            <option value="AK">Alaska</option>
            <option value="AZ">Arizona</option>
            <option value="AR">Arkansas</option>
            <option value="CA">California</option>
            <option value="CO">Colorado</option>
            <option value="CT">Connecticut</option>
            <option value="DE">Delaware</option>
            <option value="DC">District Of Columbia</option>
            <option value="FL">Florida</option>
            <option value="GA">Georgia</option>
            <option value="HI">Hawaii</option>
            <option value="ID">Idaho</option>
            <option value="IL">Illinois</option>
            <option value="IN">Indiana</option>
            <option value="IA">Iowa</option>
            <option value="KS">Kansas</option>
            <option value="KY">Kentucky</option>
            <option value="LA">Louisiana</option>
            <option value="ME">Maine</option>
            <option value="MD">Maryland</option>
            <option value="MA">Massachusetts</option>
            <option value="MI">Michigan</option>
            <option value="MN">Minnesota</option>
            <option value="MS">Mississippi</option>
            <option value="MO">Missouri</option>
            <option value="MT">Montana</option>
            <option value="NE">Nebraska</option>
            <option value="NV">Nevada</option>
            <option value="NH">New Hampshire</option>
            <option value="NJ">New Jersey</option>
            <option value="NM">New Mexico</option>
            <option value="NY">New York</option>
            <option value="NC">North Carolina</option>
            <option value="ND">North Dakota</option>
            <option value="OH">Ohio</option>
            <option value="OK">Oklahoma</option>
            <option value="OR">Oregon</option>
            <option value="PA">Pennsylvania</option>
            <option value="RI">Rhode Island</option>
            <option value="SC">South Carolina</option>
            <option value="SD">South Dakota</option>
            <option value="TN">Tennessee</option>
            <option value="TX">Texas</option>
            <option value="UT">Utah</option>
            <option value="VT">Vermont</option>
            <option value="VA">Virginia</option>
            <option value="WA">Washington</option>
            <option value="WV">West Virginia</option>
            <option value="WI">Wisconsin</option>
            <option value="WY">Wyoming</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="exampleFormControlInput1">Zip Code:</label>
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            required
            value={this.state.zip || zip}
            onChange={event => this.setState({notifications: +event.target.value})}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleFormControlInput1">Phone:</label>
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            required
            value={this.state.phone || phone}
            onChange={event => this.setState({phone: +event.target.value})}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleFormControlSelect1">Receive Notifications:</label>
          <select
            className="form-control"
            id="exampleFormControlSelect1"
            required
            value={this.state.notifications || notifications}
            onChange={event => this.setState({notifications: event.target.value})}
          >
            <option value>Yes</option>
            <option value={false}>No</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Update
        </button>
      </form>
    );
  }
}

export default ProfileForm;
