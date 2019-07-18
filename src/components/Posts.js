// Post.js
//
// This file is showing the posts from the API, searching the posts through search box
//
// and also showing the auto-complete suggestions


import React, { Component } from 'react';
import history from '../History';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import {withRouter} from "react-router";
import { fetchPosts } from '../actions/postAction';

import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';


class Posts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: ''
        }
    }
    // fetching the posts through redux
    componentWillMount() {
        if(this.props.posts.length < 1) {
            this.props.fetchPosts();
        }
    }
    // routing the post to edit form
    updatePost(post) {
        history.push('/postForm/'+post.id, {updatePost: post})
    }
    // on change of the value from search box filtering posts and auto-complete
    onChange(e) {
        let value = e.target.value;
        const div = document.querySelector('.suggestions');
        this.setState({
            search: value
        });
        if(value === '') {
            div.classList.add('hide');
        } else {
            div.classList.remove('hide');
        }
    }
    // on click of auto-complete showing intended post to the user
    onClick(post) {
        document.getElementById('standard-dense').setAttribute('value',post.title);
        document.querySelector('.suggestions').classList.add('hide');
        this.setState({
            search: post.title
        })
    }

    render() {
        // Filtering the posts
        let updatedPosts = this.props.posts.filter((val) => {
            return val.title.toLowerCase().indexOf(this.state.search) !== -1;
        });
        // Suggested posts for auto-complete
        const suggested = updatedPosts.slice(0, 5).map(post => (
            <React.Fragment>
                <ListItem button>
                    <ListItemText primary={post.title} key={post.id} onClick={this.onClick.bind(this, post)} />
                </ListItem>
                <Divider />
            </React.Fragment>
        ));
        // Posts
        const postData = updatedPosts.map(post => (
            <Paper key={post.id}>
                <Typography variant="h5" component="h3">
                    {post.title}
                </Typography>
                <Typography component="p">
                    {post.body}
                </Typography>
                <Button color='secondary' className='editButton' onClick={this.updatePost.bind(this, post)}>Edit</Button>
            </Paper>
        ));

        return (
            <React.Fragment>
                <h2>Search Posts : </h2>
                <TextField
                    id="standard-dense"
                    label="Search"
                    className="searchBox"
                    placeholder='Search the posts...'
                    onChange={this.onChange.bind(this)}
                    value={this.state.search}
                />
                <div className='suggestions hide'><List component="nav" aria-label="Mailbox folders">{suggested}</List></div>
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
