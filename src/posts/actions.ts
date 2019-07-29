import axios from 'axios';
import { postsApiUrl } from './constants';
import { Action, Dispatch } from 'redux';

export const POSTS_FETCH_BEGIN = 'POSTS_FETCH_BEGIN';
export const POSTS_FETCH_SUCCESS = 'POSTS_FETCH_SUCCESS';
export const POSTS_FETCH_ERROR = 'POSTS_FETCH_ERROR';
export const POSTS_FETCH_LOCATION = 'POSTS_FETCH_LOCATION';

export interface Owner {
    avatar_url: string;
    login: string;
    html_url: string;
}

export interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
    description: string;
    full_name: string;
    stargazers_count: number;
    owner: {
        [key: string]: Owner
    };
}

export interface Location {
    location: string;
}

export type PostsList = Post[];
export type LocationCity = Location[];

export interface PostsAction extends Action {
    posts: PostsList;
    location: LocationCity;
}

// Internal action creators
const postsFetchBegin = () => {
    return {
        type: POSTS_FETCH_BEGIN
    };
};

const postsFetchSuccess = (posts: PostsList) => {
    return {
        type: POSTS_FETCH_SUCCESS,
        posts
    };
};

const postsFetchError = () => {
    return {
        type: POSTS_FETCH_ERROR
    };
};

const postsFetchLocation = (location: LocationCity) => {
    console.log(location);
    return {
        type: POSTS_FETCH_LOCATION,
        location
    };
};

export const postsFetch = () => (dispatch: Dispatch<PostsAction>) => {

    // API request will be executed...
    dispatch(postsFetchBegin());
    // Get the current location
    axios.get('https://ipapi.co/json')
        .then((responseCity) => {
            dispatch(postsFetchLocation(responseCity.data.city));
            if (responseCity.data.city === 'Bengaluru') {
                responseCity.data.city = 'Bangalore';
            }
            if (localStorage) {
                localStorage.setItem('CityName', responseCity.data.city);
            }
            return axios.get(postsApiUrl + responseCity.data.city)
                .then((response) => {
                    // Get only 10 first posts, due to task requirements
                    // Array should be sliced ASAP, because we don't need large amount of data in an action
                    response.data.location = responseCity.data.country;
                    const first10Posts = response.data.items.slice(0, 10);
                    dispatch(postsFetchSuccess(first10Posts));
                })
                .catch(() => {
                    // Something is no yes 👎
                    dispatch(postsFetchError());
                });
        })
        .catch(() => {
            // Something is no yes 👎
            dispatch(postsFetchError());
        });

};
