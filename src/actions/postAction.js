import { FETCH_POSTS, NEW_POST } from './types';
import axios from 'axios';

export function fetchPosts() {
    return function(dispatch) {
        axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10')
            .then(res => dispatch({
                type:FETCH_POSTS, 
                payload: res.data
            }));
    }
}

export function createPost(post) {
    return function(dispatch) {
        axios.post('https://jsonplaceholder.typicode.com/posts', {
            post
        })
            .then(res => dispatch({
                type:NEW_POST, 
                payload: res.data
            }));
    }
}