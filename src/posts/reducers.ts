import {
    POSTS_FETCH_BEGIN,
    POSTS_FETCH_ERROR,
    POSTS_FETCH_LOCATION,
    POSTS_FETCH_SUCCESS,
    PostsAction,
    PostsList,
} from './actions';

export interface PostsState {
    posts: PostsList;
    loading: boolean;
    error: boolean;
    location: any;
}

const initialState: PostsState = {
    posts: [],
    location: 'India',
    loading: false,
    error: false
};

export const posts = (state = initialState, action: PostsAction): PostsState => {

    switch (action.type) {
        case POSTS_FETCH_BEGIN:
            return {...initialState, loading: true};
        case POSTS_FETCH_SUCCESS:
            return {...initialState, posts: action.posts};
        case POSTS_FETCH_ERROR:
            return {...initialState, error: true};
        case POSTS_FETCH_LOCATION:
            return {...initialState, location: action.location};
        default:
            return state;
    }
};
