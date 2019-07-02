import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/postAction';
// import axios from 'axios';

class Posts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: []
        }
    }
    
    componentWillMount() {
        this.props.fetchPosts();
    // Moving this into the action to work with Redux
    //     axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10')
    //         .then(res => this.setState({posts: res.data}));
    }

    componentWillReceiveProps(newProps) {
        if(newProps.newPost) {
            this.props.posts.unshift(newProps.newPost);
        }
    }

    render() {
        // Commenting because we don't need it for redux
        // const postData = this.state.posts.map(post => (
        //     <div key={post.id}>
        //         <h2>{post.title}</h2>
        //         <p>{post.body}</p>
        //     </div>
        // ));
        const postData = this.props.posts.map(post => (
            <div key={post.id}>
                <h2>{post.title}</h2>
                <p>{post.body}</p>
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
    newPost: state.posts.item.post
})

export default connect(mapStateToProps, { fetchPosts })(Posts);
