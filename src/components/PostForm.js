import React, { Component } from 'react';
import propTypes from 'prop-types';

import { connect } from 'react-redux';
import { createPost } from '../actions/postAction';
// import axios from 'axios';
// import Posts from './Posts';
import uuid from 'uuid';

class PostForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            body: ''
        }

        this.change = this.change.bind(this);
        this.submit = this.submit.bind(this);
    }
    // on change update the state value
    change(e) {
        this.setState({[e.target.name]: e.target.value});
    }
    submit(e) {
        e.preventDefault();
        const post = {
            title: this.state.title,
            body: this.state.body,
            id: uuid.v4()
        }
        this.props.createPost(post);
        // Moving this into reducer for Redux
        // axios.post('https://jsonplaceholder.typicode.com/posts', {
        //     headers: {
        //         'content-type': 'application/json'
        //     },
        //     post
        // })
        //     .then(res => console.log(res.data))
    }
    render() {
        return (
            <div>
                <h2>Add Post</h2>
                <form onSubmit={this.submit}>
                    <div>
                        <label>Title :</label> <br />
                        <input name='title' onChange={this.change} value={this.state.value} />
                    </div> <br />
                    <div>
                        <label>Post :</label> <br />
                        <textarea name='body' onChange={this.change} value={this.state.value} />
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

const mapStateToProps = state => ({
    post: state.posts.item
});

export default connect(mapStateToProps, { createPost })(PostForm);