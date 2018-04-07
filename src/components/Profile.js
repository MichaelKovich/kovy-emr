import React, {Component} from 'react';
import {connect} from 'react-redux';
import {retrieveMyProfile} from '../ducks/reducer';

import ProfileForm from './subcomponents/ProfileForm';
import Loading from './subcomponents/Loading';
import './providers/styles/providers.css';

class Profile extends Component {
  componentDidMount() {
    this.props.retrieveMyProfile();
  }

  render() {
    const {profileData} = this.props;

    return (
      <div className="medications-c2" style={{marginBottom: '10px'}}>
        {profileData && profileData.length > 0 ? (
          <ProfileForm
            given_name={profileData[0].given_name}
            family_name={profileData[0].family_name}
            picture={profileData[0].picture}
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
    );
  }
}

export default connect(state => state, {retrieveMyProfile})(Profile);
