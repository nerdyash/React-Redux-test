import { FETCH_POSTS, UPDATE_POST } from './types';
import axios from 'axios';

export function fetchPosts() {
    return function(dispatch) {
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(res => dispatch({
                type:FETCH_POSTS, 
                payload: res.data
            }));
    }
}

export function updatePost(data) {
    return function(dispatch) {
        fetch('https://jsonplaceholder.typicode.com/posts/' + data.id, {
            method: 'PUT',
            body: JSON.stringify({
                userId: data.userId,
                id: data.id,
                title: data.title,
                body: data.body,
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(response => response.json())
            .then(json => dispatch({
                type: UPDATE_POST,
                payload: json
            }));
    }
}