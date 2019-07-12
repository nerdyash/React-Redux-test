import { FETCH_POSTS, NEW_POST, SEARCH_POST, UPDATE_POST } from './types';
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

export function updatePost(data) {
    return function(dispatch) {
        // axios.post('https://jsonplaceholder.typicode.com/posts', {
        //     post
        // })
        //     .then(res => dispatch({
        //         type:NEW_POST,
        //         payload: res.data
        //     }));
        console.log("id: ", data)
        fetch('https://jsonplaceholder.typicode.com/posts/'+data.id, {
            method: 'PUT',
            body: JSON.stringify({
                id: data.id,
                title: data.title,
                body: data.body,
                userId: data.userId
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(response => response.json())
            .then(json => dispatch({
                type: UPDATE_POST,
                payload: json
            }))
            // .then(res => dispatch({
            //     console.log(res);
            //     type:UPDATE_POST,
            //     payload: res.data
            // }));
    }
}

export function searchPost(searchValue) {
    return {
        type: SEARCH_POST,
        searchValue
    }
}
// export function resetPosts() {
//     return function() {
//         console.log("reset clicked")
//         axios.get('https://jsonplaceholder.typicode.com/posts')
//             .then(
//                 res => ({
//                     type:RESET_POSTS,
//                     payload: res.data
//                 })
//             );
//     }
// }