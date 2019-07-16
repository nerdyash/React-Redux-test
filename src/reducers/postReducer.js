import { FETCH_POSTS, UPDATE_POST } from '../actions/types';

const initState = {
    items: [],
    item: {},
    searchValue: '',
    updateItem: {}
}

export default function(state = initState, action) {
    switch(action.type) {
        case FETCH_POSTS:
            return {
                ...state,
                items: action.payload
            }
        case UPDATE_POST:
            const index = state.items.findIndex(item => item.id === action.payload.id);
            if(index > -1) {
                state.items[index] = action.payload;
                return {
                    ...state
                }
            } else {
                return {
                    ...state,
                    updateItem: action.payload
                }
            }
        default:
            return state;
    }
}