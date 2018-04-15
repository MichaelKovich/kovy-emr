import React, {Component} from 'react';
import {connect} from 'react-redux';
import {retrieveBlogPosts} from '../ducks/reducer';
import {withRouter} from 'react-router';

import PostCard from './subcomponents/PostCard';
import Loading from './subcomponents/Loading';
import '../App.css';

class Blog extends Component {
  componentDidMount() {
    this.props.retrieveBlogPosts();
  }

  render() {
    const styles = {
      width: '80%',
      marginLeft: '10%',
      marginRight: '10%',
      marginTop: '1%',
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gridGap: '10px',
      minHeight: '60vh',
      fontFamily: 'Raleway',
    };

    let mappedPosts = [];

    if (this.props.blogPosts && this.props.blogPosts.length > 0) {
      mappedPosts = this.props.blogPosts.map(post => (
        <PostCard
          id={post.postid}
          title={post.title}
          excerpt={post.excerpt}
          image={post.image}
          path={this.props.match.path}
        />
      ));
    }

    return (
      <div>
        {this.props.blogPosts && this.props.blogPosts.length > 0 ? (
          <div style={styles}>{mappedPosts}</div>
        ) : (
          <Loading />
        )}
      </div>
    );
  }
}

export default withRouter(connect(state => state, {retrieveBlogPosts})(Blog));
