import * as actionTypes from './actionTypes';


export const setUserPosts = (userPosts: any) => {
    return {
        type: actionTypes.SET_USER_POSTS,
        payload: {
            userPosts
        }
    }
}