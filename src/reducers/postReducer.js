import { FETCH_POSTS, NEW_POST, SEARCH_POST, UPDATE_POST } from '../actions/types';

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
        case NEW_POST:
            return {
                ...state,
                item: action.payload   
            }
        case UPDATE_POST:
            return {
                ...state,
                updateItem: action.payload
            }
        case SEARCH_POST:
            const {searchValue} = action;
            const items = state.items.filter((val) => {
                return val.title.toLowerCase().indexOf(state.searchValue.toLowerCase()) !== -1;
            });
            return {
                ...state,
                searchValue,
                items
            }
        // case RESET_POSTS:
        //     return {
        //         ...state,
        //         items: action.payload
        //     }
        default:
            return state;
    }
}