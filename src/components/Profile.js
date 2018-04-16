import React, {Component} from 'react';
import {connect} from 'react-redux';
import {retrieveMyProfile} from '../ducks/reducer';
import axios from 'axios';

import ProfilePictureCard from './subcomponents/ProfilePictureCard';
import ProfileForm from './subcomponents/ProfileForm';
import Loading from './subcomponents/Loading';
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
      .then(res => this.props.retrieveMyProfile())
      .catch(err => console.log(err));
  }

  render() {
    const styles = {
      width: '80%',
      height: '80%',
      marginTop: '1%',
      marginLeft: 'auto',
      marginRight: 'auto',
      minHeight: '60vh',
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: 'Raleway',
    };

    const {profileData} = this.props;

    return (
      <div style={styles}>
        {profileData && profileData.length > 0 ? (
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <div style={{marginRight: '2%'}}>
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
            </div>
            <div style={{marginTop: '1%'}}>
              <ProfilePictureCard
                source={profileData[0].picture}
                updatePicture={this.onUploadFinish}
              />
            </div>
          </div>
        ) : (
          <Loading />
        )}
      </div>
    );
  }
}

export default connect(state => state, {retrieveMyProfile})(Profile);
