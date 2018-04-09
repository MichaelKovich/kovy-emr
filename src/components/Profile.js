import React, {Component} from 'react';
import {connect} from 'react-redux';
import {retrieveMyProfile} from '../ducks/reducer';
import axios from 'axios';

import ProfilePictureCard from './subcomponents/ProfilePictureCard';
import ProfileForm from './subcomponents/ProfileForm';
import Loading from './subcomponents/Loading';
import './providers/styles/providers.css';
import '../App.css';

class Profile extends Component {
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

    this.onUploadFinish = this.onUploadFinish.bind(this);
    this.updateProfile = this.updateProfile.bind(this);
  }

  componentDidMount() {
    this.props.retrieveMyProfile();
  }

  onUploadFinish(s3) {
    const picture = `https://s3-us-west-1.amazonaws.com/iyashi-emr/${s3.filename}`;
    this.setState({picture});
  }

  updateProfile(childState) {
    console.log(childState);

    const {picture} = this.state;
    const {profileData} = this.props;

    const {
      given_name,
      family_name,
      address,
      city,
      stateabbrev,
      zip,
      phone,
      notifications,
    } = childState;

    axios
      .put('/data/update-profile', {
        given_name: given_name || profileData[0].given_name,
        family_name: family_name || profileData[0].family_name,
        picture: picture || profileData[0].picture,
        address: address || profileData[0].address,
        city: city || profileData[0].city,
        state: stateabbrev || profileData[0].state,
        zip: zip || profileData[0].zip,
        phone: phone || profileData[0].phone,
        notifications: notifications || profileData[0].notifications,
      })
      .then(this.props.retrieveMyProfile())
      .catch(err => console.log(err));
  }

  render() {
    const {profileData} = this.props;

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          marginBottom: '10px',
        }}
        className="profile"
      >
        <div>
          {profileData && profileData.length > 0 ? (
            <ProfileForm
              update={this.updateProfile}
              given_name={profileData[0].given_name}
              family_name={profileData[0].family_name}
              address={profileData[0].address}
              city={profileData[0].city}
              stateabbrev={profileData[0].state}
              zip={profileData[0].zip}
              phone={profileData[0].phone}
              notifications={profileData[0].notifications}
            />
          ) : (
            <Loading />
          )}
        </div>
        <div>
          {profileData && profileData.length > 0 ? (
            <ProfilePictureCard
              source={profileData[0].picture}
              updatePicture={this.onUploadFinish}
            />
          ) : (
            <Loading />
          )}
        </div>
      </div>
    );
  }
}

export default connect(state => state, {retrieveMyProfile})(Profile);
