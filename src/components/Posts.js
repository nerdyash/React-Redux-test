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

class Posts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            suggestions: []
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

    onClick(post) {
        document.getElementById('standard-dense').setAttribute('value',post.title);
        document.querySelector('.suggestions').classList.add('hide');
        this.setState({
            search: post.title
        })
    }

    render() {
        let updatedPosts = this.props.posts.filter((val) => {
            return val.title.toLowerCase().indexOf(this.state.search) !== -1;
        });

        const suggested = updatedPosts.slice(0, 5).map(post => (
            <TextField
                disabled
                id="standard-disabled"
                value={post.title}
                onClick={this.onClick.bind(this, post)}
            />
        ));

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
                    className="searchBox"
                    placeholder='Search the posts...'
                    onChange={this.onChange.bind(this)}
                    value={this.state.search}
                />
                <div className='suggestions hide'>{suggested}</div>
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
