import React, {Component} from 'react';
import {connect} from 'react-redux';
import {retrieveSinglePost, retrieveComments} from '../ducks/reducer';
import {withRouter} from 'react-router';
import ReactHtmlParser from 'react-html-parser';
import axios from 'axios';
import {Link} from 'react-router-dom';

import Loading from './subcomponents/Loading';
import Comment from './subcomponents/Comment';
import '../App.css';

class SinglePost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      comment: '',
    };

    this.submitComment = this.submitComment.bind(this);
  }

  componentDidMount() {
    this.props.retrieveSinglePost(this.props.match.params.id);
    this.props.retrieveComments(this.props.match.params.id);
  }

  submitComment() {
    console.log('submitComment');

    const postid = this.props.match.params.id;
    const author = this.props.userid;
    const {content} = this.state;

    axios
      .post('/data/submit-comment', {postid, author, content})
      .then()
      .catch(err => console.log(err));
  }

  render() {
    const styles = {
      fontFamily: 'Raleway',
    };

    let mappedComments = [];

    if (this.props.comments && this.props.comments.length > 0) {
      mappedComments = this.props.comments.map(comment => (
        <Comment
          first={comment.given_name}
          last={comment.family_name}
          content={comment.content}
          image={comment.picture}
        />
      ));
    }

    let post = '';

    this.props.singlePost && this.props.singlePost.length > 0
      ? (post = this.props.singlePost[0])
      : null;

    return (
      <div>
        {this.props.singlePost && this.props.singlePost.length > 0 ? (
          <div className="container" style={styles}>
            <div className="row">
              <div className="col-lg-8">
                <h3 className="mt-4">{ReactHtmlParser(post.title)}</h3>
                <hr />
                <p>
                  Posted on {post.date} by {post.given_name} {post.family_name}
                </p>
                <hr />
                <img className="img-fluid rounded" src={post.image} alt="Blog Post Header" />
                <hr />
                {ReactHtmlParser(post.content)}
                <hr />
                <div className="card my-4">
                  <h5 className="card-header" style={{color: 'white', backgroundColor: '#343a40'}}>
                    Leave a Comment:
                  </h5>
                  <div className="card-body">
                    <form onSubmit={this.submitComment}>
                      <div className="form-group">
                        <textarea
                          className="form-control"
                          rows="3"
                          onChange={event => this.setState({content: event.target.value})}
                        />
                      </div>
                      <button type="submit" className="btn btn-secondary">
                        Submit
                      </button>
                    </form>
                  </div>
                </div>
                {this.props.comments && this.props.comments.length > 0 ? mappedComments : null}
              </div>
              <div className="col-md-4">
                <div className="card my-4">
                  <h5 className="card-header" style={{color: 'white', backgroundColor: '#343a40'}}>
                    Recent Posts
                  </h5>
                  <div className="card-body">
                    <div className="row">
                      <ul className="list-unstyled mb-0">
                        <li>
                          <Link
                            to={`${this.props.match.url.replace(this.props.match.params.id, '4')}`}
                          >
                            Caffeine Consumption
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={`${this.props.match.url.replace(this.props.match.params.id, '7')}`}
                          >
                            Muscle Composition
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={`${this.props.match.url.replace(this.props.match.params.id, '9')}`}
                          >
                            Sleep Movement
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="card my-4">
                  <h5 className="card-header" style={{color: 'white', backgroundColor: '#343a40'}}>
                    Welcome!
                  </h5>
                  <div className="card-body">
                    IyashiEMR makes it easy for patients and providers to access, share, and update
                    information in one secure location. Please enjoy our blog!
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Loading />
        )}
      </div>
    );
  }
}

export default withRouter(connect(state => state, {retrieveSinglePost, retrieveComments})(SinglePost));
