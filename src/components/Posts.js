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
            search: '',
        }
    }
    componentWillMount() {
        this.props.fetchPosts();
    }
    updatePost(post) {
        const updatPost = {};
        history.push('/postForm/'+post.id, {updatePost: post})
        this.setState({title: history.location.state.updatePost.title});
        this.setState({body: history.location.state.updatePost.body});
    }

    onChange(e) {
        this.setState({
            search: e.target.value
        })
    }
    render() {
        let updatedPosts = this.props.posts.filter((val) => {
            return val.title.toLowerCase().indexOf(this.state.search) !== -1;
        });
        const postData = updatedPosts.map(post => (
            <div key={post.id}>
                <h2>{post.title}</h2>
                <p>{post.body}</p>
                <button type='submit' className='btn' onClick={this.updatePost.bind(this, post)}>Edit</button>
            </div>
        ));
        return (
            <React.Fragment>
                <input name='search' onChange={this.onChange.bind(this)} placeholder=''/>
                <h1>Posts</h1>
                {postData}
            </React.Fragment>
        )
    }
}

Posts.propTypes = {
    fetchPosts: propTypes.func.isRequired,
    posts: propTypes.array.isRequired
}

const mapStateToProps = state => ({
    posts: state.posts.items
})

export default withRouter(connect(mapStateToProps, { fetchPosts })(Posts));
