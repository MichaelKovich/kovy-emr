import React, {Component} from 'react';
import {connect} from 'react-redux';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';

import PostImage from './subcomponents/PostImage';

class CreatePost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      excerpt: '',
      content: '',
      image: '',
    };

    this.handleContentChange = this.handleContentChange.bind(this);
    this.handleExcerptChange = this.handleExcerptChange.bind(this);
    this.onUploadFinish = this.onUploadFinish.bind(this);
    this.submitPost = this.submitPost.bind(this);
  }

  handleContentChange(value) {
    this.setState({content: value});
  }

  handleExcerptChange(value) {
    this.setState({excerpt: value});
  }

  onUploadFinish(s3) {
    const image = `https://s3-us-west-1.amazonaws.com/iyashi-emr/${s3.filename}`;
    this.setState({image});
  }

  submitPost() {
    const {
      title, excerpt, content, image,
    } = this.state;
    const {userid} = this.props;

    if (!title || !excerpt || !content || !image) {
      return alert('Please complete all fields!');
    }

    axios
      .post('/providers/data/submit-post', {
        title,
        excerpt,
        content,
        image,
        author: userid,
      })
      .then()
      .catch(err => console.log(err));
  }

  render() {
    const styles = {
      width: '60%',
      marginLeft: '20%',
      marginRight: '20%',
      marginTop: '1%',
      minHeight: '60vh',
      fontFamily: 'Raleway',
    };

    return (
      <div style={styles}>
        <form onSubmit={this.submitPost}>
          <h3>Create a Post</h3>
          <hr />
          <div className="input-group input-group-sm">
            <div className="input-group-prepend">
              <span className="input-group-text">TITLE</span>
            </div>
            <textarea
              className="form-control"
              aria-label="Title"
              onChange={event => this.setState({title: event.target.value})}
            />
          </div>
          <br />
          <ReactQuill
            placeholder="Enter your main content here."
            value={this.state.content}
            theme="snow"
            onChange={this.handleContentChange}
          />
          <br />
          <ReactQuill
            placeholder="Enter your excerpt here."
            maxlength="240"
            value={this.state.excerpt}
            theme="snow"
            onChange={this.handleExcerptChange}
          />
          <br />
          <div className="input-group input-group-sm">
            <PostImage updatePicture={this.onUploadFinish} />
          </div>
          <button type="submit" className="btn btn-outline-secondary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default connect(state => state)(CreatePost);
