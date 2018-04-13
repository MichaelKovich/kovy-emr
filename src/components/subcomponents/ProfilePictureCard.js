import React, {Component} from 'react';
import ReactS3Uploader from 'react-s3-uploader';

import '../../App.css';

class ProfilePictureCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      completed: 0,
    };

    this.progress = this.progress.bind(this);
  }

  progress(percent) {
    this.setState({completed: percent});
  }

  render() {
    return (
      <div style={{fontFamily: 'Raleway'}}>
        <img
          src={this.props.source}
          alt="Profile Picture"
          style={{
            width: '250px',
            height: '250px',
            borderStyle: 'solid',
            borderWidth: '1px',
          }}
        />
        <br />
        <br />
        <ReactS3Uploader
          signingUrl="/s3/sign"
          signingUrlMethod="GET"
          accept="image/*"
          s3path=""
          onProgress={this.progress}
          onFinish={this.props.updatePicture}
          contentDisposition="auto"
          scrubFilename={filename => filename.replace(/[^\w\d_\-.]+/gi, '')}
          inputRef={cmp => (this.uploadInput = cmp)}
          server="http://localhost:3000"
          autoUpload
        />
        {this.state.completed === 0 ? (
          <p>Please select an image to upload.</p>
        ) : this.state.completed === 100 ? (
          <p>Photo received. Click "Submit" when ready!</p>
        ) : (
          <div>
            <div
              className="progress-bar progress-bar-striped progress-bar-animated"
              role="progressbar"
              aria-valuenow={this.state.completed}
              aria-valuemin="0"
              aria-valuemax="100"
              style={{width: `${this.state.completed}%`}}
            >
              Processing...
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default ProfilePictureCard;
