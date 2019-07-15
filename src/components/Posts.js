import React, { Component } from 'react';
import history from '../History';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/postAction';

import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

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

                <Paper key={post.id}>
                    <Typography variant="h5" component="h3">
                        {post.title}
                    </Typography>
                    <Typography component="p">
                        {post.body}
                    </Typography>
                    <Button color='secondary' onClick={this.updatePost.bind(this, post)}>Edit</Button>
                </Paper>

        ));
        return (
            <React.Fragment>
                <h2>Search Posts : </h2>
                <TextField
                    id="standard-dense"
                    label="Search"
                    placeholder='Search the posts...'
                    onChange={this.onChange.bind(this)}
                />
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
