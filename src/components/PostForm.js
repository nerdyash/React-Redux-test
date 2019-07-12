import React, { Component } from 'react';
import propTypes from 'prop-types';
import history from '../History';
import { connect } from 'react-redux';
import { createPost, updatePost } from '../actions/postAction';
import axios from 'axios';
// import Posts from './Posts';
import uuid from 'uuid';

class PostForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userId: props.post ? props.post.userId : null,
            id: props.post ? props.post.id : null,
            title: props.post ? props.post.title : '',
            body: props.post ? props.post.body : ''
        }
        console.log("state : ", this.state)
        this.change = this.change.bind(this);
        this.submit = this.submit.bind(this);
    }
    // on change update the state value
    change(e) {
        this.setState({[e.target.name]: e.target.value});
    }
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
        } else {
            this.props.createPost(post);
        }
        history.push('/');
    }
    render() {
        return (
            <div>
                <h2>Edit Post</h2>
                <form onSubmit={this.submit}>
                    <div>
                        <label>Title :</label> <br />
                        <input name='title' onChange={this.change} value={this.state.title} />
                    </div> <br />
                    <div>
                        <label>Post :</label> <br />
                        <textarea name='body' onChange={this.change} value={this.state.body} />
                    </div> <br />
                    <button type="submit" className='btn'>Submit</button>
                </form>
            </div>
        )
    }
}

PostForm.propTypes = {
    createPost: propTypes.func.isRequired,
    post: propTypes.object.isRequired
}

// const mapStateToProps = (state, props) => ({
//     post: state.posts.item
// });

function mapStateToProps(state, props) {
    console.log(props);
    if(props.match.params.id) {
        return {
            post: props.location.state.updatePost
        }
    }
    return { post: null};
}

export default connect(mapStateToProps, { createPost, updatePost })(PostForm);