// PostForm.js
//
// This file is showing populated Edit form.
//
// On submit of the form it's updating the state of the indended item.

import React, { Component } from 'react';
import propTypes from 'prop-types';
import history from '../History';
import { connect } from 'react-redux';
import { updatePost } from '../actions/postAction';

import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';

class PostForm extends Component {
    constructor(props) {
        super(props);
        let post = props.location.state.updatePost;
        this.state = {
            userId: post ? post.userId : null,
            id: post ? post.id : null,
            title: post ? post.title : '',
            body: post ? post.body : ''
        }
        this.change = this.change.bind(this);
        this.submit = this.submit.bind(this);
    }

    // on change update the state value
    change(e) {
        this.setState({[e.target.name]: e.target.value});
    }
    // Updating the post and storing the value in the redux store
    submit(e) {
        e.preventDefault();
        const { userId, id, title, body } = this.state;
        const post = {
            id: id,
            title: title,
            body: body,
        }
        if(id) {
            this.props.updatePost({userId, id, title, body});
        }
        this.setState({title: title, body: body})
        history.push('/', this.props.posts);
    }
    render() {
        return (
            <div>
                <h2>Edit Post</h2>
                <form onSubmit={this.submit} noValidate autoComplete="off">
                    <FormControl>
                        <Input
                            id="adornment-title"
                            value={this.state.title}
                            onChange={this.change}
                            aria-describedby="title"
                            type='text'
                            name='title'
                            placeholder='Title'
                        />
                        <FormHelperText id="weight-helper-text">Title</FormHelperText>
                    </FormControl>
                    <FormControl>
                        <Input
                            id="adornment-body"
                            value={this.state.body}
                            onChange={this.change}
                            aria-describedby="body"
                            type='text'
                            name='body'
                            placeholder='Post'
                            multiline
                        />
                        <FormHelperText id="weight-helper-text">Post</FormHelperText>
                    </FormControl>

                    <Button variant="contained" color="primary" type='submit'>
                        Save
                        <SaveIcon />
                    </Button>


                </form>
            </div>
        )
    }
}

PostForm.propTypes = {
    post: propTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    post: state.posts.item
})

export default connect(mapStateToProps, { updatePost })(PostForm);