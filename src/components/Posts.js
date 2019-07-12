import React, { Component } from 'react';
import history from '../History';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/postAction';

import {withRouter} from "react-router";

class Posts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: []
        }
    }
    
    componentWillMount() {
        this.props.fetchPosts();
    }

    componentWillReceiveProps(newProps) {
        if(newProps.newPost) {
            this.props.posts.unshift(newProps.newPost);
        }
    }
    updatePost(post) {
        const updatPost = {};
        history.push('/postForm/'+post.id, {updatePost: post})
        this.setState({title: history.location.state.updatePost.title});
        this.setState({body: history.location.state.updatePost.body});
        console.log("history : ", history.location.state.updatePost)
    }

    render() {
        const postData = this.props.posts.map(post => (
            <div key={post.id}>
                <h2>{post.title}</h2>
                <p>{post.body}</p>
                <button type='submit' className='btn' onClick={this.updatePost.bind(this, post)}>Edit</button>
            </div>
        ));
        return (
            <React.Fragment>
                <h1>Posts</h1>
                {postData}
            </React.Fragment>
        )
    }
}

Posts.propTypes = {
    fetchPosts: propTypes.func.isRequired,
    posts: propTypes.array.isRequired,
    newPost: propTypes.object
}

const mapStateToProps = state => ({
    posts: state.posts.items,
    // newPost: state.posts.item.post,
})

export default withRouter(connect(mapStateToProps, { fetchPosts })(Posts));
